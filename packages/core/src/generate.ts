import { type FeatureIds, FeatureRecord } from "./features";
import { type Settings } from "./settings/internal";
import { type GenerateForm, getGenerateForm } from "./form";
import { keys } from "./utils";
import {
  type Prompt,
  promptConstructor,
  appendUserMessagesToPrompt,
  type ContentInput,
  appendModelMessagesToPrompt
} from "./prompt";
import {
  mergeSettings,
  type SettingsAddition,
  settingsConstructor
} from "./settings";
import { type GenerateOutput } from "./output";

type GenerateExecutable = {
  generate(generate: Generate): Promise<GenerateOutput>;
}

class Generate{
  static features = FeatureRecord;

  prompt: Prompt;
  settings: Settings;

  constructor(form?: GenerateForm){
    this.prompt = promptConstructor(form?.prompt?.messages ?? []);
    this.settings = settingsConstructor(form?.settings ?? {});
  }

  async run(model: GenerateExecutable): Promise<GenerateOutput> {
    return model.generate(this);
  }

  appendUserMessage(message: ContentInput){
    this.prompt = appendUserMessagesToPrompt(this.prompt, message);
    return this;
  }

  appendModelMessage(message: ContentInput){
    this.prompt = appendModelMessagesToPrompt(this.prompt, message);
    return this;
  }


  /**
   * Updates the settings for the current instance by validating and parsing
   * the provided settings object against the defined schema.
   *
   * @param settings - The settings object to be applied.
   *
   */
  setSettings(settings: Settings){
    this.settings = settingsConstructor(settings)
    return this;
  }

  /**
   * Edits the current settings by merging the provided partial settings with the existing ones.
   * 
   * - Any settings value explicitly set to `unset` will be removed from the existing settings.
   * - The input settings must conform to the settings format.
   * 
   * @param settingsAddition - A partial object of type `SettingsAddition` containing the new settings to merge.
   */
  editSettings(settingsAddition: SettingsAddition){    
    this.settings = mergeSettings(this.settings, settingsAddition);
    return this;
  }


  /**
   * Retrieves a list of feature IDs that are currently in use.
   *
   * This method iterates over all features defined in the generation feature record.
   *
   * @returns {FeatureIds[]} An array of feature IDs that are in use.
   */
  getUsedFeatures(): FeatureIds[] {
    const usedFeatures: FeatureIds[] = []
    
    for(const featureId of keys(FeatureRecord)){
      const feature = FeatureRecord[featureId];
      if(feature.existenceChecker(this)){
        usedFeatures.push(featureId);
      }
    }

    return usedFeatures;
  }
  

  getForm(){
    return getGenerateForm(this);
  }

  clone(){
    return new Generate(getGenerateForm(this));
  }
}

export default Generate;