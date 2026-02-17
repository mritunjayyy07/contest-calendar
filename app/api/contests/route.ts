/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { fetchCodeforcesContests } from "@/app/lib/codeforces";
//import { fetchLeetCodeContests } from "@/app/lib/leetcode";

export async function GET() {
  try {
    const codeforces = await fetchCodeforcesContests();
    console.log("Codeforces OK:", codeforces.length);

   

    const contests = [...codeforces].sort(
      (a, b) => a.startTime - b.startTime
    );

    return NextResponse.json({
      success: true,
      data: contests,
    });
  } catch (error: any) {
    console.error("API ERROR 👉", error.message ?? error);

    return NextResponse.json(
      {
        success: false,
        error: error.message ?? "Failed to load contests",
      },
      { status: 500 }
    );
  }
}