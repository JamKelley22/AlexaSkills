//Interaction Model Enums (Need to be updated when InteractionModel.json is updated)
export enum IntentName {
  FallbackIntent = "AMAZON.FallbackIntent",
  CancelIntent = "AMAZON.CancelIntent",
  HelpIntent = "AMAZON.HelpIntent",
  StopIntent = "AMAZON.StopIntent",
  NavigateHomeIntent = "AMAZON.NavigateHomeIntent",
  LaunchRequest = "LaunchRequest",
  GetMonster = "GetMonster",
  GetRandomMonster = "GetRandomMonster",
  GetCocktail = "GetCocktail",
  GetRandomCocktail = "GetRandomCocktail",
}

export enum IntentHandlerType {
  Fallback,
  Cancel,
  Help,
  Stop,
  NavigateHome,
  LaunchRequest,
  SessionEnded, //Not Included in interaction model
}
