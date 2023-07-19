# OpenAI API Interaction Frontend

This project is a simple frontend built with [Svelte](https://svelte.dev/) for interacting with the [OpenAI API](https://beta.openai.com/). The frontend maintains a conversation with the OpenAI API, sending user inputs and receiving AI-generated responses. It also keeps track of the number of tokens used in the conversation.

## Technologies used

- Svelte for the frontend interface
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for making HTTP requests to the server

## How it works

When a user inputs a message, it's sent to the OpenAI API. The API responds with a generated message from the model. This conversation, as well as the total token count, is displayed on the user interface.

## License

This project is licensed under the terms of the MIT license. For more details, see the [LICENSE](https://github.com/Kubixy/GPT_Api_Front-end/blob/master/LICENSE) file.
