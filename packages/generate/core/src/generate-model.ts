import { FeatureIds, PartialFeatureHandlers } from "./features";
import Generate from "./generate";
import GenerateResult from "./generate-result";


export type ModelFeatureSupportRecord = {
  [k in FeatureIds]: boolean;
}



abstract class GenerateModel<TModleIds extends string> {
  abstract providerId: string;

  // abstract FeatureSupportRecord: ModelFeatureSupportRecord;
  // abstract FeatureHandlers: PartialFeatureHandlers;
  
  // abstract generate(generate: Generate): GenerateResult;

  model: TModleIds;

  constructor(model: TModleIds) {
    this.model = model;
  }
  
}

export default GenerateModel;