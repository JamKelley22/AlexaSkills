import MyCustomSkill from "./skillBuilder";
import * as Data from "./data";
import { DnDIntentHandlerType } from "./data/dnd/types";
import { DnDIntentHandlers, CocktailIntentHandlers } from "./intentHandlers";
import { CocktailIntentHandlerType } from "./data/cocktail/types";

const { DnDInteractionModelJSON } = Data;

const DnDSkill = new MyCustomSkill(DnDInteractionModelJSON.interactionModel);
const CocktailSkill = new MyCustomSkill(
  Data.CocktailInteractionJSON.interactionModel
);

DnDSkill.addCustomIntentHandler(
  DnDIntentHandlerType.GetMonster,
  DnDIntentHandlers.GetMonster_Handler(DnDSkill.getInteractionModel())
);

DnDSkill.addCustomIntentHandler(
  DnDIntentHandlerType.GetRandomMonster,
  DnDIntentHandlers.GetRandomMonster_Handler(DnDSkill.getInteractionModel())
);

CocktailSkill.addCustomIntentHandler(
  CocktailIntentHandlerType.GetRandomCocktail,
  CocktailIntentHandlers.GetRandomCocktail_Handler(
    CocktailSkill.getInteractionModel()
  )
);

const MyDnDSkill = DnDSkill.create();
const MyCocktailSkill = CocktailSkill.create();

export { MyDnDSkill, MyCocktailSkill };
