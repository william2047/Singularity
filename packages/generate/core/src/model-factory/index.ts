import { ModelFeatureSupportRecord, PartialFeatureHandlers } from "../features";

interface ModelSpec {
  modelId: string;
  featureSupport: Partial<ModelFeatureSupportRecord>;
}

interface ModelSetSpec {
  providerId: string;

  baseFeatureSupport: Partial<ModelFeatureSupportRecord>;
  baseFeatureHandlers: PartialFeatureHandlers;

  models: ModelSpec[];
}