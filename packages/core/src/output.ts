import { ContentForm } from "./prompt";

export type GenerateOutput = {
  providerId: string;
  modelId: string;

  providerData: {
    request: unknown      // exact request body sent
    response: unknown     // exact provider response
  }

  message: ContentForm[];
}