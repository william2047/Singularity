import Generate from "../generate";
import { FeatureIds, FeatureRecord } from "./record";
import defaultFeatureHandlers from "./default-feature-handlers";
import { keys } from "../utils.ts";


type FeatureEntryBase<TFeatureId extends FeatureIds> = {
  name: string;
  description: string;
  incompatibleWith?: Exclude<FeatureIds, TFeatureId>[];
  existenceChecker: (generate: Generate) => void;
};


export type FeatureEntry<TFeatureId extends FeatureIds> =
  | (FeatureEntryBase<TFeatureId> & {
      structural: true;
    })
  | (FeatureEntryBase<TFeatureId> & {
      structural: false;
      onIgnore: (generate: Generate) => void; // allowed only here
    });

export type TFeatureRecord = {
  [k in FeatureIds]: FeatureEntry<k>;
};


export type ModelFeatureSupportRecord = {
  [k in FeatureIds]?: boolean;
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
  [K in FeatureIds]: FeatureHandler<K>;
};

export type PartialFeatureHandlers = {
  [K in FeatureIds]?: FeatureHandler<K>;
};


function normalizeFeatureHandler<TFeatureId extends FeatureIds>(
  featureId: TFeatureId,
  currentHandler: FeatureHandler<TFeatureId>,
  mergeHandler: Partial<FeatureHandler<TFeatureId>> | undefined
): FeatureHandler<TFeatureId>{

  if(!mergeHandler) return currentHandler;

  const onUnsupported = mergeHandler.onUnsupported ?? currentHandler.onUnsupported;
  const fallbackFn = mergeHandler.fallbackFn ?? currentHandler.fallbackFn;

  if(onUnsupported === 'fallback' && !fallbackFn){
    throw new Error(`Feature set to fallback but no fallback function provided: ${featureId}`);
  }
  
  // If a feature is structural, it cannot be ignored.
  if(FeatureRecord[featureId].structural && onUnsupported === 'ignore'){
    throw new Error(`Cannot ignore structural feature: ${featureId}`);
  }

  return {
    onUnsupported,
    fallbackFn,
  } as FeatureHandler<TFeatureId>;
}


// Helper to set feature handler while making TypeScript happy
function setFeatureHandler<K extends FeatureIds>(
  target: FeatureHandlers,
  key: K,
  value: FeatureHandler<K>
) {
  (target as Record<FeatureIds, FeatureHandler<FeatureIds>>)[key] = value;
}


// Merges multiple partial feature handlers into a full feature handler.
export function mergeFeatureHandlers(fullFeatureHandler: FeatureHandlers, ...featureHandlers: PartialFeatureHandlers[]): FeatureHandlers {
  const mergedHandlers = { ...fullFeatureHandler };
  for(const partialhandler of featureHandlers){

    for(const featureId of keys(partialhandler)){
      const normalizedHandler = normalizeFeatureHandler(
        featureId,
        mergedHandlers[featureId] as FeatureHandler<typeof featureId>,
        partialhandler[featureId] as FeatureHandler<typeof featureId>,
      );

      setFeatureHandler(mergedHandlers, featureId, normalizedHandler);
    }
  }

  return mergedHandlers;
}



export {
  type FeatureIds,
  FeatureRecord,
  defaultFeatureHandlers,
};