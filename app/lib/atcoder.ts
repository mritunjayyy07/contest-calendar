import * as cheerio from "cheerio";
import { Contest } from "@/app/types/contest";

const ATCODER_URL = "https://atcoder.jp/contests?lang=en";

export async function fetchAtCoderContests(): Promise<Contest[]> {
  const res = await fetch(ATCODER_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch AtCoder contests");
  }

  const html = await res.text();
  const $ = cheerio.load(html);
  const contests: Contest[] = [];

  const now = Date.now();

  $("#contest-table-upcoming tbody tr").each((_, row) => {
    const $row = $(row);
    const timeStr = $row.find("td").eq(0).text().trim();
    const nameLink = $row.find("td").eq(1).find("a");
    const name = nameLink.text().trim();
    const slug = nameLink.attr("href")?.replace("/contests/", "") || "";
    const durationStr = $row.find("td").eq(2).text().trim();

    if (!name || !slug) return;

    const startTime = parseAtCoderTime(timeStr);
    if (!startTime || startTime * 1000 <= now) return;

    const duration = parseAtCoderDuration(durationStr);

    contests.push({
      id: `at-${slug}`,
      platform: "AtCoder",
      name: name,
      startTime: startTime,
      duration: duration,
      url: `https://atcoder.jp/contests/${slug}`,
    });
  });

  return contests;
}

function parseAtCoderTime(timeStr: string): number | null {
  const match = timeStr.match(/(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})\+0900/);
  if (!match) return null;
  const date = new Date(
    parseInt(match[1]),
    parseInt(match[2]) - 1,
    parseInt(match[3]),
    parseInt(match[4]),
    parseInt(match[5]),
    parseInt(match[6])
  );
  return Math.floor(date.getTime() / 1000);
}

function parseAtCoderDuration(durationStr: string): number {
  const match = durationStr.match(/(\d+):(\d+)/);
  if (!match) return 0;
  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  return hours * 3600 + minutes * 60;
}
