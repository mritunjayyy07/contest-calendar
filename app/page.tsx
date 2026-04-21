import { getContests } from "./lib/contests";
import { ContestCard } from "@/components/ui/contestCard";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Spotlight } from "@/components/ui/spotlight";
import { Hero } from "@/components/ui/Hero";

export default async function Home() {
  const contests = await getContests();

  return (
    <main className="bg-gray-950 text-white">
    
    <Hero />
    <BentoGrid>
      {contests.map((contest) => (
        <ContestCard key={contest.id} contest={contest} />
      ))}
    </BentoGrid>
    </main>
    
  );
}