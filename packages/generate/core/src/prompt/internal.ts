interface ContentBase<TVal>{
	type: string;
	value: TVal;
}

interface TextContent extends ContentBase<string> {type: "text"} 

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


export type TextContentSnapshot = TextContent;

export type ContentSnapshot = 
	| TextContentSnapshot;

export type MessageSnapshot = {
	role: Role;
	content: ContentSnapshot[];
}
export type PromptSnapshot = {
	messages: MessageSnapshot[];
}