import { Settings } from "./internal";
import { SettingsAddition, SettingsAdditionInputSchema, SettingsSchema } from "./user";


/**
 * Merges two settings objects into one, with the ability to remove specific settings.
 *
 * @param initialSettings - The base settings object to start with.
 * @param newSettings - An object containing new settings to merge into the initial settings.
 *                      If a property in this object is set to `"unset"`, that property will be removed
 *                      from the resulting settings object.
 * @returns A new settings object that combines the initial settings with the new settings,
 *          excluding any properties explicitly marked as `"unset"`.
 */
export function mergeSettings(initialSettings: Settings, newSettings: SettingsAddition): Settings {
  const parsedInitialSettings = SettingsSchema.parse(initialSettings);
  const parsedNewSettings = SettingsAdditionInputSchema.parse(newSettings);
  
  const mergedSettings: Settings = { ...parsedInitialSettings };
  // Remove any settings that are marked as "unset"
  for (const key of Object.keys(parsedNewSettings) as (keyof SettingsAddition)[]) {
    
    if (parsedNewSettings[key] === "unset") {
      delete mergedSettings[key];
      
    } else if(parsedNewSettings[key] === undefined){
      continue;
    }

    else{
      mergedSettings[key] = parsedNewSettings[key];
    }
  }


  return mergedSettings;
}