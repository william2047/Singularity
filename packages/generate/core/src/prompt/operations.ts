import z from "zod";
import { ContentForm, ContentInput, ContentInputSchema, MessageForm, MessageInput, MessageInputSchema, Prompt } from "./messages";
import { promptAppendMessages } from "./internal";



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