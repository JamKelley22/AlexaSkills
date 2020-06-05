import {
  RequestType,
  SlotResolutionStatusCode,
  IInteractionModel,
} from "./types";
import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import { getSlotValues } from "./util";
import { InterationModelType } from "./data";

export const GetMonster_Handler = (
  model: IInteractionModel
): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(
          request.type === RequestType.IntentRequest &&
            request.intent.name === InterationModelType.IntentName.GetMonster
        );
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve, reject) => {
        const request = <IntentRequest>handlerInput.requestEnvelope.request; //Convert to an IntentRequest
        const responseBuilder = handlerInput.responseBuilder;
        //let sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const handlerName = "GetMonster";
        let say = `Hello from ${handlerName}. `;

        let slotStatus = "";

        const slotValues = getSlotValues(request.intent.slots);
        if (!slotValues) {
          return reject();
        }

        // getSlotValues returns .heardAs, .resolved, and .isValidated for each slot, according to request slot status codes ER_SUCCESS_MATCH, ER_SUCCESS_NO_MATCH, or traditional simple request slot without resolutions

        // console.log('***** slotValues: ' +  JSON.stringify(slotValues, null, 2));
        //   SLOT: monster
        if (slotValues.monster.heardAs && slotValues.monster.heardAs !== "") {
          slotStatus +=
            " slot monster was heard as " + slotValues.monster.heardAs + ". ";
        } else {
          slotStatus += "slot monster is empty. ";
        }
        if (
          slotValues.monster.ERstatus ===
          SlotResolutionStatusCode.ER_SUCCESS_MATCH
        ) {
          slotStatus += "a valid ";
          if (slotValues.monster.resolved !== slotValues.monster.heardAs) {
            slotStatus += "synonym for " + slotValues.monster.resolved + ". ";
          } else {
            slotStatus += "match. ";
          } // else {
          //
        }
        if (
          slotValues.monster.ERstatus ===
          SlotResolutionStatusCode.ER_SUCCESS_NO_MATCH
        ) {
          slotStatus += "which did not match any slot value. ";
          console.error(
            '***** consider adding "' +
              slotValues.monster.heardAs +
              '" to the custom slot type used by slot monster! '
          );
        }

        if (
          slotValues.monster.ERstatus ===
            SlotResolutionStatusCode.ER_SUCCESS_NO_MATCH ||
          !slotValues.monster.heardAs
        ) {
          // slotStatus += 'A few valid values are, ' + sayArray(getExampleSlotValues('GetMonster','monster'), 'or');
        }

        say += slotStatus;
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

export const GetRandomMonster_Handler = (
  model: IInteractionModel
): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(
          request.type === RequestType.IntentRequest &&
            request.intent.name ===
              InterationModelType.IntentName.GetRandomMonster
        );
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve) => {
        //const request = <IntentRequest>handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        //let sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const say = "Hello from GetRandomMonster. ";

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
