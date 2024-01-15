import { webAccount } from "$lib";
import type { LayoutLoad } from "./$types";
export const load: LayoutLoad = () => {
  const promise = webAccount.get();
  const a = promise.then(
    function (response) {
      console.log(response); // Success
      return response;
    },
    function (error) {
      return null;
    }
  );

  return a;
};
