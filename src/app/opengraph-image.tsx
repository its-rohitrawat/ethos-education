import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/brand/Logo";

export const alt = "Ethos Education — admissions counselling for the world’s leading universities";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card: navy with the logo’s crimson/ember glow (matches the closing CTA), the mark and the wordmark. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#ffffff",
          background:
            "radial-gradient(60% 90% at 100% 100%, rgba(229,83,26,0.45) 0%, transparent 60%), radial-gradient(50% 70% at 0% 0%, rgba(177,18,44,0.4) 0%, transparent 60%), #0a1630",
        }}
      >
        <svg viewBox="0 0 880 958" width="88" height="96">
          <path d={MARK_PATH} fill="#ffffff" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, lineHeight: 1, letterSpacing: -4 }}>Ethos Education</div>
          <div style={{ fontSize: 34, marginTop: 24, color: "#ffb37a" }}>Your ambition. A world of possibility.</div>
        </div>
      </div>
    ),
    size,
  );
}
