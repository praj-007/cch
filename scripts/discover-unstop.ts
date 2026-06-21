/**
 * Scan Unstop public API for competitions with registration end_date >= cutoff.
 * Usage: npx tsx scripts/discover-unstop.ts [startId] [endId]
 */
import { writeFileSync } from "node:fs";

const cutoff = new Date("2026-06-20T00:00:00+05:30");
const startId = Number(process.argv[2] ?? 1660000);
const endId = Number(process.argv[3] ?? 1695000);
const batchSize = 50;

type Hit = {
  id: number;
  title: string;
  end: string;
  start: string;
  url: string;
  prizes: string | null;
  regn: number;
  type: string;
  region: string;
};

async function check(id: number): Promise<Hit | null> {
  try {
    const res = await fetch(
      `https://unstop.com/api/public/competition/${id}`
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: { competition?: Record<string, unknown> };
    };
    const c = json.data?.competition;
    if (!c?.title || typeof c.title !== "string") return null;
    if (c.type === "jobs" || c.type === "internships") return null;
    const end = c.end_date ? new Date(String(c.end_date)) : null;
    if (!end || end < cutoff) return null;
    return {
      id,
      title: c.title,
      end: String(c.end_date),
      start: String(c.start_date ?? ""),
      url: String(c.public_url ?? ""),
      prizes: c.overall_prizes ? String(c.overall_prizes) : null,
      regn: Number(c.regn_open ?? 0),
      type: String(c.type ?? ""),
      region: String(c.region ?? ""),
    };
  } catch {
    return null;
  }
}

async function main() {
  const results: Hit[] = [];
  const ids: number[] = [];
  for (let i = startId; i <= endId; i++) ids.push(i);

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const hits = await Promise.all(batch.map(check));
    for (const hit of hits) {
      if (hit) results.push(hit);
    }
    if (i % 1000 === 0) {
      process.stderr.write(
        `progress ${i}/${ids.length} found=${results.length}\n`
      );
    }
  }

  results.sort((a, b) => a.end.localeCompare(b.end));
  const outPath = "scripts/unstop-future.json";
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.error(`Wrote ${results.length} listings to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});