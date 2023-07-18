<script>
  import Spinner from "./Components/Spinner.svelte";

  let prompt = "";
  let messages = [];
  let tmpPrompt;
  let isLoading = false;

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
      if (Array.isArray(response)) {
        messages = [...messages, ...response.slice(messages.length)];
      } else {
        console.error("Error from server:", response);
      }

      isLoading = false;
    }
  }
</script>

<div id="Conversation">
  {#each messages as message, index (index)}
    <div class="message {message.role}">
      <p>
        <strong>{message.role === "user" ? "You: " : "Assistant: "}</strong>
        {message.content}
      </p>
    </div>
  {/each}
</div>

<div id="Controls">
  <textarea bind:value={prompt} placeholder="Enter a prompt" />
  {#if isLoading}
    <Spinner />
  {:else}
    <button on:click={generateText}>Send</button>
  {/if}
</div>

<style>
  p {
    text-align: left;
    background-color: bisque;
    padding: 1em;
  }

  p,
  textarea {
    border-radius: 1em;
  }

  #Controls {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    gap: 0.5em;
    background-color: coral;
  }

  #Conversation {
    padding-bottom: 6em;
  }

  button {
    max-height: 3em;
    max-width: 4em;
    border-radius: 3em;
  }

  textarea {
    width: 75%;
    resize: none;
  }
</style>
