import Generate from "../generate";
import FeaturesRecord, { FeatureIds } from "./record";

export type Feature = {
  id: string;
  name: string;
  description: string;
  existenceChecker: (generate: Generate) => boolean;
};

export {
  FeatureIds,
  FeaturesRecord,
}