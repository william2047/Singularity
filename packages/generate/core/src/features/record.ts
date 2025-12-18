import { FeatureEntry } from ".";



const FeatureRecord= {
  'settings.temperature': {
    name: 'Temperature',
    description: 'Balances creativity and reliability in the generated content',
    incompatibleWith: ["settings.topP"],
    existenceChecker: (generate) => generate.settings.temperature !== undefined,
    structural: false,
  },

  'settings.maxTokens': {
    name: 'Max Tokens',
    description: 'Limits the length of the generated content',
    existenceChecker: (generate) => generate.settings.maxTokens !== undefined,
    structural: false,
  },

  'settings.topP': {
    name: 'Top P',
    description: 'Controls the diversity of the generated content',
    incompatibleWith: ['settings.temperature'],
    existenceChecker: (generate) => generate.settings.topP !== undefined,
    structural: false,
  },

  'settings.frequencyPenalty': {
    name: 'Frequency Penalty',
    description: 'Reduces the likelihood of repeated phrases in the generated content',
    existenceChecker: (generate) => generate.settings.frequencyPenalty !== undefined,
    structural: false,
  },

  'settings.presencePenalty': {
    name: 'Presence Penalty',
    description: 'Encourages the model to introduce new topics in the generated content',
    existenceChecker: (generate) => generate.settings.presencePenalty !== undefined,
    structural: false,
  },

  'inputContent.typeText': {
    name: 'Text Content',
    description: 'The content type of the message is text',
    existenceChecker: (generate) => generate.prompt.messages.some(msg => msg.content.some((content) => content.type === 'text')),
    structural: true,
  },
} as const satisfies Record<string, FeatureEntry>;
export default FeatureRecord;

export type FeatureIds = keyof (typeof FeatureRecord);