import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { db } from "$lib";
export const load: PageLoad = async ({ params }) => {
  const data = await db.listDocuments(
    "65a55c3bd30140eb9f8a",
    "65a55c58a7f54b6a07d3"
  );
  console.log(data);

  return {
    count: data.total,
    content: data.documents,
  };
};
