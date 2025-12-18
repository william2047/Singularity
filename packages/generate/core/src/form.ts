import Generate from "./generate";
import { PromptForm } from "./prompt/form";
import { SettingsForm } from "./settings/form";

export type GenerateForm = {
  settings: SettingsForm;
  prompt: PromptForm;
}


export function getGenerateForm(generate: Generate): GenerateForm  {
  return {
    settings: generate.settings,
    prompt: generate.prompt
  }
}