import * as Alexa from "ask-sdk-core";

import { Slot } from "ask-sdk-model";
import { InterationModelType } from "./data";

//=====Interface Declaration=====
export interface IFallbackIntentSensitivity {
  level: string;
}
export interface IModelConfiguration {
  fallbackIntentSensitivity: IFallbackIntentSensitivity;
}
export interface ILanguageModelSlot {
  name: string;
  type: string;
}
export interface ILanguageModelIntent {
  name: string;
  samples?: string[];
  slots?: ILanguageModelSlot[];
}
export interface ILanguageModelTypeValueName {
  value: string;
}
export interface ILanguageModelTypeValue {
  name: ILanguageModelTypeValueName;
}
export interface ILanguageModelType {
  name: string;
  values: ILanguageModelTypeValue[];
}
export interface ILanguageModel {
  invocationName: string;
  modelConfiguration: IModelConfiguration;
  intents: ILanguageModelIntent[];
  types: ILanguageModelType[];
}
export interface IInteractionModel {
  languageModel: ILanguageModel;
}

//=====Other Interfaces=====
export interface SessionAttributes {
  [key: string]: any;
}

export interface IFilledSlots {
  [key: string]: Slot;
}

export interface ISlotValues {
  [key: string]: {
    heardAs: string | undefined;
    resolved: string;
    ERstatus: string;
  };
}

export interface IIntentTypeDefaultList {
  intentType: InterationModelType.IntentHandlerType;
  defaultIntentHandler: Alexa.RequestHandler;
}

//=====Class Declaration=====
export class FallbackIntentSensitivity implements IFallbackIntentSensitivity {
  level: string;

  constructor(data: IFallbackIntentSensitivity) {
    this.level = data.level;
  }
}
export class ModelConfiguration implements IModelConfiguration {
  fallbackIntentSensitivity: IFallbackIntentSensitivity;

  constructor(data: IModelConfiguration) {
    this.fallbackIntentSensitivity = new FallbackIntentSensitivity(
      data.fallbackIntentSensitivity
    );
  }
}
export class LanguageModelSlot implements ILanguageModelSlot {
  name: string;
  type: string;

  constructor(data: ILanguageModelSlot) {
    this.name = data.name;
    this.type = data.type;
  }
}
export class LanguageModelIntent implements ILanguageModelIntent {
  name: string;
  samples?: string[];
  slots?: ILanguageModelSlot[];

  constructor(data: ILanguageModelIntent) {
    this.name = data.name;
    this.samples = data.samples;
    this.slots = data.slots
      ? data.slots.map(
          (slot: ILanguageModelSlot) => new LanguageModelSlot(slot)
        )
      : [];
  }
}
export class LanguageModelTypeValueName implements ILanguageModelTypeValueName {
  value: string;

  constructor(data: ILanguageModelTypeValueName) {
    this.value = data.value;
  }
}
export class LanguageModelTypeValue implements ILanguageModelTypeValue {
  name: ILanguageModelTypeValueName;

  constructor(data: ILanguageModelTypeValue) {
    this.name = new LanguageModelTypeValueName(data.name);
  }
}
export class LanguageModelType implements ILanguageModelType {
  name: string;
  values: ILanguageModelTypeValue[];

  constructor(data: ILanguageModelType) {
    this.name = data.name;
    this.values = data.values.map(
      (value: ILanguageModelTypeValue) => new LanguageModelTypeValue(value)
    );
  }
}
export class LanguageModel implements ILanguageModel {
  invocationName: string;
  modelConfiguration: IModelConfiguration;
  intents: ILanguageModelIntent[];
  types: ILanguageModelType[];

  constructor(data: ILanguageModel) {
    this.invocationName = data.invocationName;
    this.modelConfiguration = new ModelConfiguration(data.modelConfiguration);
    this.intents = data.intents.map(
      (intent: ILanguageModelIntent) => new LanguageModelIntent(intent)
    );
    this.types = data.types.map(
      (type: ILanguageModelType) => new LanguageModelType(type)
    );
  }
}
export class InteractionModel implements IInteractionModel {
  languageModel: ILanguageModel;

  constructor(data: any) {
    this.languageModel = new LanguageModel(data.languageModel);
  }
}

//=====Enums=====
export enum RequestType {
  SkillEnabledRequest = "events.skillevents.SkillEnabledRequest",
  ListUpdatedEventRequest = "services.listManagement.ListUpdatedEventRequest",
  APLUserEvent = "interfaces.alexa.presentation.apl.UserEvent",
  SkillDisabledRequest = "events.skillevents.SkillDisabledRequest",
  ListItemsCreatedEventRequest = "services.listManagement.ListItemsCreatedEventRequest",
  SessionResumedRequest = "SessionResumedRequest",
  SessionEndedRequest = "SessionEndedRequest",
  LoadIndexListDataEvent = "interfaces.alexa.presentation.apl.LoadIndexListDataEvent",
  PlaybackFailedRequest = "interfaces.audioplayer.PlaybackFailedRequest",
  CanFulfillIntentRequest = "canfulfill.CanFulfillIntentRequest",
  ExpiredRequest = "interfaces.customInterfaceController.ExpiredRequest",
  MessageRequest = "interfaces.alexa.presentation.html.MessageRequest",
  LaunchRequest = "LaunchRequest",
  ReminderCreatedEventRequest = "services.reminderManagement.ReminderCreatedEventRequest",
  APLTUserEvent = "interfaces.alexa.presentation.aplt.UserEvent",
  ListItemsUpdatedEventRequest = "services.listManagement.ListItemsUpdatedEventRequest",
  ListCreatedEventRequest = "services.listManagement.ListCreatedEventRequest",
  PlaybackStartedRequest = "interfaces.audioplayer.PlaybackStartedRequest",
  PlaybackNearlyFinishedRequest = "interfaces.audioplayer.PlaybackNearlyFinishedRequest",
  EventsReceivedRequest = "interfaces.customInterfaceController.EventsReceivedRequest",
  ReminderStatusChangedEventRequest = "services.reminderManagement.ReminderStatusChangedEventRequest",
  ListItemsDeletedEventRequest = "services.listManagement.ListItemsDeletedEventRequest",
  ReminderDeletedEventRequest = "services.reminderManagement.ReminderDeletedEventRequest",
  ConnectionsResponse = "interfaces.connections.ConnectionsResponse",
  ListDeletedEventRequest = "services.listManagement.ListDeletedEventRequest",
  InputHandlerEventRequest = "interfaces.gameEngine.InputHandlerEventRequest",
  PauseCommandIssuedRequest = "interfaces.playbackcontroller.PauseCommandIssuedRequest",
  PlayCommandIssuedRequest = "interfaces.playbackcontroller.PlayCommandIssuedRequest",
  PlaybackFinishedRequest = "interfaces.audioplayer.PlaybackFinishedRequest",
  ProactiveSubscriptionChangedRequest = "events.skillevents.ProactiveSubscriptionChangedRequest",
  ElementSelectedRequest = "interfaces.display.ElementSelectedRequest",
  PermissionChangedRequest = "events.skillevents.PermissionChangedRequest",
  ReminderUpdatedEventRequest = "services.reminderManagement.ReminderUpdatedEventRequest",
  RuntimeErrorEvent = "interfaces.alexa.presentation.apl.RuntimeErrorEvent",
  RuntimeErrorRequest = "interfaces.alexa.presentation.html.RuntimeErrorRequest",
  IntentRequest = "IntentRequest",
  ReminderStartedEventRequest = "services.reminderManagement.ReminderStartedEventRequest",
  PlaybackStoppedRequest = "interfaces.audioplayer.PlaybackStoppedRequest",
  PreviousCommandIssuedRequest = "interfaces.playbackcontroller.PreviousCommandIssuedRequest",
  AccountLinkedRequest = "events.skillevents.AccountLinkedRequest",
  MessageReceivedRequest = "interfaces.messaging.MessageReceivedRequest",
  ConnectionsRequest = "interfaces.connections.ConnectionsRequest",
  ExceptionEncounteredRequest = "interfaces.system.ExceptionEncounteredRequest",
  PermissionAcceptedRequest = "events.skillevents.PermissionAcceptedRequest",
  NextCommandIssuedRequest = "interfaces.playbackcontroller.NextCommandIssuedRequest",
}

export const enum SlotResolutionStatusCode {
  ER_SUCCESS_MATCH = "ER_SUCCESS_MATCH",
  ER_SUCCESS_NO_MATCH = "ER_SUCCESS_NO_MATCH",
}
