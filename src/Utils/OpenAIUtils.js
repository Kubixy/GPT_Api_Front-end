import { WordTokenizer } from 'natural';
const tokenizer = new WordTokenizer();

/**
 * Calculates the number of tokens in a conversation.
 * Tokens are defined as words or meaningful units of text, and are identified using a tokenizer from the `natural` library.
 * @param {Array} conversation - The conversation messages. Each message is an object with 'role' and 'content' properties.
 * @returns {Number} - The total number of tokens in the conversation.
 */
function countTokensInConversation(conversation) {
    return conversation.reduce((totalTokens, message) => {
        // Use the tokenizer to split the message content into tokens
        const tokens = tokenizer.tokenize(message.content);
        // Add the number of tokens in this message to the total count
        return totalTokens + tokens.length;
    }, 0); // Start counting from 0
}
