import { Spotlight } from "./spotlight";
export  function Hero (){
    return (
        <main className="bg-gray-950 text-white">
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
      </main>
    );
}