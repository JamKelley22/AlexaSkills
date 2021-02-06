import axios from "axios";
import { Cocktail } from "./types";

const BASE_URL = "https://jamkelley.com/api";
// const DEV_BASE_URL = "http://localhost:5000";

export interface IAPICocktailDBHandler {
  getRandomCocktail(): Promise<Cocktail>;
}

export class APICocktailDBHandler implements IAPICocktailDBHandler {
  getRandomCocktail = async (): Promise<Cocktail> => {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    return new Cocktail(response.data.drinks[0]);
  };
}

export class FakeAPICocktailDBHandler implements IAPICocktailDBHandler {
  getRandomCocktail = async (): Promise<Cocktail> => {
    return new Cocktail({});
  };
}
