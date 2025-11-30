import { Settings, SettingsAddition } from "./internal";


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
  const mergeSettings = {initialSettings, ...(newSettings ?? {})};

  // Remove any settings that are marked as "unset"
  for (const key in newSettings) {
    if (newSettings[key as keyof SettingsAddition] === "unset") {
      delete mergeSettings[key as keyof Settings];
    }
  }

  return mergeSettings as Settings;
}