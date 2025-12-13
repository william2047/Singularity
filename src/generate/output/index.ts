import GenerateModel from "../../generate-model/generate-model";
import { FeatureIds } from "../features";
import Generate from "../generate";
import { Content } from "../prompt/internal";

class GenerateOutput { 
  readonly originalInput: Generate;
  readonly effectiveInput: Generate;

  readonly modelProviderId: string
  readonly modelId: string;
  
  readonly usedFeatures: FeatureIds[];

  readonly output: Content[];
  
  constructor(
    output: Content[],
    originalInput: Generate,
    effectiveInput: Generate,
    model: GenerateModel
  ) {

    this.output = output;
    this.originalInput = originalInput;
    this.effectiveInput = effectiveInput;
    this.modelProviderId = model.providerId;
    this.modelId = model.modelId;

    this.usedFeatures = originalInput.getUsedFeatures();
  }


  appendToPrompt(generate: Generate = this.originalInput) {
    generate.prompt.addModel(this.output);
  }
}

export default GenerateOutput;