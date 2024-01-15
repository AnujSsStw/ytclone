<script lang="ts">
  import { webAccount } from "$lib";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="flex">
  {#each data.content as { $id, video_id }, _}
    <a class="m-5 w-56" href={`/watch/${video_id}`}
      ><img
        src="https://i.ytimg.com/vi_webp/YkRi4X22fuc/maxresdefault.webp"
        alt=""
        srcset=""
      /></a
    >
  {/each}
</div>
