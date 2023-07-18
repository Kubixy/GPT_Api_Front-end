<!-- Spinner.svelte -->
<div class="lds-spinner">
  {#each Array(12) as _, i}
    <div
      style="transform: rotate({i * 30}deg); animation-delay: {-1.2 +
        i * 0.1}s;"
    />
  {/each}
</div>

<style>
  .lds-spinner {
    color: official;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-spinner div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
