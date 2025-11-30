interface ContentBase<TVal>{
	type: string;
	value: TVal;
}

interface TextContent extends ContentBase<string> {type: "text"} 

type Content = 
	| TextContent;


type Role = "user" | "assistant";

export type Message = {
	role: Role;
	content: Content[];
}


/**
 * Creates a `Message` object with the specified role and content.
 * 
 * @param content - The input content, which can be either a single string or `Content` 
 *                  item, or an array of such items. Strings are automatically formatted 
 *                  into `text` content objects.
 * @param role - The role associated with the message, indicating the sender's role 
 *               (e.g., "user", "assistant").
 * 
 * @returns A `Message` object containing the specified role and an array of content objects.
 */
export function createMessage(content: Content[], role: Role): Message {
	return {
		role: role,
		content: content,
	};
}
