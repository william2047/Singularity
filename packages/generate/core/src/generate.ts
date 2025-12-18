import GenerateModel from "./model/model";
import { FeatureIds, FeatureRecord } from "./features";
import { mergeSettings } from "./settings";
import { Settings } from "./settings/internal";
import { SettingsAddition, SettingsSchema } from "./settings/user";
import { appendModelMessagesToPrompt, appendUserMessagesToPrompt, Prompt, promptConstructor } from "./prompt";
import { getGenerateForm } from "./form";
import GenerateOutput from "./output";
import { ContentInput } from "./prompt/user";
import { keys } from "./utils.ts";


class Generate{
  static features = FeatureRecord;

  prompt: Prompt;
  settings: Settings;

  constructor(){
    this.prompt = promptConstructor([]);
    this.settings = {};
  }

  async run(model: GenerateModel): Promise<GenerateOutput> {
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
   * @param Settings - The settings object to be applied.
   *
   */
  setSettings(Settings: Settings){
    const parsedSettings = SettingsSchema.parse(Settings);
    this.settings = parsedSettings;
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
}

export default Generate;