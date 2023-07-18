<script>
  let prompt = "";
  let response = "";

  async function generateText() {
    if (prompt.length > 5) {
      const res = await fetch("http://localhost:3000/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      response = await res.json();
    }
    prompt = "";
  }
</script>

{#if response}
  <p>{response}</p>
{/if}

<div id="Controls">
  <textarea bind:value={prompt} placeholder="Enter a prompt" />
  <button on:click={generateText}>Send</button>
</div>

<style>
  p {
    text-align: left;
    background-color: antiquewhite;
    padding: 1em;
  }

  p,
  textarea {
    border-radius: 1em !important;
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
    background: white;
  }

  button {
    max-height: 3em;
  }

  textarea {
    width: 75%;
    resize: none;
  }
</style>
