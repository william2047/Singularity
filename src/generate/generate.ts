import { FeatureIds, FeaturesRecord } from "./features";
import Prompt from "./prompt";
import { mergeSettings } from "./settings";
import { Settings, SettingsAddition } from "./settings/internal";
import { SettingsAdditionInputSchema, SettingsSchema } from "./settings/user";


class Generate{
  static features = FeaturesRecord;

  prompt: Prompt;
  settings: Settings;

  constructor(){
    this.prompt = new Prompt();
    this.settings = {};
  }

  /**
   * Updates the settings for the current instance by validating and parsing
   * the provided settings object against the defined schema.
   *
   * @param Settings - The settings object to be applied.
   *
   * @throws {ZodError} If the provided settings object does not conform to the settings format.
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
   * @throws {ZodError} If the provided settings do not match the `SettingsAdditionInputSchema`.
   */
  editSettings(settingsAddition: Partial<SettingsAddition>){
    const parsedNewSettings = SettingsAdditionInputSchema.parse(settingsAddition);
    
    const mergedSettings =  mergeSettings(this.settings, parsedNewSettings);
    this.settings = mergedSettings;
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
}

export default Generate;


const gen = new Generate();