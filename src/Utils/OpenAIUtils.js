import { encode } from "gpt-3-encoder";

/**
 * Calculates the number of tokens in a conversation.
 * Tokens are defined as words or meaningful units of text, and are identified using the `gpt-3-encoder` library.
 * @param {Array} conversation - The conversation messages. Each message is an object with 'role' and 'content' properties.
 * @returns {Number} - The total number of tokens in the conversation.
 */
export function countTokensInConversation(conversation) {
  return conversation.reduce((totalTokens, message) => {
    // Use gpt-3-encoder's encode function to split the message content into tokens
    const tokens = encode(message.content);
    // Add the number of tokens in this message to the total count
    return totalTokens + tokens.length;
  }, 0);
}
