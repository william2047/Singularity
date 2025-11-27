import { createMessage, Message } from "./internal";
import { ContentInput, ContentInputSchema, MessageSchema, Role } from "./user";



class Prompt {
	private messages: Message[] = [];

	constructor() {
		
	}

	/**
	 * Adds a new message to the messages list with the specified content
	 * and assigns it the role of "user".
	 *
	 * @param content - The input content, which can be either a single string or `Content` 
	 *                  item, or an array of such items. Strings are automatically formatted 
	 *                  into `text` content objects.
	 * @throws {ZodError} Throws an error if the provided content does not pass validation.
	 */
	addUser(content: ContentInput) {
		const parsedContent = ContentInputSchema.parse(content);
		this.messages.push(createMessage(parsedContent, "user"));
	}

	/**
	 * Adds a new message to the messages list with the specified content
	 * and assigns it the role of "assistant".
	 *
	 * @param content - The input content, which can be either a single string or `Content` 
	 *                  item, or an array of such items. Strings are automatically formatted 
	 *                  into `text` content objects.
	 * @throws {ZodError} Throws an error if the provided content does not pass validation.
	 */
	addAssistant(content: ContentInput) {
		const parsedContent = ContentInputSchema.parse(content);
		this.messages.push(createMessage(content, "assistant"));
	}

	/**
	 * Adds a new message to the messages array after validating it against the MessageSchema.
	 *
	 * @param content - The input content, which can be either a single string or `Content` 
	 *                  item, or an array of such items. Strings are automatically formatted 
	 *                  into `text` content objects.
	 * @param role - The role associated with the message. Must conform to the `Role` type.
	 * 
	 * @throws {ZodError} Throws an error if the provided content or role does not pass validation.
	 */
	addMessage(content: ContentInput, role: Role){
		const parseMessage = MessageSchema.parse({
			role: role,
			content: content
		});
		
		this.messages.push(parseMessage);
	}

}
export default Prompt;