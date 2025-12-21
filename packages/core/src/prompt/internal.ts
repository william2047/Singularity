import { Content, Message, promptMessageCreate, Role } from "./messages/internal";

export type Prompt = {
	messages: Message[];
}

export function promptCreate(messages: Message[]): Prompt {
	return {
		messages: messages,
	};
}

export function promptAppendMessages(prompt: Prompt, ...messages: Message[]): Prompt {
	
	return {
		messages: [...prompt.messages, ...messages],
	};
}

export function promptAppendContent(prompt: Prompt, role: Role, ...content: Content[]): Prompt {
	return promptAppendMessages(
		prompt,
		promptMessageCreate(content, role)
	);
}