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

export type PartialFeatureHandlers = {
  [K in FeatureIds]?: Partial<FeatureHandler>;
};  


export function mergeFeatureHandlers(fullFeatureHandler: FeatureHandlers, ...partialFeatureHandlers: PartialFeatureHandlers[]): FeatureHandlers {
  const mergedHandlers = { ...fullFeatureHandler };

  for (const partialHandler of partialFeatureHandlers) {
    for (const featureId in partialHandler) {
      if (partialHandler.hasOwnProperty(featureId)) {
        const fullHandler = mergedHandlers[featureId as FeatureIds];
        const partialFeature = partialHandler[featureId as FeatureIds];

        if (partialFeature) {
          mergedHandlers[featureId as FeatureIds] = {
            ...fullHandler,
            ...partialFeature,
          };
        }
      }
    }
  }

  return mergedHandlers;
}



export {
  type FeatureIds,
  FeaturesRecord,
  defaultFeatureHandlers,
};