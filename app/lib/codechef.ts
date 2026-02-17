import { Contest } from "@/app/types/contest";

const CODECHEF_API = "https://www.codechef.com/api/list/contests";

export async function fetchCodeChefContests(): Promise<Contest[]> {
  const res = await fetch(CODECHEF_API, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch CodeChef contests");
  }

  const json = await res.json();
  const contests: Contest[] = [];

  if (json.future_contests) {
    for (const c of json.future_contests) {
      const startTime = c.contest_start_date_iso;
      contests.push({
        id: `cc-${c.contest_code}`,
        platform: "CodeChef",
        name: c.contest_name,
        startTime: Math.floor(new Date(startTime).getTime() / 1000),
        duration: c.contest_duration * 60,
        url: `https://www.codechef.com/${c.contest_code}`,
      });
    }
  }

  return contests;
}
