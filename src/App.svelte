<script>
  import Spinner from "./Components/Spinner.svelte";

  let prompt = "";
  let messages = [];
  let tmpPrompt;
  let isLoading = false;
  let tokenCount = 0;

  async function generateText() {
    tmpPrompt = prompt;
    prompt = "";

    if (tmpPrompt.length > 5) {
      let newMessage = { role: "user", content: tmpPrompt };
      messages = [...messages, newMessage];
      isLoading = true;

      const res = await fetch("http://localhost:3000/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      const response = await res.json();
      if (Array.isArray(response.conversation)) {
        messages = response.conversation;
        tokenCount = response.tokenCount;
      } else {
        console.error("Error from server:", response);
      }

      isLoading = false;
    }
  }
</script>

<div id="Conversation">
  {#each messages as message, index (index)}
    <div class={message.role === "user" ? "user-message" : "assistant-message"}>
      <p>
        <strong>{message.role === "user" ? "You: " : "Assistant: "}</strong>
        {message.content}
      </p>
    </div>
  {/each}
</div>

<div id="Controls">
  <h1 id="token-count">{tokenCount}</h1>
  <button
    on:click={() => {
      messages = [];
      tokenCount = 0;
    }}>Reset</button
  >
  <textarea bind:value={prompt} placeholder="Enter a prompt" />
  {#if isLoading}
    <Spinner />
  {:else}
    <button on:click={generateText}>Send</button>
  {/if}
</div>

<style>
  * {
    font-family: Arial, sans-serif;
  }

  .user-message p {
    text-align: left;
    background-color: #ece4e4;
    padding: 1em;
    margin: 1em 0;
    border-radius: 0.8em;
    color: #333;
  }

  .assistant-message p {
    text-align: left;
    background-color: #007bff;
    padding: 1em;
    margin: 1em 0;
    border-radius: 0.8em;
    color: #fff;
  }

  #Controls {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5em;
    background-color: #f5f5f5;
    box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    margin: 0 0 -0.5em 0;
  }

  #token-count {
    color: #333;
    background-color: #e0e0e0;
    padding: 0.2em 0.8em;
    border-radius: 1em;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    width: 3.25em;
    height: 2.5em;
    border-radius: 3em;
    border: none;
    color: #fff;
    background-color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #1a1a1a;
  }

  textarea {
    width: 100%;
    height: 5em;
    resize: none;
    padding: 0.5em;
    border-radius: 0.8em;
    border: 2px solid #333;
    font-size: 1em;
    line-height: 1.5em;
  }
</style>
