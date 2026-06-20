export interface CompIcon {
  emoji: string;
  short: string;
  label: string;
}

const iconMap: Record<string, CompIcon> = {
  "hul-lime-2025": { emoji: "🧴", short: "HUL", label: "Hindustan Unilever" },
  "hul-techtonic-2025": { emoji: "💡", short: "HUL", label: "HUL TechTonic" },
  "amazon-ace-2025": { emoji: "📦", short: "AMZ", label: "Amazon" },
  "asian-paints-canvas-2025": { emoji: "🎨", short: "AP", label: "Asian Paints" },
  "tata-imagination-challenge-2025": { emoji: "🏭", short: "Tata", label: "Tata Group" },
  "abg-stratos-2025": { emoji: "🏢", short: "ABG", label: "Aditya Birla Group" },
  "marico-over-the-wall-2025": { emoji: "🥥", short: "Mar", label: "Marico" },
  "tvs-epic-2025": { emoji: "💳", short: "TVS", label: "TVS Credit" },
  "britannia-creatovate-2025": { emoji: "🍪", short: "Brit", label: "Britannia" },
  "fms-conquest-2026": { emoji: "⚔️", short: "FMS", label: "FMS Delhi" },
  "fame-open-innovation-2025": { emoji: "🚀", short: "FAME", label: "FAME 5.0" },
  "tvs-motor-ride-2025": { emoji: "🏍️", short: "TVS", label: "TVS Motor" },
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