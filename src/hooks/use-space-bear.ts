"use client";

import { glass } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useEffect, useState } from "react";

export function useSpaceBear(key: string) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!key) return;

    const avatar = createAvatar(glass, {
      seed: key,
    });

    const svg = avatar.toString();

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const objectUrl = URL.createObjectURL(blob);

    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [key]);

  return url;
}
