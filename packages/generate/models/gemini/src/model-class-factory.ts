import { ModelSetSpec, ModelSet, GenerateModel, Generate, GenerateOutput, Content, PartialFeatureHandlers, ModelClass } from "@generate/core/internal";

type Range = readonly [number, number];

type BidirectionalMap = {
  forward: (x: number) => number;
  inverse: (y: number) => number;
};


function createRangeMap(
  [a1, a2]: Range,
  [b1, b2]: Range
): BidirectionalMap {
  const scale = (b2 - b1) / (a2 - a1);

  return {
    forward: (x) => b1 + (x - a1) * scale,
    inverse: (y) => a1 + (y - b1) / scale,
  };
}


type AuthoringSpec = {
  TemperatureRange: BidirectionalMap;
}



function contentToGeminiPart(content: Content): any{
  switch(content.type){
    case "text":
      return { text: content.value };

    default:
      throw new Error(`Unsupported content type: ${content.type}`);
  }
}

function geminiPartToContent(part: any): Content {
  if(part.text){
    return {
      type: "text",
      value: part.text,
    }
  }

  throw new Error(`Unsupported Gemini part: ${JSON.stringify(part)}`);
}



export function GeminiModelClassFactory(ModelSetSpec: ModelSetSpec<AuthoringSpec>): ModelSet {

  const modelClasses: ModelClass[] = [];
  
  for(const model of ModelSetSpec.models){

    const authoring = model.authoring ?? undefined;

    class ModelClass extends GenerateModel{
      readonly providerId = ModelSetSpec.providerId;
      readonly modelId = model.modelId;

      apiKey: string;
      
      featureSupportRecord = {
        ...model.featureSupportRecord,
      };


      constructor(apiKey: string, featureHandler?: PartialFeatureHandlers){
        super(featureHandler);
        this.apiKey = apiKey;
      }

      buildRequestBody (generate: Generate) {
        
        const body = {
          contents : generate.prompt.messages.map((msg) => ({
            role: msg.role,
            parts: msg.content.map(part => contentToGeminiPart(part)),
          })),
          generationConfig: {}
        } as any

        if(generate.settings.temperature){
          body.generationConfig["temperature"] = authoring.TemperatureRange.forward(generate.settings.temperature);
        }
        
        return body;
      }

      async generateInternal(generate: Generate): Promise<GenerateOutput> {
        const body = this.buildRequestBody(generate);

        const request = {
          method: "POST",
          headers: {
          "x-goog-api-key": this.apiKey,
          "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };
    
        const req = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${this.modelId}:generateContent`,
          request
        );
    
        if (!req.ok) {
          throw new Error(`Gemini API request failed with status ${req.status}: ${await req.text()}`);
        }
    
        const res = await req.json();
    
    
        return {
          modelId: this.modelId,
          providerId: this.providerId,
          providerData: {
            request: body,
            response: res
          },
          message: res.candidates[0].content.parts.map((part: any) => geminiPartToContent(part)),
        }
    
      }
    }

    modelClasses.push(ModelClass);
  }

  return {
    providerId: ModelSetSpec.providerId,
    models: modelClasses
  }
}