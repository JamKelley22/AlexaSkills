import MyCustomSkill from "./skillBuilder";
import * as Data from "./data";
import { CustomIntentHandlerType } from "./data/dnd/types";
import * as CustomIntentHandler from "./intentHandlers";

const { DnDInteractionModelJSON } = Data;

const DnDSkill = new MyCustomSkill(DnDInteractionModelJSON.interactionModel);
const CocktailSkill = new MyCustomSkill(
  Data.CocktailInteractionJSON.interactionModel
);

DnDSkill.addCustomIntentHandler(
  CustomIntentHandlerType.GetMonster,
  CustomIntentHandler.GetMonster_Handler(DnDSkill.getInteractionModel())
);

DnDSkill.addCustomIntentHandler(
  CustomIntentHandlerType.GetRandomMonster,
  CustomIntentHandler.GetRandomMonster_Handler(DnDSkill.getInteractionModel())
);

const MyDnDSkill = DnDSkill.create();
const MyCocktailSkill = CocktailSkill.create();

export { MyDnDSkill, MyCocktailSkill };
