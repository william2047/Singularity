import GenerateModel from "./generate-model";
import { FeatureIds, FeaturesRecord } from "./features";
import { mergeSettings } from "./settings";
import { Settings } from "./settings/internal";
import { SettingsAddition, SettingsSchema } from "./settings/user";
import { Prompt, promptConstructor } from "./prompt";
import { generateSnapshot } from "./snapshot";


class Generate{
  static features = FeaturesRecord;

  prompt: Prompt;
  settings: Settings;

  constructor(){
    this.prompt = promptConstructor([]);
    this.settings = {};
  }

  run(model: GenerateModel<any>){
    // model.generate(this);
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
    
    Object.values(FeaturesRecord)
    .forEach((feature) => {
      if(feature.existenceChecker(this)){
        usedFeatures.push(feature.id);
      }
    })

    return usedFeatures;
  }


  getSnapshot(){
    return generateSnapshot(this);
  }
}

export default Generate;