
import { GeminiModel } from "../base";
import Generate from "@generate/core/"

  export class Gemini3ProPreview extends GeminiModel {
    readonly modelId = "gemini-3-pro-preview";
    
    featureSupportRecord = {
  "inputContent.typeText": true,
  "settings.temperature": true
};

    forward(x: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
    }

    inverse(y: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return a1 + ((y - b1) * (a2 - a1)) / (b2 - b1);
    }

    buildRequestBody(generate: Generate) {
      const body = {
        contents: generate.prompt.messages.map((msg) => ({
          role: msg.role,
          parts: msg.content.map((part) => this.contentToGeminiPart(part)),
        })),
        generationConfig: {},
      } as any;

      if (generate.settings.temperature) {
        body.generationConfig["temperature"] = this.forward(
          generate.settings.temperature,
          {"generate":[0,1],"output":[0,2]}
        )
      }

      return body;
    }
  }
  





  export class Gemini3FlashPreview extends GeminiModel {
    readonly modelId = "gemini-3-flash-preview";
    
    featureSupportRecord = {
  "inputContent.typeText": true,
  "settings.temperature": true
};

    forward(x: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
    }

    inverse(y: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return a1 + ((y - b1) * (a2 - a1)) / (b2 - b1);
    }

    buildRequestBody(generate: Generate) {
      const body = {
        contents: generate.prompt.messages.map((msg) => ({
          role: msg.role,
          parts: msg.content.map((part) => this.contentToGeminiPart(part)),
        })),
        generationConfig: {},
      } as any;

      if (generate.settings.temperature) {
        body.generationConfig["temperature"] = this.forward(
          generate.settings.temperature,
          {"generate":[0,1],"output":[0,2]}
        )
      }

      return body;
    }
  }
  





  export class Gemini25Flash extends GeminiModel {
    readonly modelId = "gemini-2.5-flash";
    
    featureSupportRecord = {
  "inputContent.typeText": true,
  "settings.temperature": true
};

    forward(x: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
    }

    inverse(y: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return a1 + ((y - b1) * (a2 - a1)) / (b2 - b1);
    }

    buildRequestBody(generate: Generate) {
      const body = {
        contents: generate.prompt.messages.map((msg) => ({
          role: msg.role,
          parts: msg.content.map((part) => this.contentToGeminiPart(part)),
        })),
        generationConfig: {},
      } as any;

      if (generate.settings.temperature) {
        body.generationConfig["temperature"] = this.forward(
          generate.settings.temperature,
          {"generate":[0,1],"output":[0,2]}
        )
      }

      return body;
    }
  }
  

  export class Gemini25FlashPreview extends GeminiModel {
    readonly modelId = "gemini-2.5-flash-preview-09-2025";
    
    featureSupportRecord = {
  "inputContent.typeText": true,
  "settings.temperature": true
};

    forward(x: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
    }

    inverse(y: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return a1 + ((y - b1) * (a2 - a1)) / (b2 - b1);
    }

    buildRequestBody(generate: Generate) {
      const body = {
        contents: generate.prompt.messages.map((msg) => ({
          role: msg.role,
          parts: msg.content.map((part) => this.contentToGeminiPart(part)),
        })),
        generationConfig: {},
      } as any;

      if (generate.settings.temperature) {
        body.generationConfig["temperature"] = this.forward(
          generate.settings.temperature,
          {"generate":[0,1],"output":[0,2]}
        )
      }

      return body;
    }
  }
  





  export class Gemini25Pro extends GeminiModel {
    readonly modelId = "gemini-2.5-pro";
    
    featureSupportRecord = {
  "inputContent.typeText": true,
  "settings.temperature": true
};

    forward(x: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
    }

    inverse(y: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return a1 + ((y - b1) * (a2 - a1)) / (b2 - b1);
    }

    buildRequestBody(generate: Generate) {
      const body = {
        contents: generate.prompt.messages.map((msg) => ({
          role: msg.role,
          parts: msg.content.map((part) => this.contentToGeminiPart(part)),
        })),
        generationConfig: {},
      } as any;

      if (generate.settings.temperature) {
        body.generationConfig["temperature"] = this.forward(
          generate.settings.temperature,
          {"generate":[0,1],"output":[0,2]}
        )
      }

      return body;
    }
  }
  





  export class Gemini25FlashLite extends GeminiModel {
    readonly modelId = "gemini-2.5-flash-lite";
    
    featureSupportRecord = {
  "inputContent.typeText": true,
  "settings.temperature": true
};

    forward(x: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
    }

    inverse(y: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return a1 + ((y - b1) * (a2 - a1)) / (b2 - b1);
    }

    buildRequestBody(generate: Generate) {
      const body = {
        contents: generate.prompt.messages.map((msg) => ({
          role: msg.role,
          parts: msg.content.map((part) => this.contentToGeminiPart(part)),
        })),
        generationConfig: {},
      } as any;

      if (generate.settings.temperature) {
        body.generationConfig["temperature"] = this.forward(
          generate.settings.temperature,
          {"generate":[0,1],"output":[0,2]}
        )
      }

      return body;
    }
  }
  





  export class Gemini25FlashLitePreview extends GeminiModel {
    readonly modelId = "gemini-2.5-flash-lite-preview-09-2025";
    
    featureSupportRecord = {
  "inputContent.typeText": true,
  "settings.temperature": true
};

    forward(x: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1);
    }

    inverse(y: number, rangeMap: {generate: [number,number], output: [number,number]}): number {
      const { generate: [a1, a2], output: [b1, b2] } = rangeMap;
      return a1 + ((y - b1) * (a2 - a1)) / (b2 - b1);
    }

    buildRequestBody(generate: Generate) {
      const body = {
        contents: generate.prompt.messages.map((msg) => ({
          role: msg.role,
          parts: msg.content.map((part) => this.contentToGeminiPart(part)),
        })),
        generationConfig: {},
      } as any;

      if (generate.settings.temperature) {
        body.generationConfig["temperature"] = this.forward(
          generate.settings.temperature,
          {"generate":[0,1],"output":[0,2]}
        )
      }

      return body;
    }
  }
  



