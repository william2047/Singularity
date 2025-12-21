import Generate from "./generate";
import { type GenerateForm } from "./form";



export function generateFromForm(snapshot: GenerateForm): Generate {
  return new Generate();
}