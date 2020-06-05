//=====Set Up env Varables=====
require("dotenv").config();

//=====Imports=====
import { ExpressAdapter } from "ask-sdk-express-adapter";
import express from "express";
import helmet from "helmet";
import https from "https";
import cors from "cors";
import fs from "fs";

import { PORT, BASE_ENDPOINT, CERT_DIR } from "./constants";
import { MyDnDSkill, MyCocktailSkill } from "./skills";

//=====Set Up Server and Middleware=====
const app = express();
app.use(helmet());
app.use(cors());

//=====Create Objects=====
const dndSkillAdapter = new ExpressAdapter(MyDnDSkill, true, true);
const cocktailSkillAdapter = new ExpressAdapter(MyCocktailSkill, true, true);

//=====Endpoints=====
app.post(`${BASE_ENDPOINT}/dnd`, dndSkillAdapter.getRequestHandlers());
app.post(
  `${BASE_ENDPOINT}/cocktail`,
  cocktailSkillAdapter.getRequestHandlers()
);

//=====Certificate Stuff=====
const key = fs.readFileSync(`${CERT_DIR}/privkey.pem`);
const cert = fs.readFileSync(`${CERT_DIR}/cert.pem`);
const options = {
  key: key,
  cert: cert,
};

//=====Start the Server=====
const server = https.createServer(options, app);
const port = Number(PORT) | 8080;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Server running on port: " + port);
});
