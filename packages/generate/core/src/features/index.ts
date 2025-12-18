import Generate from "../generate";
import FeatureRecord, { FeatureIds } from "./record";
import defaultFeatureHandlers from "./default-feature-handlers";
import { keys } from "../utils.ts";

export type FeatureEntry = {
  name: string;
  description: string;
  incompatibleWith?: string[];
  existenceChecker: (generate: Generate) => boolean;
  structural: Boolean;
};


export type ModelFeatureSupportRecord = {
  [k in FeatureIds]: boolean;
}


// Features that fallback must provide a fallback function.
type FeatureHandlerFallback<TFeatureId extends FeatureIds> = {
  onUnsupported: "fallback";
  fallbackFn: (generate: Generate) => void;
};

type FeatureHandlerNoFallback<TFeatureId extends FeatureIds> = {
  // Does not allow structural features to be ignored.
  onUnsupported: (typeof FeatureRecord)[TFeatureId]["structural"] extends true ? "error" : ("ignore" | "error");
  fallbackFn?: (generate: Generate) => void;
};



export type FeatureHandler<TFeatureId extends FeatureIds> = 
  | FeatureHandlerFallback<TFeatureId>
  | FeatureHandlerNoFallback<TFeatureId>


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