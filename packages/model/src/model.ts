import Generate, {
  defaultFeatureHandlers,
  FeatureHandlers,
  FeatureRecord,
  GenerateOutput,
  mergeFeatureHandlers,
  ModelFeatureSupportRecord,
  PartialFeatureHandlers
} from "@singularity/core"

function handleFeatures(
  generate: Generate,
  modelFeatureHandler: FeatureHandlers,
  modelFeatureSupportRecord: ModelFeatureSupportRecord
) {
  const usedFeatures = generate.getUsedFeatures();

  for (const featureId of usedFeatures) {
    const isSupported = modelFeatureSupportRecord[featureId] ?? false;

    if (isSupported) continue;

    const onUnsupported = modelFeatureHandler[featureId].onUnsupported;

    // If error, throw error
    if (onUnsupported === "error") {
      throw new Error(`Feature ${featureId} is not supported by this model.`);
    }

    // If ignore, call the onIgnore function. If not defined, throw error
    else if (onUnsupported === "ignore") {
      const feature = FeatureRecord[featureId];
      if ('onIgnore' in feature && typeof feature.onIgnore === 'function') {
        feature.onIgnore(generate);
      } else {
        throw new Error(`Feature ${featureId} does not have an onIgnore handler.`);
      }
    }

    // If fallback, call the fallback function
    else if (onUnsupported === "fallback") {
      const feature = modelFeatureHandler[featureId];
      feature.fallbackFn(generate)
    }
  }
}


export abstract class GenerateModel {
  abstract providerId: string;
  abstract readonly modelId: string;

  // Map of feature support for this model
  abstract featureSupportRecord: ModelFeatureSupportRecord;
  featureHandler: FeatureHandlers;

  abstract generateInternal(generate: Generate): Promise<GenerateOutput>;

  constructor(featureHandler?: PartialFeatureHandlers) {

    // Cascade merge feature handlers: default handlers < model default handlers < provided handlers
    this.featureHandler = mergeFeatureHandlers(
      defaultFeatureHandlers,
      featureHandler ?? {}
    )
  }

  async generate(generate: Generate): Promise<GenerateOutput> {

    const effectiveGenerate = generate.clone();
    handleFeatures(effectiveGenerate, this.featureHandler, this.featureSupportRecord);


    return this.generateInternal(effectiveGenerate);
  }

}