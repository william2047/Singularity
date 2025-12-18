import z from "zod";
import { MessageInput, MessageInputSchema } from "./input";
import { promptCreate, Prompt } from "./internal";
import { MessageForm } from "./form";

export function promptConstructor(messages: MessageInput[] | MessageForm[]): Prompt {
	const parsedMessages = z.array(MessageInputSchema).parse(messages);

	return promptCreate(parsedMessages)
}