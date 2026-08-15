// /.well-known/mcp-registry-auth: domain proof for publishing to the official
// MCP registry.
//
// The registry lets you claim a reverse-DNS namespace (`com.qlim8/*`) by proving
// you control the matching domain. There are two ways to prove it: a TXT record
// on the apex, or this file. The file wins here because we already serve
// qlim8.com from an app we deploy, so rotating a key is a deploy rather than a
// DNS change, and the proof lives in version control next to everything else.
//
// The value is a *public* key. It is designed to be published, exactly like an
// SPF or DKIM record, so committing it is fine. The matching private key must
// never enter this repo: it is what authorises publishing under `com.qlim8`.
//
// Format, from the registry's authentication docs:
//   v=MCPv1; k=ed25519; p=<base64 public key>
//
// Generate the pair with (OpenSSL 3.0+, see the runbook for the macOS caveat):
//   openssl genpkey -algorithm Ed25519 -out key.pem
//   PUBLIC_KEY="$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)"
//   echo "v=MCPv1; k=ed25519; p=${PUBLIC_KEY}"
//
// Then either set MCP_REGISTRY_AUTH in the environment, or paste the line into
// PROOF_RECORD below and deploy. Until one of those happens this route answers
// 404, which is deliberate: serving an empty or placeholder record would make
// `mcp-publisher login http` fail with a signature error that does not say why.

// Paste the generated `v=MCPv1; ...` line here, or leave it blank and set the
// MCP_REGISTRY_AUTH environment variable instead.
const PROOF_RECORD = "";

export const dynamic = "force-dynamic";

export function GET() {
  const record = (process.env.MCP_REGISTRY_AUTH || PROOF_RECORD).trim();

  if (!record) {
    return new Response(
      "No MCP registry proof configured. See docs/*/integrations/mcp-registry-publishing.md in qlim8-app.\n",
      { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  return new Response(`${record}\n`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      // Short cache: a rotated key must take effect quickly, and a stale proof
      // is the failure mode that is hardest to diagnose from the error message.
      "Cache-Control": "public, max-age=60",
    },
  });
}
