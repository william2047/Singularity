import Generate from "./generate";
import { PromptSnapshot } from "./prompt/internal";
import { Settings } from "./settings/internal"

export type GenerateSnapshot = {
  settings: Settings;
  prompt: PromptSnapshot;
}


export function generateSnapshot(generate: Generate): GenerateSnapshot {
  return {
    settings: generate.settings,
    prompt: generate.prompt
  }
}