"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import { Contest } from "@/app/types/contest";

export function Grid({ contests }: { contests: Contest[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {contests.map((contest) => (
        <BentoGrid key={contest.id}>
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5"
          >
            <h2 className="text-white">{contest.name}</h2>
          </a>
        </BentoGrid>
      ))}
    </div>
  );
}