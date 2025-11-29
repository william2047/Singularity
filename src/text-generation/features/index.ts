import Generate from "../generate";
import FeaturesRecord, { FeatureIds } from "./record";
import defaultFeatureHandlers from "./default-feature-handlers";

export type FeatureBase = {
  id: string;
  name: string;
  description: string;
  existenceChecker: (generate: Generate) => boolean;
};


export type FeatureHandler = {
  id: FeatureIds;
  onUnsupported: 'error' | 'fallback' | 'ignore';
  fallbackFn?: (generate: Generate) => void;
}

export type FeatureHandlers = {
  [K in FeatureIds]: FeatureHandler;
};

export {
  FeatureIds,
  FeaturesRecord,
  defaultFeatureHandlers,
}