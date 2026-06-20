import type { Difficulty } from "@/types";
import { cn } from "@/lib/utils";

const styles: Record<Difficulty, string> = {
  Beginner: "",
  Intermediate: "sketch-tag-active",
  Advanced: "bg-black text-white",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={cn(
        "sketch-tag inline-flex items-center px-2.5 py-0.5 text-xs font-bold",
        styles[difficulty]
      )}
    >
      {difficulty}
    </span>
  );
}