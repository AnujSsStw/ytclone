<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { webAccount } from "$lib";
  import "../app.css";
  import type { LayoutLoad } from "./$types";

  export let data: LayoutLoad;

  function handleLogin() {
    console.log("clicked");

    webAccount.createOAuth2Session(
      "github",
      "http://localhost:5173/",
      "http://localhost:5173/error"
    );
  }
  function initials(s: string): string {
    s.split(" ");
    const f = s[0].split("")[0];
    const l = s[1].split("")[0];
    return f + l;
  }
  async function handleLogout() {
    await webAccount.deleteSession("current");
    await invalidateAll();
  }
</script>

<div>
  <nav class="flex px-2 pt-2 items-center">
    <a href="/" class="mr-auto">logo</a>
    {#if data.name}
      <a class="mr-2" href="/upload"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          style="pointer-events: none; display: block; width: 100%; height: 100%;"
          viewBox="0 0 24 24"
          width="24"
          focusable="false"
          ><path
            d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z"
          ></path></svg
        ></a
      >
      <button class="mr-2" on:click={handleLogout}>Logout</button>
      <div
        class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
      >
        <span class="font-medium text-gray-600 dark:text-gray-300"
          >{initials(data.name)}</span
        >
      </div>
    {:else}
      <button on:click={handleLogin}>Login in</button>
    {/if}
  </nav>
  <slot />
</div>
