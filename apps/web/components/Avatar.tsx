"use client";

import { useMemo, useState } from "react";
import { resolveMediaUrl } from "../lib/api";

type AvatarProps = {
  url?: string | null;
  alt?: string;
  size?: number; // px
  className?: string;
  ringClassName?: string;
};

function IncognitoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M3 10.5h18" />
      <path d="M7 10.5V7.8c0-.9.7-1.6 1.6-1.6h6.8c.9 0 1.6.7 1.6 1.6v2.7" />
      <path d="M7.5 14.2c.9-1.3 2.5-2.2 4.5-2.2s3.6.9 4.5 2.2" />
      <path d="M9 15.8c.8.8 1.9 1.2 3 1.2s2.2-.4 3-1.2" />
      <path d="M8.2 10.5 5.2 4.5M15.8 10.5l3-6" />
    </svg>
  );
}

export default function Avatar({ url, alt, size = 40, className = "", ringClassName = "" }: AvatarProps) {
  const [broken, setBroken] = useState(false);

  const src = useMemo(() => {
    const resolved = resolveMediaUrl(url);
    return resolved || null;
  }, [url]);

  const showFallback = !src || broken;
  const dim = { width: size, height: size };

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/10 ${ringClassName} ${className}`}
      style={dim}
      aria-label={alt || "avatar"}
    >
      {showFallback ? (
        <div className="flex h-full w-full items-center justify-center text-white/70">
          <IncognitoIcon className="h-5 w-5" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt || "avatar"}
          className="h-full w-full object-cover"
          onError={() => setBroken(true)}
        />
      )}
    </div>
  );
}
