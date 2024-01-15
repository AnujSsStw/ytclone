<script lang="ts">
  import type { ActionData } from "../$types";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let form: ActionData;
</script>

{#if form?.error}
  <div>{form.error}</div>
{/if}

<form action="?/upload" method="post" enctype="multipart/form-data">
  <input
    type="file"
    name="file"
    id="file"
    accept="video/mp4,video/x-m4v,video/*"
    required
  />
  <button>click me</button>
</form>
