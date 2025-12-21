import Generate from "./generate";
import { GenerateForm } from "./form";



export function generateFromForm(snapshot: GenerateForm): Generate {
  return new Generate();
}