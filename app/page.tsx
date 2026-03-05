"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuestionnaireFlow from "@/components/QuestionnaireFlow";
import ResultsView from "@/components/ResultsView";
import Footer from "@/components/Footer";
import { calculateScore, ScoringResult } from "@/lib/scoring";

type AppState = "landing" | "questionnaire" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [result, setResult] = useState<ScoringResult | null>(null);

  const handleStart = useCallback(() => {
    setAppState("questionnaire");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleComplete = useCallback(() => {
    const scoringResult = calculateScore(answers);
    setResult(scoringResult);
    setAppState("results");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fire-and-forget submit to API
    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers,
        score: scoringResult,
        domain: window.location.hostname,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silent fail — results are shown regardless
    });
  }, [answers]);

  const handleBackToLanding = useCallback(() => {
    setAppState("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const progress =
    appState === "questionnaire"
      ? 0 // Will be managed inside QuestionnaireFlow
      : appState === "results"
        ? 100
        : 0;

  return (
    <>
      <Header
        mode={appState}
        currentSection={1}
        totalSections={10}
        progress={progress}
      />

      {appState === "landing" && <HeroSection onStart={handleStart} />}

      {appState === "questionnaire" && (
        <QuestionnaireFlow
          answers={answers}
          setAnswers={setAnswers}
          onComplete={handleComplete}
          onBack={handleBackToLanding}
        />
      )}

      {appState === "results" && result && (
        <ResultsView answers={answers} result={result} />
      )}

      <Footer />
    </>
  );
}
