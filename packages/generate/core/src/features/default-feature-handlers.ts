import { FeatureHandlers } from ".";

const defaultFeatureHandlers = {
  'settings.temperature': {
    onUnsupported: 'error',
  },
  'settings.maxTokens': {
    onUnsupported: 'error',
  },
  'settings.topP': {
    onUnsupported: 'error',
  },
  'settings.frequencyPenalty': {
    onUnsupported: 'error',
  },
  'settings.presencePenalty': {
    onUnsupported: 'error',
  },
  'inputContent.typeText': {
    onUnsupported: 'error',
  },

} as const satisfies FeatureHandlers;

export default defaultFeatureHandlers;