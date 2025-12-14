import { GenerateModel } from "@generate/core";

type GeminiModelIds = "gemini-1" | "gemini-1.5" | "gemini-2";

class GeminiModel extends GenerateModel<GeminiModelIds> {
  providerId = "gemini";

}

export default GeminiModel;