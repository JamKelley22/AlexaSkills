import * as Alexa from "ask-sdk-core";
import { RequestHandler, ErrorHandler, RequestInterceptor } from "ask-sdk-core";

import {
  InteractionModel,
  IIntentTypeDefaultList as IIntentTypeDefault,
  IInteractionModel,
} from "./types";
import { CustomSkill } from "ask-sdk-core/dist/skill/CustomSkill";
import { DefaultHandlers, DefaultInterceptors } from "./defaults";

import { IntentHandlerType } from "./data/types";
import { CustomIntentHandlerType } from "./data/dnd/types";

export class MyCustomSkill {
  interactionModel: InteractionModel;
  baseIntentHandlers: Map<IntentHandlerType, RequestHandler>;
  customIntentHandlers: Map<CustomIntentHandlerType, RequestHandler>;
  errorHandlers: Map<string, ErrorHandler>;
  requestInterceptors: Map<string, RequestInterceptor>;
  constructor(modelData: IInteractionModel) {
    this.interactionModel = new InteractionModel(modelData);
    this.baseIntentHandlers = new Map<IntentHandlerType, RequestHandler>();
    this.customIntentHandlers = new Map<
      CustomIntentHandlerType,
      RequestHandler
    >();
    this.errorHandlers = new Map<string, ErrorHandler>();
    this.requestInterceptors = new Map<string, RequestInterceptor>();
  }

  getInteractionModel = (): InteractionModel => this.interactionModel;

  /**
   * Adds an base intent handler of type
   * @param intentType
   * @param newIntentHandler
   * @returns the set intent handler
   */
  addBaseIntentHandler = (
    intentType: IntentHandlerType,
    newIntentHandler: RequestHandler
  ): RequestHandler => {
    this.baseIntentHandlers.set(intentType, newIntentHandler);
    return newIntentHandler;
  };

  addCustomIntentHandler = (
    intentType: CustomIntentHandlerType,
    newIntentHandler: RequestHandler
  ): RequestHandler => {
    this.customIntentHandlers.set(intentType, newIntentHandler);
    return newIntentHandler;
  };

  addErrorHandler = (tag: string, errorHandler: ErrorHandler): ErrorHandler => {
    this.errorHandlers.set(tag, errorHandler);
    return errorHandler;
  };

  addRequestInterceptorHandler = (
    tag: string,
    requestInterceptorHandler: RequestInterceptor
  ): RequestInterceptor => {
    this.requestInterceptors.set(tag, requestInterceptorHandler);
    return requestInterceptorHandler;
  };

  /**
   * Removes an intent handler of type
   * @param intentType
   * @returns the removed intent handler
   */
  removeBaseIntentHandler = (
    intentType: IntentHandlerType
  ): RequestHandler | undefined => {
    const handler = this.baseIntentHandlers.get(intentType);
    if (handler) this.baseIntentHandlers.delete(intentType);
    return handler;
  };

  removeCustomIntentHandler = (
    intentType: CustomIntentHandlerType
  ): RequestHandler | undefined => {
    const handler = this.customIntentHandlers.get(intentType);
    if (handler) this.customIntentHandlers.delete(intentType);
    return handler;
  };

  removeErrorHandler = (tag: string): ErrorHandler | undefined => {
    const handler = this.errorHandlers.get(tag);
    if (handler) this.errorHandlers.delete(tag);
    return handler;
  };

  removeRequestInterceptorHandler = (
    tag: string
  ): RequestInterceptor | undefined => {
    const handler = this.requestInterceptors.get(tag);
    if (handler) this.requestInterceptors.delete(tag);
    return handler;
  };

  /**
   * Gets matching intent handler of type or a default intent handler
   * @param intentType
   * @returns either the matching intent handler of type or a default intent handler
   */
  getBaseIntentHandler = (
    intentType: IntentHandlerType,
    defaultIntentHandler: RequestHandler
  ): RequestHandler => {
    const intentHandler = this.baseIntentHandlers.get(intentType);
    if (intentHandler) return intentHandler;

    return defaultIntentHandler;
  };

  createBaseIntentHandlerList = (): RequestHandler[] => {
    // DefaultHandlers.Request.Intent.AMAZON_FallbackIntent_Handler(
    //   this.interactionModel
    // ),
    // DefaultHandlers.Request.Intent.AMAZON_CancelIntent_Handler(
    //   this.interactionModel
    // ),
    // this.getIntentHandler(
    //   Data.IntentHandlerType.Help,
    //   DefaultHandlers.Request.Intent.AMAZON_HelpIntent_Handler(
    //     this.interactionModel
    //   )
    // ),
    // DefaultHandlers.Request.Intent.AMAZON_StopIntent_Handler(
    //   this.interactionModel
    // ),
    // DefaultHandlers.Request.Intent.AMAZON_NavigateHomeIntent_Handler(
    //   this.interactionModel
    // ),

    // DefaultHandlers.Request.LaunchRequest_Handler(this.interactionModel),
    const intentTypeDefaultList: IIntentTypeDefault[] = [
      {
        intentType: IntentHandlerType.Help,
        defaultIntentHandler: DefaultHandlers.Request.Intent.AMAZON_HelpIntent_Handler(
          this.interactionModel
        ),
      },
      {
        intentType: IntentHandlerType.LaunchRequest,
        defaultIntentHandler: DefaultHandlers.Request.LaunchRequest_Handler(
          this.interactionModel
        ),
      },
      {
        intentType: IntentHandlerType.SessionEnded,
        defaultIntentHandler: DefaultHandlers.Request.SessionEndedHandler(
          this.interactionModel
        ),
      },
    ];
    return intentTypeDefaultList.map((handler) =>
      this.getBaseIntentHandler(
        handler.intentType,
        handler.defaultIntentHandler
      )
    );
  };

  createCustomIntentHandlerList = (): RequestHandler[] => {
    //Todo: Maybe these should have a default error handler? Maybe they should just break? Idk yet
    //Eg. dev forgets to add a custom intent handler thats defined in the model
    return Array.from(this.customIntentHandlers.values());
  };

  createErrorHandlerList = (): ErrorHandler[] => {
    const errorHandlers = Array.from(this.errorHandlers.values());
    return errorHandlers.length > 0
      ? errorHandlers
      : [DefaultHandlers.ErrorHandler(this.interactionModel)];
  };

  createRequestInterceptorList = (): RequestInterceptor[] => {
    const requestInterceptorHandlers = Array.from(
      this.requestInterceptors.values()
    );
    return requestInterceptorHandlers.length > 0
      ? requestInterceptorHandlers
      : [
          DefaultInterceptors.InitMemoryAttributesInterceptor,
          DefaultInterceptors.RequestHistoryInterceptor,
        ];
  };

  create = (): CustomSkill => {
    return Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        ...this.createBaseIntentHandlerList(),
        ...this.createCustomIntentHandlerList()
      )
      .addErrorHandlers(...this.createErrorHandlerList())
      .addRequestInterceptors(...this.createRequestInterceptorList())
      .create();
  };
}

export default MyCustomSkill;

// export default DnDSkill.create();
