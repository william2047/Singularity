import { ModelFeatureSupportRecord } from "@singularity/core";
import { GenerateModel } from "./model";

export type ModelClass = new (...args: any[]) => GenerateModel;

export type ModelSpec<TAuthoringSpec extends object> = {
  modelId: string;
  modelLabel: string;
  featureSupportRecord: ModelFeatureSupportRecord;
  authoring: TAuthoringSpec;
}

export type ModelSet<TAuthoringSpec extends object> = {
  providerId: string;
  models: ModelSpec<TAuthoringSpec>[];
}