import { FeatureIds, PartialFeatureHandlers } from "../features";
import Generate from "../generate";
import GenerateOutput from "../output";


export type ModelFeatureSupportRecord = {
  [k in FeatureIds]: boolean;
}



abstract class GenerateModel<const TModelIds extends readonly string[]> {
  abstract providerId: string;
  abstract readonly modelIds: readonly string[];
  
  // abstract FeatureSupportRecord: ModelFeatureSupportRecord;
  // abstract FeatureHandlers: PartialFeatureHandlers;
  
  abstract generateInternal(generate: Generate): Promise<GenerateOutput>;

  declare model: TModelIds[number];

  constructor(model: TModelIds[number]) {
    this.model = model;
  }

  async generate(generate: Generate): Promise<GenerateOutput> {

    return this.generateInternal(generate);
  }
  
}

export default GenerateModel;