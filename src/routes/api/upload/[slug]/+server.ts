import { InputFile } from "node-appwrite";
import type { RequestHandler } from "./$types";
import { readdir, rm } from "fs/promises";
import { resolve } from "path";
import { Client, Storage } from "node-appwrite";
import { db } from "$lib";
import { ID } from "appwrite";
const client = new Client();
const storage = new Storage(client);

client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("659e93f20c42c09f4fa6") // Your project ID
  .setKey(
    "44565df3b3173d81ebb1e81e5becbef306e37fedb163279b95ca3700b3e9f51c47e9b34987d5a3e4bc378e0c1b9f5a0092fb71376687fc12c4cffbe8b49b7bcabee6694e44679c3f3f86b96054ffa5082ed721c59019f58d55bd9fa5488b95b9e7cba214995ff8104b2bd21dc44a823efc882bd97af52f4c8b229be78dd37c7a"
  ); // Your secret API key

export const POST: RequestHandler = async ({ params }) => {
  console.log("uploading to appwrite bucket");
  const files = await readdir(resolve("uploads", params.slug));

  files.map((file) => {
    new Promise(async (res, rej) => {
      try {
        if (
          file === ".DS_Store" ||
          file.substring(0, file.indexOf(".")) === params.slug
        ) {
          return res("done");
        }
        // trigger uploading to appwrite
        const id = params.slug;
        await storage.createFile(
          "659e94dbafdb3408b18e",
          id + "_" + file,
          InputFile.fromPath(resolve("uploads", id, file), id + "_" + file)
        );
        return res(null);
      } catch (err: any) {
        return rej({ message: err.message, error: err });
      }
    });
  });

  await Promise.all(files);
  await db.createDocument(
    "65a55c3bd30140eb9f8a",
    "65a55c58a7f54b6a07d3",
    ID.unique(),
    {
      video_id: params.slug,
    }
  );
  await rm(resolve("uploads", params.slug), { recursive: true });
  return new Response("Uploaded Video. Video is ready to stream.");
};
