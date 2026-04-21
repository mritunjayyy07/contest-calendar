/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contest } from "../types/contest";
const CODECHEF_API = "https://www.codechef.com/api/list/contests/all";
export async function fetchCodeChefContests(): Promise<Contest[]>{
  const res = await fetch(CODECHEF_API, {
    next: { revalidate: 0 }, 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Codeforces contests");
  }

  const json = await res.json();
//   const unixdate: number[] = json.future_contests.map((c: any) => {
//   return Math.floor(new Date(c.contest_start_date).getTime() / 1000);
// });
//   let a = 0;
  const contests: Contest[] = json.future_contests
  .map((c: any) => ({
      id: `cc-${c.contest_code}`,
      platform: "Codechef",
      name: c.contest_name,
      startTime:Math.floor(new Date(c.contest_start_date).getTime() / 1000),
      duration: c.contest_duration*60,
      url: `https://codechef.com/${c.contest_code}`,
    }));
    return contests;

}