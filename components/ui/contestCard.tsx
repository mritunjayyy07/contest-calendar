import { BentoGridItem } from "@/components/ui/bento-grid";
import { Contest } from "@/app/types/contest";
import { formatDuration } from "@/app/utils/contest";

export function ContestCard({ contest }: { contest: Contest }) {
  const startDate = new Date(contest.startTime * 1000);
  const now = new Date();

  const isStartingSoon =
    startDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000;

  return (
    <BentoGridItem
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
}