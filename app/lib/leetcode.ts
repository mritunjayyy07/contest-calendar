/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contest } from "@/app/types/contest";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const UPCOMING_CONTESTS_QUERY = `
query {
  contestV2UpcomingContests {
    title
    titleSlug
    startTime
    duration
  }
}
`;

export async function fetchLeetCodeContests(): Promise<Contest[]> {
  const res = await fetch(LEETCODE_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: UPCOMING_CONTESTS_QUERY,
    }),
    next: { revalidate: 0 }, // no caching for now
  });

  if (!res.ok) {
    throw new Error("Failed to fetch LeetCode contests");
  }

  const json = await res.json();

  const contests: Contest[] = json.data.contestV2UpcomingContests.map(
    (c: any) => ({
      id: `lc-${c.titleSlug}`,
      platform: "LeetCode",
      name: c.title,
      startTime: c.startTime,
      duration: c.duration,
      url: `https://leetcode.com/contest/${c.titleSlug}`,
    })
  );

  return contests;
}