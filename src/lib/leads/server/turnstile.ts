import "server-only";

/**
 * Optional Cloudflare Turnstile verification. Active only when TURNSTILE_SECRET_KEY is set (and the
 * matching public NEXT_PUBLIC_TURNSTILE_SITE_KEY renders the widget). Without it, the honeypot,
 * timing check and rate limit still apply.
 */
export const turnstileEnabled = () => !!process.env.TURNSTILE_SECRET_KEY;

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip !== "unknown" ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(8000),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}
