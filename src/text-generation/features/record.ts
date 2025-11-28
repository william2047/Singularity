import { Feature } from ".";

const FeaturesRecord = {
  'settings.temperature': {
    id: 'settings.temperature',
    name: 'Temperature',
    description: 'Balances creativity and reliability in the generated content',
    existenceChecker: (generate) => generate.settings.temperature !== undefined,
  },

  'settings.maxTokens': {
    id: 'settings.maxTokens',
    name: 'Max Tokens',
    description: 'Limits the length of the generated content',
    existenceChecker: (generate) => generate.settings.maxTokens !== undefined,
  },

  'settings.topP': {
    id: 'settings.topP',
    name: 'Top P',
    description: 'Controls the diversity of the generated content',
    existenceChecker: (generate) => generate.settings.topP !== undefined,
  },

  'settings.frequencyPenalty': {
    id: 'settings.frequencyPenalty',
    name: 'Frequency Penalty',
    description: 'Reduces the likelihood of repeated phrases in the generated content',
    existenceChecker: (generate) => generate.settings.frequencyPenalty !== undefined,
  },

  'settings.presencePenalty': {
    id: 'settings.presencePenalty',
    name: 'Presence Penalty',
    description: 'Encourages the model to introduce new topics in the generated content',
    existenceChecker: (generate) => generate.settings.presencePenalty !== undefined,
  },

  'prompt.messages.content.typeText': {
    id: 'prompt.messages.content.typeText',
    name: 'Text Content',
    description: 'The content type of the message is text',
    existenceChecker: (generate) => false,
  },

  'prompt.messages.content.typeImageBase64': {
    id: 'prompt.messages.content.typeImageBase64',
    name: 'Base64 Image Content',
    description: 'The content type of the message is an image encoded in base64',
    existenceChecker: (generate) => false,
  },

  'prompt.messages.content.typeImageUrl': {
    id: 'prompt.messages.content.typeImageUrl',
    name: 'Image URL Content',
    description: 'The content type of the message is an image URL',
    existenceChecker: (generate) => false,
  },

} as const satisfies Record<string, Feature>;
export default FeaturesRecord;

export type Features = typeof FeaturesRecord;
export type FeatureIds = keyof Features;
