export async function onRequestGet(context) {
  const agentId = context.env.ELEVEN_AGENT_ID;
  const apiKey  = context.env.ELEVEN_API_KEY;

  if (!agentId || !apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing ELEVEN_AGENT_ID or ELEVEN_API_KEY" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  const url =
    "https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=" +
    encodeURIComponent(agentId);

  const r = await fetch(url, { headers: { "xi-api-key": apiKey } });
  const body = await r.text();

  if (!r.ok) {
    return new Response(
      JSON.stringify({ error: "ElevenLabs request failed", details: body }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  return new Response(body, {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store"
    }
  });
}
