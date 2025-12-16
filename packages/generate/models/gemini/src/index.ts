import Generate, { GenerateModel } from "@generate/core";
import GenerateOutput from "../../../core/src/output";
import { Content } from "../../../core/src/prompt/internal";


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



const modelIds = ["gemini-2.0-flash-lite","gemini-2.5-flash"] as const

export class GeminiModel extends GenerateModel<typeof modelIds> {
  providerId = "gemini";
  readonly modelIds = modelIds;

  apiKey: string;

  constructor(model: typeof modelIds[number], apiKey: string) {
    super(model);
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
      `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`,
      request
    );

    if (!req.ok) {
      throw new Error(`Gemini API request failed with status ${req.status}: ${await req.text()}`);
    }

    const res = await req.json();


    return {
      modelId: this.model,
      providerId: this.providerId,
      providerData: {
        request: body,
        response: res
      },
      message: res.candidates[0].content.parts.map((part: any) => geminiPartToContent(part)),
    }
  }
}