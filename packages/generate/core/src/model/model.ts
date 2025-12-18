import { PartialFeatureHandlers, ModelFeatureSupportRecord, mergeFeatureHandlers, defaultFeatureHandlers } from "../features";
import Generate from "../generate";
import GenerateOutput from "../output";





abstract class GenerateModel{
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
      this.featureHandler,
      featureHandler ?? {}
    )
  }

  async generate(generate: Generate): Promise<GenerateOutput> {

    return this.generateInternal(generate);
  }
  
}

export default GenerateModel;