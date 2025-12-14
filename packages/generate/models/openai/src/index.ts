import { GenerateModel } from "@generate/core";

type OpenAiModelIds = "gemini-1" | "gemini-1.5" | "gemini-2";

class OpenaiModel extends GenerateModel<OpenAiModelIds> {
  providerId = "openai";

}

export default OpenaiModel;