import Generate from "./generate";
import { GenerateSnapshot } from "./snapshot";



export function generateFromSnapshot(snapshot: GenerateSnapshot): Generate {
  return new Generate();
}