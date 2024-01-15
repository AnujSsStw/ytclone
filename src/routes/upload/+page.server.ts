import { VALID_VIDEO_EXTENSIONS, db } from "$lib";
import { resolve, extname } from "node:path";
import type { Actions } from "./$types";
import { writeFile, mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import type { PageServerLoad } from "./$types";
import { ID } from "appwrite";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  upload: async ({ request }) => {
    const formData = await request.formData();
    const uploadedFile = formData.get("file") as File;
    const extension = extname(uploadedFile.name);

    if (
      !extension ||
      !VALID_VIDEO_EXTENSIONS.includes(extension.replace(".", ""))
    ) {
      return { error: "Video format is not supported." };
    }

    const videoId = crypto.randomUUID().slice(0, 8);
    await mkdir(resolve("uploads", videoId));

    const videoFilePath = resolve("uploads", videoId, `${videoId}${extension}`);
    await writeFile(
      videoFilePath,
      Buffer.from(await uploadedFile.arrayBuffer())
    );

    const createHLSVOD = spawn("bash", [
      "create-hls-vod.sh",
      videoId,
      extension,
      "http://localhost/v1/storage/buckets/659e94dbafdb3408b18e/files",
    ]);
    createHLSVOD.stdout.on("data", (d) => console.log(`stdout info: ${d}`));
    createHLSVOD.stderr.on("data", (d) => console.log(`stderr error: ${d}`));
    createHLSVOD.on("error", (d) => console.log(`error: ${d}`));
    createHLSVOD.on("close", (code) =>
      console.log(`child process ended with code ${code}`)
    );
    return { success: true };
  },
} satisfies Actions;
