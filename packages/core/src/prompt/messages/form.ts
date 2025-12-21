import { type Role, type TextContent } from "./internal";

export type TextContentForm = TextContent;

export type ContentForm = 
	| TextContentForm;

export type MessageForm = {
	role: Role;
	content: ContentForm[];
}