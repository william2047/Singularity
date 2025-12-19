import { ModelSetSpec, GenerateModel, Generate, GenerateOutput, Content, PartialFeatureHandlers, ModelClass } from "@generate/core/internal";

type Range = readonly [number, number];

type BidirectionalMap = {
  forward: (x: number) => number;
  inverse: (y: number) => number;
};


export function createRangeMap(
  [a1, a2]: Range,
  [b1, b2]: Range
): BidirectionalMap {
  const scale = (b2 - b1) / (a2 - a1);

  return {
    forward: (x) => parseFloat((b1 + (x - a1) * scale).toFixed(1)),
    inverse: (y) => parseFloat((a1 + (y - b1) / scale).toFixed(1)),
  };
}


type GeminiAuthoringSpec = {
  TemperatureRange: BidirectionalMap;
}

export type GeminiModelSpec = ModelSetSpec<GeminiAuthoringSpec>;


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

type ModelSet<TModelSpec extends ModelSetSpec<any>> = {
  [k in TModelSpec["models"][number]["modelLabel"]]: ModelClass;
}

function GeminiModelConstructor<
  const TModel extends GeminiModelSpec["models"][number],
>(model: TModel, providerId: string){

  const authoring = model.authoring;

  class ModelClass extends GenerateModel {
    readonly providerId = providerId;
    readonly modelId = model.modelId;

    apiKey: string;

    featureSupportRecord = {
      ...model.featureSupportRecord,
    };

    constructor(apiKey: string, featureHandler?: PartialFeatureHandlers) {
      super(featureHandler);
      this.apiKey = apiKey;
    }

    buildRequestBody(generate: Generate) {
      const body = {
        contents: generate.prompt.messages.map((msg) => ({
          role: msg.role,
          parts: msg.content.map((part) => contentToGeminiPart(part)),
        })),
        generationConfig: {},
      } as any;

      if (generate.settings.temperature) {
        // (also: consider guarding authoring existence; left as-is)
        body.generationConfig["temperature"] =
          authoring.TemperatureRange.forward(generate.settings.temperature);
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
        throw new Error(
          `Gemini API request failed with status ${req.status}: ${await req.text()}`
        );
      }

      const res = await req.json();

      return {
        modelId: this.modelId,
        providerId: this.providerId,
        providerData: {
          request: body,
          response: res,
        },
        message: res.candidates[0].content.parts.map((part: any) =>
          geminiPartToContent(part)
        ),
      };
    }
  }

  return ModelClass;
}


export function GeminiModelClassFactory<
  const TModelSpec extends GeminiModelSpec,
>(
  ModelSetSpec: TModelSpec
): ModelSet<TModelSpec>{

  const ModelSet = {} as ModelSet<TModelSpec>;

  for (const model of ModelSetSpec.models) {

    const ModelClass = GeminiModelConstructor(model, ModelSetSpec.providerId);

    ModelSet[model.modelLabel as TModelSpec["models"][number]["modelLabel"]] = ModelClass;
  }

  return ModelSet;
}