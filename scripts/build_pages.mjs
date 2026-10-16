import { cp, mkdir } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);

await mkdir(output, { recursive: true });
await cp(new URL("../index.html", import.meta.url), new URL("index.html", output));
await cp(new URL("../assets/", import.meta.url), new URL("assets/", output), { recursive: true });
console.log("Cloudflare Pages assets prepared in dist/.");
