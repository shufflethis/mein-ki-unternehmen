"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/site.config";
import { ScoringResult, getRecommendations } from "@/lib/scoring";

interface ResultsViewProps {
    answers: Record<string, unknown>;
    result: ScoringResult;
}

export default function ResultsView({ answers, result }: ResultsViewProps) {
    const [animatedScore, setAnimatedScore] = useState(0);
    const recommendations = getRecommendations(answers, result.totalPercent);
    const companyName = (answers.company_name as string) || "Ihr Unternehmen";

    useEffect(() => {
        const target = result.totalPercent;
        const duration = 1500;
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedScore(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [result.totalPercent]);

    const gaugePercent = `${animatedScore}%`;

    // Build mailto
    const mailSubject = encodeURIComponent(
        `KI-Readiness Check Ergebnis — ${companyName} (Score: ${result.totalPercent}%)`
    );
    const mailBody = encodeURIComponent(
        `Hallo,\n\nich habe den KI-Readiness Check auf ${siteConfig.domain} durchgeführt.\n\nUnternehmen: ${companyName}\nKI-Reifegrad: ${result.maturityLevel.emoji} ${result.maturityLevel.label} (Level ${result.maturityLevel.level})\nScore: ${result.totalPercent} von 100\n\nIch freue mich auf ein Beratungsgespräch.\n\nMit freundlichen Grüßen`
    );

    const fmt = (n: number) =>
        n.toLocaleString("de-DE");

    return (
        <div className="min-h-screen py-8 sm:py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
                {/* ── SCORE HERO ──────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        {/* Gauge Ring */}
                        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0">
                            <div
                                className="w-full h-full rounded-full gauge-ring"
                                style={
                                    { "--gauge-percent": gaugePercent } as React.CSSProperties
                                }
                            />
                            <div className="absolute inset-3 sm:inset-4 rounded-full bg-white flex flex-col items-center justify-center">
                                <span className="font-futura font-bold text-3xl sm:text-4xl text-brand-black">
                                    {animatedScore}
                                </span>
                                <span className="text-xs text-gray-400">von 100</span>
                            </div>
                        </div>

                        {/* Level Info */}
                        <div className="text-center sm:text-left">
                            <div className="text-4xl mb-2">
                                {result.maturityLevel.emoji}
                            </div>
                            <h2 className="font-futura font-bold text-2xl text-brand-black mb-1">
                                {result.maturityLevel.label}
                            </h2>
                            <p className="text-sm text-gray-500 mb-1">
                                Level {result.maturityLevel.level} von 5
                            </p>
                            <p className="text-sm text-brand-iris font-medium">
                                {companyName}
                            </p>
                        </div>
                    </div>

                    {/* 5-Segment Progress */}
                    <div className="mt-8 flex gap-1.5">
                        {siteConfig.scoring.maturityLevels.map((lvl) => (
                            <div key={lvl.level} className="flex-1 flex flex-col items-center gap-1.5">
                                <div
                                    className={`w-full h-2.5 rounded-full transition-colors ${lvl.level === result.maturityLevel.level
                                            ? "bg-brand-iris"
                                            : lvl.level < result.maturityLevel.level
                                                ? "bg-brand-green"
                                                : "bg-gray-100"
                                        }`}
                                />
                                <span className="text-[10px] text-gray-400">{lvl.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── CATEGORY BREAKDOWN ──────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm"
                >
                    <h3 className="font-futura font-bold text-lg text-brand-black mb-6">
                        Detailanalyse nach Kategorie
                    </h3>
                    <div className="space-y-4">
                        {result.categories.map((cat) => (
                            <div key={cat.id}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm text-gray-700">{cat.label}</span>
                                    <span className="text-sm font-semibold text-brand-black">
                                        {cat.percent}%
                                    </span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${cat.percent}%` }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        className={`h-full rounded-full ${cat.percent >= 70
                                                ? "bg-brand-green"
                                                : cat.percent >= 40
                                                    ? "bg-brand-iris"
                                                    : "bg-brand-light-orange"
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── SAVINGS POTENTIAL ────────────────────────────────── */}
                {result.savingsPotential && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="rounded-3xl border border-brand-dusty-green/50 p-6 sm:p-8 shadow-sm"
                        style={{
                            background:
                                "linear-gradient(135deg, #DDEBD3 0%, #DEEBF7 100%)",
                        }}
                    >
                        <h3 className="font-futura font-bold text-lg text-brand-black mb-6">
                            💡 Ihr geschätztes Einsparpotenzial
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center">
                                <div className="font-futura font-bold text-2xl text-brand-black">
                                    {fmt(result.savingsPotential.hoursPerWeek)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Stunden / Woche
                                </div>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center">
                                <div className="font-futura font-bold text-2xl text-brand-black">
                                    {fmt(result.savingsPotential.hoursPerYear)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Stunden / Jahr
                                </div>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center">
                                <div className="font-futura font-bold text-2xl text-brand-iris">
                                    {fmt(result.savingsPotential.eurosPerYear)} €
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    geschätzt / Jahr
                                </div>
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-4 text-center">
                            Schätzung basierend auf 30% Automatisierungspotenzial, 48 Arbeitswochen, Ø 50 €/h
                        </p>
                    </motion.div>
                )}

                {/* ── RECOMMENDATIONS ─────────────────────────────────── */}
                {recommendations.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm"
                    >
                        <h3 className="font-futura font-bold text-lg text-brand-black mb-6">
                            🎯 Ihre Handlungsempfehlungen
                        </h3>
                        <ol className="space-y-4">
                            {recommendations.map((rec, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-dusty-green/50 text-sm font-semibold text-brand-black flex-shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {rec}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </motion.div>
                )}

                {/* ── CTA CARD ────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-brand-black rounded-3xl p-6 sm:p-8 text-white text-center"
                >
                    <h3 className="font-futura font-bold text-xl mb-3">
                        Bereit für den nächsten Schritt?
                    </h3>
                    <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
                        Unsere KI-Experten analysieren Ihr Ergebnis und zeigen Ihnen
                        konkret, wie Sie Ihre KI-Readiness steigern können.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href={siteConfig.cta.calendly}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-green text-brand-black font-semibold rounded-xl hover:bg-brand-green-hover transition-colors"
                        >
                            Kostenloses Beratungsgespräch buchen
                        </a>
                        <a
                            href={`mailto:${siteConfig.legal.email}?subject=${mailSubject}&body=${mailBody}`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
                        >
                            Per E-Mail kontaktieren
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
