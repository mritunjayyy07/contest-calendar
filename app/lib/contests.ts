import { Contest } from "../types/contest";
import { fetchCodeforcesContests } from "./codeforces";
import { fetchLeetCodeContests } from "./leetcode";
import { fetchAtCoderContests } from "./atcoder";
import { fetchCodeChefContests } from "./codechef";

export async function getContests(): Promise<Contest[]> {
  const [codeforces, leetcode, atcoder, codechef] = await Promise.all([
    fetchCodeforcesContests(),
    fetchLeetCodeContests(),
    fetchAtCoderContests(),
    fetchCodeChefContests()
  ]);

  return [...codeforces, ...leetcode, ...atcoder, ...codechef]
    .sort((a, b) => a.startTime - b.startTime);
}