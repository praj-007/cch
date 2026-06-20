"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function RegisterButton({
  slug,
  initialRegistered,
}: {
  slug: string;
  initialRegistered: boolean;
}) {
  const [registered, setRegistered] = useState(initialRegistered);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    try {
      const res = await fetch(`/api/competitions/${slug}`, { method: "POST" });
      if (res.ok) setRegistered(true);
    } finally {
      setLoading(false);
    }
  }

  if (registered) {
    return (
      <span className="sketch-tag sketch-tag-active inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold">
        <Check className="h-4 w-4" />
        tracked ✓
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleRegister}
      disabled={loading}
      className={cn(
        "sketch-btn sketch-btn-filled inline-flex items-center gap-2 px-5 py-2.5 font-bold disabled:opacity-60"
      )}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      track on CCH
    </button>
  );
}