import z, { parse } from "zod";
import { ContentInput, ContentInputSchema, MessageInput, MessageInputSchema } from "./input";
import { promptCreate, Prompt, promptAppendMessages } from "./internal";
import { ContentForm, MessageForm } from "./form";

export function promptConstructor(messages: MessageInput[] | MessageForm[]): Prompt {
	const parsedMessages = z.array(MessageInputSchema).parse(messages);

	return promptCreate(parsedMessages)
}

export function appendMessagesToPrompt(prompt: Prompt, ...message: MessageInput[] | MessageForm[]): Prompt {
	const parsedMessages = z.array(MessageInputSchema).parse(message);

	return promptAppendMessages(prompt, ...parsedMessages);
}

export function appendUserMessagesToPrompt(prompt: Prompt, ...content: ContentInput[] | ContentForm[]): Prompt{
	const parsedContent = ContentInputSchema.parse(content);
	const message = {
		role: "user",
		content: parsedContent,
	} as const;
	return promptAppendMessages(prompt, message);
}

export function appendModelMessagesToPrompt(prompt: Prompt, ...content: ContentInput[] | ContentForm[]): Prompt{
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