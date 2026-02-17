export type Platform = "LeetCode" | "Codeforces" | "CodeChef" | "AtCoder";

export type Contest = {
  id: string;
  platform: Platform;
  name: string;
  startTime: number;   // epoch seconds
  duration: number;    // seconds
  url: string;
};