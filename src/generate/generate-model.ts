import { FeatureIds, PartialFeatureHandlers } from "./features";
import Generate from "./generate";
import GenerateResult from "./generate-result";


export type ModelFeatureSupportRecord = {
  [k in FeatureIds]: boolean;
}



abstract class GenerateModel {
  abstract FeatureSupportRecord: ModelFeatureSupportRecord;
  abstract FeatureHandlers: PartialFeatureHandlers;

  abstract providerId: string;
  abstract modelId: string;

  
  abstract generate(generate: Generate): GenerateResult;

  
}

export default GenerateModel;