import {
  RequestType,
  SlotResolutionStatusCode,
  IInteractionModel,
} from "../types";
import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { getSlotValues } from "../util";
import { InterationModelType } from "../data";
import {
  IAPICocktailDBHandler,
  APICocktailDBHandler,
} from "../api/thecocktaildb/handler";

export const GetRandomCocktail_Handler = (
  model: IInteractionModel
): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(
          request.type === RequestType.IntentRequest &&
            request.intent.name ===
              InterationModelType.IntentName.GetRandomCocktail
        );
      });
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
      const handler: IAPICocktailDBHandler = new APICocktailDBHandler();
      const cocktil = await handler.getRandomCocktail();

      return new Promise<Response>((resolve) => {
        //const request = <IntentRequest>handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        //let sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        //const say = "Hello from GetRandomCocktail. ";
        const say = cocktil.strDrink;

        return resolve(
          responseBuilder
            .speak(say)
            .reprompt("try again, " + say)
            .getResponse()
        );
      });
    },
  };
};
