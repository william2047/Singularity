import { FeatureEntry } from ".";



const FeatureRecord= {
  'settings.temperature': {
    name: 'Temperature',
    description: 'Balances creativity and reliability in the generated content',
    incompatibleWith: ["settings.topP"],
    existenceChecker: (generate) => generate.settings.temperature !== undefined,
  },

  'settings.maxTokens': {
    name: 'Max Tokens',
    description: 'Limits the length of the generated content',
    existenceChecker: (generate) => generate.settings.maxTokens !== undefined,
  },

  'settings.topP': {
    name: 'Top P',
    description: 'Controls the diversity of the generated content',
    incompatibleWith: ['settings.temperature'],
    existenceChecker: (generate) => generate.settings.topP !== undefined,
  },

  'settings.frequencyPenalty': {
    name: 'Frequency Penalty',
    description: 'Reduces the likelihood of repeated phrases in the generated content',
    existenceChecker: (generate) => generate.settings.frequencyPenalty !== undefined,
  },

  'settings.presencePenalty': {
    name: 'Presence Penalty',
    description: 'Encourages the model to introduce new topics in the generated content',
    existenceChecker: (generate) => generate.settings.presencePenalty !== undefined,
  },

  'inputContent.typeText': {
    name: 'Text Content',
    description: 'The content type of the message is text',
    existenceChecker: (generate) => generate.prompt.messages.some(msg => msg.content.some((content) => content.type === 'text')),
  },
} as const satisfies Record<string, FeatureEntry>;
export default FeatureRecord;

export type FeatureIds = keyof (typeof FeatureRecord);