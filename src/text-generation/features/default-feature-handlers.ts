import { FeatureHandlers } from ".";

const defaultFeatureHandlers = {
  'settings.temperature': {
    id: 'settings.temperature',
    onUnsupported: 'fallback',
    fallbackFn: (generate) => {},
  },
  'settings.maxTokens': {
    id: 'settings.maxTokens',
    onUnsupported: 'fallback',
    fallbackFn: (generate) => {},
  },
  'settings.topP': {
    id: 'settings.topP',
    onUnsupported: 'fallback',
    fallbackFn: (generate) => {},
  },
  'settings.frequencyPenalty': {
    id: 'settings.frequencyPenalty',
    onUnsupported: 'fallback',
    fallbackFn: (generate) => {},
  },
  'settings.presencePenalty': {
    id: 'settings.presencePenalty',
    onUnsupported: 'fallback',
    fallbackFn: (generate) => {},
  },
  'prompt.messages.content.typeText': {
    id: 'prompt.messages.content.typeText',
    onUnsupported: 'error',
  },

} as const satisfies FeatureHandlers;

export default defaultFeatureHandlers;