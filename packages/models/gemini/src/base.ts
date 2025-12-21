import { Content, Generate, GenerateModel, GenerateOutput, ModelSet } from "@singularity/model";

type Range = readonly [number, number];

type RangeMap = {
  generate: Range;
  output: Range;
}



type GeminiAuthoringSpec = {
  TemperatureRange: RangeMap;
}

export type GeminiModelSet = ModelSet<GeminiAuthoringSpec>;


export abstract class GeminiModel extends GenerateModel{
  readonly providerId = "gemini";

  abstract buildRequestBody(generate: Generate): any;
  
  apiKey: string;
  abstract modelId: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  contentToGeminiPart(content: Content): any{
    switch(content.type){
      case "text":
        return { text: content.value };
  
      default:
        throw new Error(`Unsupported content type: ${content.type}`);
    }
  }
  
  geminiPartToContent(part: any): Content {
    if(part.text){
      return {
        type: "text",
        value: part.text,
      }
    }
  
    throw new Error(`Unsupported Gemini part: ${JSON.stringify(part)}`);
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
        this.geminiPartToContent(part)
      ),
    };
  }


}