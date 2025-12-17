import Generate from "../generate";
import FeatureRecord, { FeatureIds } from "./record";
import defaultFeatureHandlers from "./default-feature-handlers";
import { keys } from "../utils.ts";

export type FeatureEntry = {
  name: string;
  description: string;
  incompatibleWith?: string[];
  existenceChecker: (generate: Generate) => boolean;
};



type FeatureHandlerFallback = {
  onUnsupported: "fallback";
  fallbackFn: (generate: Generate) => void;
};

type FeatureHandlerNoFallback = {
  onUnsupported: "error" | "ignore" ;
  fallbackFn?: (generate: Generate) => void;
};


export type FeatureHandler = 
  | FeatureHandlerFallback
  | FeatureHandlerNoFallback


export type FeatureHandlers = {
  [K in FeatureIds]: FeatureHandler;
};

export type PartialFeatureHandlers = {
  [K in FeatureIds]?: Partial<FeatureHandler>;
};  


export function mergeFeatureHandlers(fullFeatureHandler: FeatureHandlers, ...featureHandlers: PartialFeatureHandlers[]): FeatureHandlers {
  const mergedHandlers = { ...fullFeatureHandler };

  for(const partialhandler of featureHandlers){
    for(const featureId of keys(partialhandler)){
      mergedHandlers[featureId] = {
        ...mergedHandlers[featureId],
        ...partialhandler[featureId],
      } as FeatureHandler;
    }
  }

  return mergedHandlers;
}



export {
  type FeatureIds,
  FeatureRecord,
  defaultFeatureHandlers,
};