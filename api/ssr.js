let serverInstance = null;

async function getServer() {
  if (!serverInstance) {
    const mod = await import("../dist/server/server.js");
    serverInstance = mod.default;
  }
  return serverInstance;
}

export default async function handler(req, res) {
  const server = await getServer();

  const proto =
    (req.headers["x-forwarded-proto"] || "https").split(",")[0].trim();
  const host =
    req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = new URL(req.url, `${proto}://${host}`);

  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) {
    if (v != null) headers[k] = Array.isArray(v) ? v.join(", ") : v;
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers,
  });

  const response = await server.fetch(request, {}, {});

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "transfer-encoding") res.setHeader(key, value);
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}
