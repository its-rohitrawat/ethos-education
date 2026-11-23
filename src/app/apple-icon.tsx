import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/brand/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b2a5b" }}>
        <svg viewBox="0 0 880 958" width="92" height="100">
          <path d={MARK_PATH} fill="#ffffff" />
        </svg>
      </div>
    ),
    size,
  );
}
