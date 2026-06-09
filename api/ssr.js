export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  try {
    const { default: serverHandler } = await import("../dist/server/server.js");

    const proto = req.headers["x-forwarded-proto"] ?? "https";
    const host = req.headers.host;
    const url = `${proto}://${host}${req.url}`;

    const headers = new Headers();
    for (const [key, val] of Object.entries(req.headers)) {
      if (typeof val === "string") headers.set(key, val);
      else if (Array.isArray(val)) val.forEach((v) => headers.append(key, v));
    }

    let body;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      if (chunks.length) body = Buffer.concat(chunks);
    }

    const request = new Request(url, { method: req.method, headers, body });
    const response = await serverHandler.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((val, key) => res.setHeader(key, val));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    console.error("[SSR]", err);
    res.statusCode = 500;
    res.end(`<html><body><h1>Server Error</h1><pre>${err.message}</pre></body></html>`);
  }
}
