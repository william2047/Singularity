type ContentBase<Type extends string, Val> = {
	type: Type;
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