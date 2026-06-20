import { cn } from "@/lib/utils";

type SketchVariant = "default" | "dark" | "dashed" | "highlight" | "recessed";

const variants: Record<SketchVariant, string> = {
  default: "sketch-box text-black",
  dark: "sketch-box-dark text-white",
  dashed: "sketch-box-dashed text-black",
  highlight: "sketch-box-highlight text-black",
  recessed: "panel-recessed sketch-box-dashed text-black border-solid",
};

export function SketchBox({
  children,
  className,
  variant = "default",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: SketchVariant;
  as?: "div" | "section" | "article" | "aside";
}) {
  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
}