export interface CompIcon {
  emoji: string;
  short: string;
  label: string;
}

const iconMap: Record<string, CompIcon> = {
  "hul-lime-2026": { emoji: "🧴", short: "HUL", label: "Hindustan Unilever" },
  "flipkart-wired-2026": { emoji: "🛒", short: "FK", label: "Flipkart" },
  "amazon-ace-2026": { emoji: "📦", short: "AMZ", label: "Amazon" },
  "mahindra-war-room-2026": { emoji: "🚜", short: "M&M", label: "Mahindra" },
  "tata-crucible-2026": { emoji: "🏭", short: "Tata", label: "Tata Group" },
  "reckitt-kickstart-2026": { emoji: "🧼", short: "RB", label: "Reckitt" },
  "asian-pact-2026": { emoji: "🎨", short: "AP", label: "Asian Paints" },
  "itc-interrobang-2026": { emoji: "🚬", short: "ITC", label: "ITC Limited" },
  "mondelez-canvas-2026": { emoji: "🍫", short: "MDLZ", label: "Mondelez" },
  "deloitte-ace-of-case-2026": { emoji: "📊", short: "Del", label: "Deloitte" },
  "zs-case-challenge-2026": { emoji: "💊", short: "ZS", label: "ZS Associates" },
  "vista-iimb-2026": { emoji: "🎓", short: "IIMB", label: "IIM Bangalore" },
  "confluence-iima-2026": { emoji: "🏛️", short: "IIMA", label: "IIM Ahmedabad" },
  "fms-fiesta-conquest-2026": { emoji: "⚔️", short: "FMS", label: "FMS Delhi" },
  "mdi-imperium-2026": { emoji: "🏫", short: "MDI", label: "MDI Gurgaon" },
  "iift-quo-vadis-2026": { emoji: "🌏", short: "IIFT", label: "IIFT Delhi" },
  "colgate-transcend-2026": { emoji: "🦷", short: "Col", label: "Colgate" },
  "pg-ceo-challenge-2026": { emoji: "🧴", short: "P&G", label: "Procter & Gamble" },
  "nivea-marathon-2026": { emoji: "✨", short: "NIV", label: "NIVEA" },
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