import { getStore } from "@netlify/blobs";
import type { Config } from "@netlify/functions";

const store = getStore("poster-metrics", { consistency: "strong" });
const countKey = "export-image-clicks";

async function readCount() {
  const data = await store.get(countKey, { type: "json" }) as { count?: unknown } | null;
  if (!data || typeof data.count !== "number") return 0;
  return data.count;
}

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(data), { ...init, headers });
}

export default async (req: Request) => {
  if (req.method === "GET") return json({ count: await readCount() });

  if (req.method === "POST") {
    const count = (await readCount()) + 1;
    await store.setJSON(countKey, { count, updatedAt: new Date().toISOString() });
    return json({ count });
  }

  return json({ error: "Method not allowed" }, { status: 405 });
};

export const config: Config = {
  path: "/api/export-count",
  method: ["GET", "POST"],
};
