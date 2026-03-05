import { NextRequest, NextResponse } from "next/server";
import { calculateScore } from "@/lib/scoring";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { answers } = body;

        if (!answers || typeof answers !== "object") {
            return NextResponse.json(
                { error: "Invalid request: answers required" },
                { status: 400 }
            );
        }

        const result = calculateScore(answers);

        return NextResponse.json({
            success: true,
            score: result.totalPercent,
            maturityLevel: result.maturityLevel,
            categories: result.categories,
            savingsPotential: result.savingsPotential,
        });
    } catch (error) {
        console.error("Score error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
