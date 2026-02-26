const PASS_HASH = "f7622e6423c6f491fb0b10937838b228be09cc03a192d511c643f8a017732de2";
const KV_KEY = "board-config";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
};

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet(context) {
  const kv = context.env.GAME_CONFIG;
  const config = await kv.get(KV_KEY, "json");
  const body = config || { rockets: [], meteors: [], customSquares: {} };
  return new Response(JSON.stringify(body), {
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

export async function onRequestPut(context) {
  const password = context.request.headers.get("X-Admin-Password");
  if (!password) {
    return new Response(JSON.stringify({ error: "Missing password" }), {
      status: 401,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const hash = await sha256(password);
  if (hash !== PASS_HASH) {
    return new Response(JSON.stringify({ error: "Wrong password" }), {
      status: 403,
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const body = await context.request.json();
  const kv = context.env.GAME_CONFIG;
  await kv.put(KV_KEY, JSON.stringify(body));

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}
