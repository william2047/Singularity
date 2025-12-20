import fs from "fs"
import path from "path"
import { GeminiModelSet } from "../src/base"
import geminiModelSet from "../src/spec"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "../src/generated");


function geminiModelFile(model: GeminiModelSet["models"][number]): string {

  return `

  export class ${model.modelLabel} extends GeminiModel {
    readonly modelId = "${model.modelId}";
    
    featureSupportRecord = ${JSON.stringify(model.featureSupportRecord, null, 2)};

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
          ${JSON.stringify(model.authoring.TemperatureRange)}
        )
      }

      return body;
    }
  }
  
`
}

let fileContent = `
import { GeminiModel } from "../base";
import Generate from "@generate/core/"`

for (const model of geminiModelSet.models) {

  fileContent = fileContent + geminiModelFile(model) + "\n\n\n"

}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const outputPath = path.join(outDir, "index.ts");

fs.writeFileSync(outputPath, fileContent, "utf-8");