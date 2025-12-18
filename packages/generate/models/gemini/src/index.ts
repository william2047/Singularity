import {
  GenerateModel,
  Generate,
  GenerateOutput,
  Content,
  PartialFeatureHandlers,
} from "@generate/core/internal"
import FeatureSupportRecord from "./feature-support-record";

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
  

function geminiBody(generate: Generate) {
  return {
    contents : generate.prompt.messages.map((msg) => ({
      role: msg.role,
      parts: msg.content.map(part => contentToGeminiPart(part)),
    })),
  };
}



export class GeminiModel extends GenerateModel{
  featureSupportRecord = FeatureSupportRecord;
  
  providerId = "gemini";
  readonly modelId = "gemini-2.5-flash";

  apiKey: string;

  constructor(apiKey: string, featureHandler?: PartialFeatureHandlers){
    super(featureHandler);
    this.apiKey = apiKey;
  }

  async generateInternal(generate: Generate): Promise<GenerateOutput> {
    const body = geminiBody(generate);

    const request = {
      method: "POST",
      headers: {
      "x-goog-api-key": this.apiKey,
      "Content-Type": "application/json",
      },
      body: JSON.stringify(geminiBody(generate)),
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