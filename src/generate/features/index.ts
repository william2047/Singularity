import Generate from "../generate";

type feature = {
  id: string;
  name: string;
  desription: string;
  existenceChecker: (generate: Generate) => boolean;
};


const Features = {
  'settings.temperature': {
    id: 'settings.temperature',
    name: 'Temperature',
    description: 'Balances creativity and reliability in the generated content',
    existenceChecker: (generate: Generate) => generate.settings.temperature !== undefined,
  },

  'settings.maxTokens': {
    id: 'settings.maxTokens',
    name: 'Max Tokens',
    description: 'Limits the length of the generated content',
  },

  'settings.topP': {
    id: 'settings.topP',
    name: 'Top P',
    description: 'Controls the diversity of the generated content',
  },

  'settings.frequencyPenalty': {
    id: 'settings.frequencyPenalty',
    name: 'Frequency Penalty',
    description: 'Reduces the likelihood of repeated phrases in the generated content',
  },

  'settings.presencePenalty': {
    id: 'settings.presencePenalty',
    name: 'Presence Penalty',
    description: 'Encourages the model to introduce new topics in the generated content',
  },

  'settings.stop': {
    id: 'settings.stop',
    name: 'Stop Sequence',
    description: 'Specifies a stopping sequence for the generated content',
  },

  'prompt.messages.content.typeText': {
    id: 'prompt.messages.content.typeText',
    name: 'Text Content',
    description: 'The content type of the message is text',
  },

  'prompt.messages.content.typeImageBase64': {
    id: 'prompt.messages.content.typeImageBase64',
    name: 'Base64 Image Content',
    description: 'The content type of the message is an image encoded in base64',
  },

  'prompt.messages.content.typeImageUrl': {
    id: 'prompt.messages.content.typeImageUrl',
    name: 'Image URL Content',
    description: 'The content type of the message is an image URL',
  },

} as const;