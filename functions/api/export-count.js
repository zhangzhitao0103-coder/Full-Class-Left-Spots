export async function onRequestGet({ env }) {
  const value = await env.EXPORT_COUNTS.get("export-image-clicks");
  const count = Number.parseInt(value ?? "0", 10);
  return Response.json({ count: Number.isFinite(count) ? count : 0 }, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function onRequestPost({ env }) {
  const value = await env.EXPORT_COUNTS.get("export-image-clicks");
  const current = Number.parseInt(value ?? "0", 10);
  const count = (Number.isFinite(current) ? current : 0) + 1;
  await env.EXPORT_COUNTS.put("export-image-clicks", String(count));
  return Response.json({ count }, {
    headers: { "Cache-Control": "no-store" },
  });
}
