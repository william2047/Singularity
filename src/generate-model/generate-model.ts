import { PartialFeatureHandlers } from "../generate/features";
import Generate from "../generate/generate";
import GenerateResult from "../generate/generate-result";
import { ModelFeatureSupportRecord } from "./features";





abstract class GenerateModel {
  abstract FeatureSupportRecord: ModelFeatureSupportRecord;
  abstract FeatureHandlers: PartialFeatureHandlers;

  abstract providerId: string;
  abstract modelId: string;

  
  abstract generate(generate: Generate): GenerateResult;

  
}

export default GenerateModel;