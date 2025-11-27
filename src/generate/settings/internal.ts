export interface Settings  {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export type SettingsAddition = {
  [K in keyof Settings]: Settings[K] | "unset";
};