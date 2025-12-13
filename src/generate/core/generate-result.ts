import Generate from "./generate";
import { Message } from "./prompt/internal";

class GenerateResult {
  content : Message;
  

  constructor(generate: Generate, content: Message) {
    this.content = content;

  }
}

export default GenerateResult;