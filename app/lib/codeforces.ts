/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contest } from "@/app/types/contest";

const CODEFORCES_API = "https://codeforces.com/api/contest.list";

export async function fetchCodeforcesContests(): Promise<Contest[]> {
  const res = await fetch(CODEFORCES_API, {
    next: { revalidate: 0 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Codeforces contests");
  }

  const json = await res.json();

  const contests: Contest[] = json.result
    .filter((c: any ) => c.phase === "BEFORE")
    .map((c: any) => ({
      id: `cf-${c.id}`,
      platform: "Codeforces",
      name: c.name,
      startTime: c.startTimeSeconds,
      duration: c.durationSeconds,
      url: `https://codeforces.com/contest/${c.id}`,
    }));
  
    
  return contests;
  
}