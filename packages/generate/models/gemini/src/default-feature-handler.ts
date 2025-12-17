import {FeatureHandlers} from "@generate/core/internal"

const FeatureSupportHandler: FeatureHandlers = {
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
};

export default FeatureSupportHandler;