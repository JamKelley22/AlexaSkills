import { Slot, IntentRequest, interfaces } from "ask-sdk-model";
import { HandlerInput } from "ask-sdk-core";
import {
  ILanguageModelIntent,
  SessionAttributes,
  IFilledSlots,
  ISlotValues,
  RequestType,
  SlotResolutionStatusCode,
} from "./types";

export function capitalize(myString: string): string {
  return myString.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

export function randomElement<T>(myArray: T[]): T {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

export function stripSpeak(str: string): string {
  return str.replace("<speak>", "").replace("</speak>", "");
}

export function getSlotValues(
  filledSlots: IFilledSlots | undefined
): ISlotValues | undefined {
  if (!filledSlots) return undefined;

  const slotValues: ISlotValues = {};

  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;
    const slot: Slot = filledSlots[item];

    if (
      slot &&
      slot.resolutions &&
      slot.resolutions.resolutionsPerAuthority &&
      slot.resolutions.resolutionsPerAuthority[0] &&
      slot.resolutions.resolutionsPerAuthority[0].status &&
      slot.resolutions.resolutionsPerAuthority[0].status.code
    ) {
      switch (slot.resolutions.resolutionsPerAuthority[0].status.code) {
        case SlotResolutionStatusCode.ER_SUCCESS_MATCH:
          slotValues[name] = {
            heardAs: slot.value,
            resolved:
              slot.resolutions.resolutionsPerAuthority[0].values[0].value.name,
            ERstatus: SlotResolutionStatusCode.ER_SUCCESS_MATCH,
          };
          break;
        case SlotResolutionStatusCode.ER_SUCCESS_NO_MATCH:
          slotValues[name] = {
            heardAs: slot.value,
            resolved: "",
            ERstatus: SlotResolutionStatusCode.ER_SUCCESS_NO_MATCH,
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        heardAs: slot.value || "", // may be null
        resolved: "",
        ERstatus: "",
      };
    }
  });

  return slotValues;
}

export function sayArray(myData: string[], penultimateWord = "and"): string {
  let result = "";

  myData.forEach(function (element, index) {
    if (index === 0) {
      result = element;
    } else if (index === myData.length - 1) {
      result += ` ${penultimateWord} ${element}`;
    } else {
      result += `, ${element}`;
    }
  });
  return result;
}

export function supportsDisplay(
  handlerInput: HandlerInput
): interfaces.display.DisplayInterface | undefined {
  // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.)
  //  Enable your skill for display as shown here: https://alexa.design/enabledisplay
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces
      .Display;

  return hasDisplay;
}

export function getCustomIntents(
  intents: ILanguageModelIntent[]
): ILanguageModelIntent[] {
  return intents.filter(
    (intent: ILanguageModelIntent) =>
      intent.name.substring(0, 7) != "AMAZON." &&
      intent.name !== RequestType.LaunchRequest
  );
}

export function getSampleUtterance(intent: ILanguageModelIntent): string {
  if (!intent.samples) {
    console.error("No Sample Utterances");
    return "";
  }
  return randomElement(intent.samples);
}

export function getPreviousIntent(
  attrs: SessionAttributes
): IntentRequest | boolean {
  if (attrs.history && attrs.history.length > 1) {
    return attrs.history[attrs.history.length - 2].IntentRequest;
  } else {
    return false;
  }
}

export function getPreviousSpeechOutput(
  attrs: SessionAttributes
): any | boolean {
  //Todo: Update return after finding out what "attrs.lastSpeechOutput" is

  if (attrs.lastSpeechOutput && attrs.history.length > 1) {
    return attrs.lastSpeechOutput;
  } else {
    return false;
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  // Fisher Yates shuffle
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
