import { readFileSync, writeFileSync, readdirSync } from "fs";

const html = readFileSync("dist/client/index.html", "utf8");

// Extract the $tsr-stream-barrier script (needed for TanStack Router)
const tsrMatch = html.match(/<script[^>]*\$tsr[^>]*>[\s\S]*?<\/script>/);
const tsrScript = tsrMatch ? tsrMatch[0] : "";

// Extract CSS link tags
const cssLinks = [...html.matchAll(/<link[^>]+\.css[^>]*>/g)].map(m => m[0]).join("\n  ");

// Extract preload link tags
const preloads = [...html.matchAll(/<link[^>]+modulepreload[^>]*>/g)].map(m => m[0]).join("\n  ");

// Extract main module script
const scriptMatch = html.match(/<script type="module"[^>]+src="[^"]*index-[^"]*\.js"[^>]*><\/script>/);
const mainScript = scriptMatch ? scriptMatch[0] : "";

// Extract Google Fonts links
const fontLinks = [...html.matchAll(/<link[^>]+fonts\.googleapis\.com[^>]*>/g)].map(m => m[0]).join("\n  ");
const fontPreconnects = [...html.matchAll(/<link[^>]+preconnect[^>]+fonts[^>]*>/g)].map(m => m[0]).join("\n  ");

const cleanHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>YETP — Build Your Dream Big. Start Today.</title>
  <meta name="description" content="Pakistan's #1 youth empowerment IT institute. Premium courses, real internships, Rs.100,000 scholarship and global career pathways." />
  ${fontPreconnects}
  ${fontLinks}
  ${cssLinks}
  ${preloads}
</head>
<body>
  ${tsrScript}
  ${mainScript}
</body>
</html>`;

writeFileSync("dist/client/index.html", cleanHtml);
console.log("✓ Clean index.html generated");
