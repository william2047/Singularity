import z, { parse } from "zod";
import { MessageInput, MessageInputSchema } from "./input";
import { promptCreate, Prompt, promptAppendMessages } from "./internal";

export function promptConstructor(messages: MessageInput[]): Prompt {
	const parsedMessages = z.array(MessageInputSchema).parse(messages);

	return promptCreate(parsedMessages)
}

export function appendMessagesToPrompt(prompt: Prompt, ...message: MessageInput[]): Prompt {
	const parsedMessages = z.array(MessageInputSchema).parse(message);

	return promptAppendMessages(prompt, ...parsedMessages);
}

export {
	type Prompt,
}