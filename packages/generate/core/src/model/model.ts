import { PartialFeatureHandlers, ModelFeatureSupportRecord, mergeFeatureHandlers, defaultFeatureHandlers } from "../features";
import Generate from "../generate";
import GenerateOutput from "../output";





abstract class GenerateModel<const TModelIds extends readonly string[]> {
  abstract providerId: string;
  abstract readonly modelIds: readonly string[];
  
  abstract featureSupportRecord: ModelFeatureSupportRecord;
  abstract modelDefaultFeatureHandler: PartialFeatureHandlers;
  featureHandler: PartialFeatureHandlers;
  
  abstract generateInternal(generate: Generate): Promise<GenerateOutput>;

  declare model: TModelIds[number];

  constructor(model: TModelIds[number], featureHandler?: PartialFeatureHandlers) {
    this.featureHandler = mergeFeatureHandlers(
      defaultFeatureHandlers,
      featureHandler || {}
    )
    
    this.model = model;
  }

  async generate(generate: Generate): Promise<GenerateOutput> {

    return this.generateInternal(generate);
  }
  
}

export default GenerateModel;