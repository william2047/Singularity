import { type GeminiModelSet } from "./base";

const temperatureRange = {
  generate: [0, 1],
  output: [0, 2]
} as const;



const geminiModelSet = {
  providerId: "gemini",
  models: [
    {
      modelLabel: "Gemini3ProPreview",
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
      modelLabel: "Gemini3FlashPreview",
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
      modelLabel: "Gemini25Flash",
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
      modelLabel: "Gemini25FlashPreview",
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
      modelLabel: "Gemini25Pro",
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
      modelLabel: "Gemini25FlashLite",
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
      modelLabel: "Gemini25FlashLitePreview",
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

} as const satisfies GeminiModelSet;
export default geminiModelSet;
