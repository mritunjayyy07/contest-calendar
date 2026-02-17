import { Contest } from "./types/contest";
import { fetchCodeforcesContests } from "./lib/codeforces";
import { fetchLeetCodeContests } from "./lib/leetcode";
import { fetchAtCoderContests } from "./lib/atcoder";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/spotlight";

async function getContests(): Promise<Contest[]> {
  const [codeforces, leetcode, atcoder] = await Promise.all([
    fetchCodeforcesContests(),
    fetchLeetCodeContests(),
    fetchAtCoderContests(),
  ]);
  
  return [...codeforces, ...leetcode, ...atcoder].sort((a, b) => a.startTime - b.startTime);
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function getPlatformColor(platform: string): string {
  switch (platform) {
    case "Codeforces":
      return "bg-blue-600";
    case "LeetCode":
      return "bg-yellow-500";
    case "AtCoder":
      return "bg-red-600";
    default:
      return "bg-gray-600";
  }
}

function getPlatformLogo(platform: string): string {
  switch (platform) {
    case "Codeforces":
      return "/codeforces.svg";
    case "LeetCode":
      return "/leetcode.svg";
    case "AtCoder":
      return "/atcoder.svg";
    default:
      return "";
  }
}

export default async function Home() {
  let contests: Contest[] = [];
  let error: string | null = null;

  try {
    contests = await getContests();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (  
     <main className="bg-gray-950 text-white">

      {/* 🔥 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
        
        {/* Spotlight Background */}
        <Spotlight />

        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Upcoming Coding Contests
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto">
            Track upcoming contests from Codeforces, LeetCode, and AtCoder
          </p>

          <div className="mt-8 animate-bounce text-gray-500">
            ↓ Scroll to explore
          </div>
        </div>
      </section>


      {/* 🚀 GRID SECTION */}
      <section className="relative z-10 p-8 max-w-7xl mx-auto">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-8">
            Error: {error}
          </div>
        )}

        {contests.length === 0 && !error ? (
          <div className="text-gray-400">No upcoming contests found.</div>
        ) : (
          <BentoGrid className="w-full">
            {contests.map((contest) => {
              const startDate = new Date(contest.startTime * 1000);
              const now = new Date();
              const isStartingSoon =
                startDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000;

              return (
                <BentoGridItem
                  key={contest.id}
                  className={`bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-gray-700 ${
                    isStartingSoon ? "ring-2 ring-yellow-500/50" : ""
                  }`}
                  header={
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">
                        {contest.platform}
                      </span>
                      {isStartingSoon && (
                        <span className="text-xs text-yellow-400 font-medium animate-pulse">
                          Starting Soon
                        </span>
                      )}
                    </div>
                  }
                  title={
                    <a
                      href={contest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {contest.name}
                    </a>
                  }
                  description={
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>
                        <span className="text-gray-500">Start:</span>{" "}
                        {startDate.toLocaleDateString()} at{" "}
                        {startDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>
                        <span className="text-gray-500">Duration:</span>{" "}
                        {formatDuration(contest.duration)}
                      </p>
                    </div>
                  }
                />
              );
            })}
          </BentoGrid>
        )}
      </section>

    </main>
  );
}