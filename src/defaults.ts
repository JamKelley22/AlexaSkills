import {
  HandlerInput,
  RequestHandler,
  ErrorHandler,
  RequestInterceptor,
} from "ask-sdk-core";
import { Response, SessionEndedRequest } from "ask-sdk-model";
import { SessionAttributes, RequestType, IInteractionModel } from "./types";
import {
  getPreviousSpeechOutput,
  stripSpeak,
  getCustomIntents,
  randomElement,
  getPreviousIntent,
  getSampleUtterance,
  capitalize,
} from "./util";
import { WelcomeCardImg, MAX_HISTORY_SIZE } from "./constants";
import { InterationModelType } from "./data";

//=====Intent Handlers=====
const AMAZON_FallbackIntent_Handler = (
  model: IInteractionModel
): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(
          request.type === RequestType.IntentRequest &&
            request.intent.name ===
              InterationModelType.IntentName.FallbackIntent
        );
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve) => {
        //const request = <IntentRequest>handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const previousSpeech = getPreviousSpeechOutput(sessionAttributes);
        return resolve(
          responseBuilder
            .speak(
              "Sorry I didnt catch what you said, " +
                stripSpeak(previousSpeech.outputSpeech)
            )
            .reprompt(stripSpeak(previousSpeech.reprompt))
            .getResponse()
        );
      });
    },
  };
};

const AMAZON_CancelIntent_Handler = (
  model: IInteractionModel
): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(
          request.type === RequestType.IntentRequest &&
            request.intent.name === InterationModelType.IntentName.CancelIntent
        );
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve) => {
        //const request = <IntentRequest>handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        //let sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const say = "Okay, talk to you later! ";

        return resolve(
          responseBuilder.speak(say).withShouldEndSession(true).getResponse()
        );
      });
    },
  };
};

const AMAZON_HelpIntent_Handler = (
  model: IInteractionModel
): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(
          request.type === RequestType.IntentRequest &&
            request.intent.name === InterationModelType.IntentName.HelpIntent
        );
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve) => {
        //const request = <IntentRequest>handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        //let history = sessionAttributes['history'];
        const modelIntents = model.languageModel.intents;
        const intents = getCustomIntents(modelIntents);
        const sampleIntent = randomElement(intents);

        let say = "You asked for help. ";

        const previousIntent = getPreviousIntent(sessionAttributes);
        const isNewSession =
          handlerInput.requestEnvelope.session &&
          handlerInput.requestEnvelope.session.new;
        if (previousIntent && !isNewSession) {
          say += "Your last intent was " + previousIntent + ". ";
        }
        // say +=  'I understand  ' + intents.length + ' intents, '

        say +=
          " Here something you can ask me, " + getSampleUtterance(sampleIntent);

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

const AMAZON_StopIntent_Handler = (
  model: IInteractionModel
): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(
          request.type === RequestType.IntentRequest &&
            request.intent.name === InterationModelType.IntentName.StopIntent
        );
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve) => {
        //const request = <IntentRequest>handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        //let sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const say = "Okay, talk to you later! ";

        return resolve(
          responseBuilder.speak(say).withShouldEndSession(true).getResponse()
        );
      });
    },
  };
};

const AMAZON_NavigateHomeIntent_Handler = (
  model: IInteractionModel
): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(
          request.type === RequestType.IntentRequest &&
            request.intent.name ===
              InterationModelType.IntentName.NavigateHomeIntent
        );
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve) => {
        //const request = <IntentRequest>handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        //let sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const say = "Hello from AMAZON.NavigateHomeIntent. ";

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

const LaunchRequest_Handler = (model: IInteractionModel): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(request.type === RequestType.LaunchRequest);
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve) => {
        const responseBuilder = handlerInput.responseBuilder;

        const invocationName = model.languageModel.invocationName;

        const say =
          "hello" +
          " and welcome to " +
          invocationName +
          " ! Say help to hear some options.";

        const skillTitle = capitalize(invocationName);

        return resolve(
          responseBuilder
            .speak(say)
            .reprompt("try again, " + say)
            .withStandardCard(
              "Welcome!",
              "Hello!\nThis is a card for your skill, " + skillTitle,
              WelcomeCardImg.smallImageUrl,
              WelcomeCardImg.largeImageUrl
            )
            .getResponse()
        );
      });
    },
  };
};

//=====Other Request Handlers=====
//This is less of an intent that can be responsed to and more of a cleanup space before closeing the app
const SessionEndedHandler = (model: IInteractionModel): RequestHandler => {
  return {
    canHandle(handlerInput: HandlerInput): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = handlerInput.requestEnvelope.request;
        return resolve(request.type === RequestType.SessionEndedRequest);
      });
    },
    handle(handlerInput: HandlerInput): Promise<Response> {
      return new Promise<Response>((resolve) => {
        const request = <SessionEndedRequest>(
          handlerInput.requestEnvelope.request
        );
        console.log(`Session ended with reason: ${request.reason}`);
        return resolve(handlerInput.responseBuilder.getResponse());
      });
    },
  };
};

//=====Other Handlers=====

const ErrorHandler = (model: IInteractionModel): ErrorHandler => {
  return {
    canHandle(/*handlerInput: HandlerInput, error: Error*/): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        return resolve(true);
      });
    },
    handle(handlerInput: HandlerInput, error: Error): Promise<Response> {
      return new Promise<Response>((resolve) => {
        //const request = handlerInput.requestEnvelope.request;

        //console.log(`Error handled: ${error.message}`);
        // console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

        return resolve(
          handlerInput.responseBuilder
            .speak(`Sorry, your skill got this error.  ${error.message} `)
            .reprompt(`Sorry, your skill got this error.  ${error.message} `)
            .getResponse()
        );
      });
    },
  };
};

//==============================Interceptors

const InitMemoryAttributesInterceptor: RequestInterceptor = {
  process(handlerInput: HandlerInput): Promise<void> {
    return new Promise<void>((resolve) => {
      let sessionAttributes: SessionAttributes;
      const isNewSession =
        handlerInput.requestEnvelope.session &&
        handlerInput.requestEnvelope.session["new"];
      if (isNewSession) {
        sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const memoryAttributes: any = getMemoryAttributes(); //Todo: Retype from any

        if (Object.keys(sessionAttributes).length === 0) {
          Object.keys(memoryAttributes).forEach(function (key) {
            // initialize all attributes from global list

            sessionAttributes[key] = memoryAttributes[key];
          });
        }
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      }
      return resolve();
    });
  },
};

const RequestHistoryInterceptor: RequestInterceptor = {
  process(handlerInput: HandlerInput): Promise<void> {
    return new Promise<void>((resolve) => {
      const thisRequest = handlerInput.requestEnvelope.request;
      const sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

      const history = sessionAttributes["history"] || [];

      let IntentRequest = {};
      if (thisRequest.type === "IntentRequest") {
        const slots = [];

        IntentRequest = {
          IntentRequest: thisRequest.intent.name,
        };

        if (thisRequest.intent.slots) {
          for (const slot in thisRequest.intent.slots) {
            const slotObj: any = {}; //Todo retype from any
            slotObj[slot] = thisRequest.intent.slots[slot].value;
            slots.push(slotObj);
          }

          IntentRequest = {
            IntentRequest: thisRequest.intent.name,
            slots: slots,
          };
        }
      } else {
        IntentRequest = { IntentRequest: thisRequest.type };
      }
      if (history.length > MAX_HISTORY_SIZE - 1) {
        history.shift();
      }
      history.push(IntentRequest);

      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

      return resolve();
    });
  },
};

// const RequestPersistenceInterceptor: RequestInterceptor = {
//     process(handlerInput: HandlerInput) {

//         if (handlerInput.requestEnvelope.session['new']) {

//             return new Promise((resolve, reject) => {

//                 handlerInput.attributesManager.getPersistentAttributes()

//                     .then((sessionAttributes) => {
//                         sessionAttributes = sessionAttributes || {};

//                         sessionAttributes['launchCount'] += 1;

//                         handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

//                         handlerInput.attributesManager.savePersistentAttributes()
//                             .then(() => {
//                                 resolve();
//                             })
//                             .catch((err) => {
//                                 reject(err);
//                             });
//                     });

//             });

//         } // end session['new']
//     }
// };

// const ResponseRecordSpeechOutputInterceptor: RequestInterceptor = {
//     process(handlerInput: HandlerInput, responseOutput) {

//         let sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
//         let lastSpeechOutput = {
//             "outputSpeech": responseOutput.outputSpeech.ssml,
//             "reprompt": responseOutput.reprompt.outputSpeech.ssml
//         };

//         sessionAttributes['lastSpeechOutput'] = lastSpeechOutput;

//         handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

//     }
// };

// const ResponsePersistenceInterceptor: RequestInterceptor = {
//     process(handlerInput: HandlerInput, responseOutput) {

//         const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession);

//         if (ses || handlerInput.requestEnvelope.request.type == RequestType.SessionEndedRequest) { // skill was stopped or timed out

//             let sessionAttributes: SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

//             sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime();

//             handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);

//             return new Promise((resolve, reject) => {
//                 handlerInput.attributesManager.savePersistentAttributes()
//                     .then(() => {
//                         resolve();
//                     })
//                     .catch((err) => {
//                         reject(err);
//                     });

//             });

//         }

//     }
// };

// Session Attributes
//   Alexa will track attributes for you, by default only during the lifespan of your session.
//   The history[] array will track previous request(s), used for contextual Help/Yes/No handling.
//   Set up DynamoDB persistence to have the skill save and reload these attributes between skill sessions.

function getMemoryAttributes() {
  const memoryAttributes = {
    history: [],

    launchCount: 0,
    lastUseTimestamp: 0,

    lastSpeechOutput: {},
    // "nextIntent":[]

    // "favoriteColor":"",
    // "name":"",
    // "namePronounce":"",
    // "email":"",
    // "mobileNumber":"",
    // "city":"",
    // "state":"",
    // "postcode":"",
    // "birthday":"",
    // "bookmark":0,
    // "wishlist":[],
  };
  return memoryAttributes;
}

export const DefaultHandlers = {
  Request: {
    Intent: {
      AMAZON_FallbackIntent_Handler,
      AMAZON_CancelIntent_Handler,
      AMAZON_HelpIntent_Handler,
      AMAZON_StopIntent_Handler,
      AMAZON_NavigateHomeIntent_Handler,
    },
    LaunchRequest_Handler,
    SessionEndedHandler,
  },
  ErrorHandler,
};

export const DefaultInterceptors = {
  InitMemoryAttributesInterceptor,
  RequestHistoryInterceptor,
};
