import { Content } from "./prompt/internal";

type GenerateOutput = {
  modelProviderId: string;
  modelId: string;

  provider: {
    request: unknown      // exact request body sent
    response: unknown     // exact provider response
  }  
}