type ContentBase<Type extends string, Val> = {
	type: string;
	value: Val;
}

export type TextContent = ContentBase<"text", string>

export type Content = 
	| TextContent;


export type Role = "user" | "model";

export type Message = {
	role: Role;
	content: Content[];
}


export type Prompt = {
	messages: Message[];
}


export function promptMessageCreate(content: Content[], role: Role): Message {
	return {
		role: role,
		content: content,
	};
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


export type TextContentForm = TextContent;

export type ContentForm = 
	| TextContentForm;

export type MessageForm = {
	role: Role;
	content: ContentForm[];
}
export type PromptForm = {
	messages: MessageForm[];
}