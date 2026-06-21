export interface CompIcon {
  emoji: string;
  short: string;
  label: string;
}

const iconMap: Record<string, CompIcon> = {
  "asian-paints-canvas-2026": { emoji: "🎨", short: "AP", label: "Asian Paints" },
  "coca-cola-mantra-2026": { emoji: "🥤", short: "CC", label: "Coca-Cola" },
  "marico-level-up-2026": { emoji: "🥥", short: "Mar", label: "Marico" },
  "tvs-credit-epic-8-2026": { emoji: "💳", short: "TVS", label: "TVS Credit EPIC" },
  "amex-campus-challenge-strategy-2026": { emoji: "💳", short: "Amex", label: "American Express" },
  "amex-campus-challenge-product-2026": { emoji: "💳", short: "Amex", label: "Amex Product" },
  "shri-ram-consulting-olympiad-2026": { emoji: "📊", short: "SRC", label: "SRCC Consulting" },
  "the-consultants-2026": { emoji: "🧠", short: "TC", label: "The Consultants" },
  "marketer-of-the-year-2026": { emoji: "📣", short: "MOY", label: "Marketer of the Year" },
  "prodman-of-the-year-2026": { emoji: "📱", short: "PMY", label: "ProdMan of the Year" },
  "global-quant-finance-challenge-2026": { emoji: "📈", short: "GQF", label: "Quant Finance" },
  "business-leadership-simulator-2026": { emoji: "🎯", short: "BLS", label: "Business Leadership" },
  "conquest-26": { emoji: "🚀", short: "CQ", label: "Conquest BITS" },
  "nextgen-marketing-challenge-2026": { emoji: "✨", short: "NGM", label: "NextGen Marketing" },
  "sundaram-pitch-fest-tech-2026": { emoji: "⚙️", short: "SPF", label: "Sundaram Pitch Fest" },
  "interactup-case-competition-2026": { emoji: "🤝", short: "IU", label: "InteractUp" },
  "hackon-amazon-6-2026": { emoji: "📦", short: "AMZ", label: "Amazon HackOn" },
  "et-ai-hackathon-2-2026": { emoji: "🤖", short: "ET", label: "ET AI Hackathon" },
};

export function getCompIcon(slug: string, organizer: string): CompIcon {
  if (iconMap[slug]) return iconMap[slug];
  const words = organizer.split(/\s+/).filter(Boolean);
  const short = words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
  return { emoji: "🏆", short: short || "?", label: organizer };
}