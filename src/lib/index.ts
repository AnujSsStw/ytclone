// place files you want to import through the `$lib` alias in this folder.
export const VALID_VIDEO_EXTENSIONS = [
  // MP4
  "mp4",
  "m4a",
  "m4v",
  "f4v",
  "f4a",
  "m4b",
  "m4r",
  "f4b",
  "mov",
  // 3GP
  "3gp",
  "3gp2",
  "3g2",
  "3gpp",
  "3gpp2",
  // OGG
  "ogg",
  "oga",
  "ogv",
  "ogx",
  // WMV
  "wmv",
  "wma",
  "asf",
  // WEBM
  "webm",
  // FLV
  "flv",
  // AVI
  "avi",
  // Quicktime
  "qt",
  // HDV
  "hdv",
  // MXF
  "OP1a",
  "OP-Atom",
  // MPEG-TS
  "ts",
  "mts",
  "m2ts",
  // WAV
  "wav",
  // Misc
  "lxf",
  "gxf",
  "vob",
];

import { Client, Account, Databases } from "appwrite";
const client = new Client();
client
  .setEndpoint("http://localhost/v1") // Your API Endpoint
  .setProject("659e93f20c42c09f4fa6"); // Your project ID

export const webAccount = new Account(client);
export const db = new Databases(client);
