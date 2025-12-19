import { createRangeMap, GeminiModelClassFactory, type GeminiModelSpec } from "./model-class-factory";

const temperatureRange = createRangeMap(
  [0, 1],
  [0, 2]
)

const geminiModelSpec = {
  providerId: "gemini",
  models: [
    {
      modelLabel: "GEMINI_3_PRO_PREVIEW",
      modelId: "gemini-3-pro-preview",
      authoring: {
        TemperatureRange: temperatureRange,
      },
      featureSupportRecord: {
        "inputContent.typeText": true,
        "settings.temperature": true,
      },
    },
    {
      modelLabel: "GEMINI_3_FLASH_PREVIEW",
      modelId: "gemini-3-flash-preview",
      authoring: {
        TemperatureRange: temperatureRange,
      },
      featureSupportRecord: {
        "inputContent.typeText": true,
        "settings.temperature": true,
      },
    },
    {
      modelLabel: "GEMINI_2_5_FLASH",
      modelId: "gemini-2.5-flash",
      authoring: {
        TemperatureRange: temperatureRange,
      },
      featureSupportRecord: {
        "inputContent.typeText": true,
        "settings.temperature": true,
      },
    },
    {
      modelLabel: "GEMINI_2_5_FLASH_PREVIEW",
      modelId: "gemini-2.5-flash-preview-09-2025",
      authoring: {
        TemperatureRange: temperatureRange,
      },
      featureSupportRecord: {
        "inputContent.typeText": true,
        "settings.temperature": true,
      },
    },
    {
      modelLabel: "GEMINI_2_5_PRO",
      modelId: "gemini-2.5-pro",
      authoring: {
        TemperatureRange: temperatureRange,
      },
      featureSupportRecord: {
        "inputContent.typeText": true,
        "settings.temperature": true,
      },
    },
    {
      modelLabel: "GEMINI_2_5_FLASH_LITE",
      modelId: "gemini-2.5-flash-lite",
      authoring: {
        TemperatureRange: temperatureRange,
      },
      featureSupportRecord: {
        "inputContent.typeText": true,
        "settings.temperature": true,
      },
    },
    {
      modelLabel: "GEMINI_2_5_FLASH_LITE_PREVIEW",
      modelId: "gemini-2.5-flash-lite-preview-09-2025",
      authoring: {
        TemperatureRange: temperatureRange,
      },
      featureSupportRecord: {
        "inputContent.typeText": true,
        "settings.temperature": true,
      },
    },
  ]

} as const satisfies GeminiModelSpec;

const GeminiModels = GeminiModelClassFactory(geminiModelSpec);

export const Gemini_2_5_Flash = GeminiModels["GEMINI_2_5_FLASH"];
export const Gemini_2_5_Pro = GeminiModels["GEMINI_2_5_PRO"];
export const Gemini_3_Pro_Preview = GeminiModels["GEMINI_3_PRO_PREVIEW"];
export const Gemini_3_Flash_Preview = GeminiModels["GEMINI_3_FLASH_PREVIEW"];