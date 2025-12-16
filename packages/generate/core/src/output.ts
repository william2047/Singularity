import { Content } from "./prompt/internal";

type GenerateOutput = {
  providerId: string;
  modelId: string;

  providerData: {
    request: unknown      // exact request body sent
    response: unknown     // exact provider response
  }

  message: Content[];
}

export default GenerateOutput;