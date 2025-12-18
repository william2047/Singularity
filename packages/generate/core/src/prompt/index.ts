import z, { parse } from "zod";
import { ContentInput, ContentInputSchema, MessageInput, MessageInputSchema } from "./user";
import { promptCreate, Prompt, promptAppendMessages } from "./internal";

export function promptConstructor(messages: MessageInput[]): Prompt {
	const parsedMessages = z.array(MessageInputSchema).parse(messages);

	return promptCreate(parsedMessages)
}

export function appendMessagesToPrompt(prompt: Prompt, ...message: MessageInput[]): Prompt {
	const parsedMessages = z.array(MessageInputSchema).parse(message);

	return promptAppendMessages(prompt, ...parsedMessages);
}

export function appendUserMessagesToPrompt(prompt: Prompt, ...content: ContentInput[]): Prompt{
	const parsedContent = ContentInputSchema.parse(content);
	const message = {
		role: "user",
		content: parsedContent,
	} as const;
	return promptAppendMessages(prompt, message);
}

export function appendModelMessagesToPrompt(prompt: Prompt, ...content: ContentInput[]): Prompt{
	const parsedContent = ContentInputSchema.parse(content);
	const message = {
		role: "model",
		content: parsedContent,
	} as const;
	return promptAppendMessages(prompt, message);
}


export {
	type Prompt,
}