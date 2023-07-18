<script>
  let prompt = "";
  let response = "";

  async function generateText() {
    const res = await fetch("http://localhost:3000/api/generate-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    response = await res.json();
  }
</script>

<input bind:value={prompt} placeholder="Enter a prompt" />
<button on:click={generateText}>Generate Text</button>
<p>{response}</p>
