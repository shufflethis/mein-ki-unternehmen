"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sections, Question } from "@/lib/questions";

interface QuestionnaireFlowProps {
    answers: Record<string, unknown>;
    setAnswers: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
    onComplete: () => void;
    onBack: () => void;
}

export default function QuestionnaireFlow({
    answers,
    setAnswers,
    onComplete,
    onBack,
}: QuestionnaireFlowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const section = sections[currentIndex];
    const progress = Math.round(((currentIndex + 1) / sections.length) * 100);
    const isLast = currentIndex === sections.length - 1;

    const setAnswer = useCallback(
        (id: string, value: unknown) => {
            setAnswers((prev) => ({ ...prev, [id]: value }));
        },
        [setAnswers]
    );

    const toggleMulti = useCallback(
        (id: string, value: string) => {
            setAnswers((prev) => {
                const current = (prev[id] as string[]) || [];
                if (current.includes(value)) {
                    return { ...prev, [id]: current.filter((v) => v !== value) };
                }
                return { ...prev, [id]: [...current, value] };
            });
        },
        [setAnswers]
    );

    const setMatrix = useCallback(
        (id: string, row: string, col: string) => {
            setAnswers((prev) => {
                const current = (prev[id] as Record<string, string>) || {};
                return { ...prev, [id]: { ...current, [row]: col } };
            });
        },
        [setAnswers]
    );

    // Validate required fields
    const canProceed = section.questions.every((q) => {
        if (!q.required) return true;
        const val = answers[q.id];
        if (val === undefined || val === null || val === "") return false;
        return true;
    });

    const handleNext = () => {
        if (isLast) {
            onComplete();
            return;
        }
        setDirection(1);
        setCurrentIndex((i) => i + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        if (currentIndex === 0) {
            onBack();
            return;
        }
        setDirection(-1);
        setCurrentIndex((i) => i - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen">
            {/* Sticky progress header */}
            <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">
                        Abschnitt {currentIndex + 1} von {sections.length}
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-xs sm:text-sm font-semibold text-brand-iris">{progress}%</span>
                        <div className="w-24 sm:w-40 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full progress-gradient rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, x: direction * 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* Section header */}
                        <div className="text-center mb-10">
                            <div className="text-4xl mb-3">{section.emoji}</div>
                            <h2 className="font-futura font-bold text-2xl sm:text-3xl text-brand-black mb-2">
                                {section.title}
                            </h2>
                            <p className="text-gray-500">{section.subtitle}</p>
                        </div>

                        {/* Questions */}
                        <div className="space-y-8">
                            {section.questions.map((q, qi) => (
                                <motion.div
                                    key={q.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: qi * 0.1, duration: 0.4 }}
                                >
                                    <QuestionRenderer
                                        question={q}
                                        value={answers[q.id]}
                                        onChange={(val) => setAnswer(q.id, val)}
                                        onToggleMulti={(val) => toggleMulti(q.id, val)}
                                        onSetMatrix={(row, col) => setMatrix(q.id, row, col)}
                                        matrixValue={answers[q.id] as Record<string, string>}
                                        multiValue={answers[q.id] as string[]}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
                            <button
                                onClick={handleBack}
                                className="inline-flex items-center gap-2 px-6 py-3 text-gray-500 hover:text-brand-black transition-colors font-medium rounded-xl hover:bg-gray-50"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                </svg>
                                Zurück
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!canProceed}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-brand-black"
                            >
                                {isLast ? "Ergebnis anzeigen" : "Weiter"}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ── Question Renderers ─────────────────────────────────────── */

function QuestionRenderer({
    question,
    value,
    onChange,
    onToggleMulti,
    onSetMatrix,
    matrixValue,
    multiValue,
}: {
    question: Question;
    value: unknown;
    onChange: (val: unknown) => void;
    onToggleMulti: (val: string) => void;
    onSetMatrix: (row: string, col: string) => void;
    matrixValue?: Record<string, string>;
    multiValue?: string[];
}) {
    const label = (
        <label className="block text-sm font-semibold text-brand-black mb-3">
            {question.label}
            {question.required && <span className="text-red-400 ml-1">*</span>}
        </label>
    );

    switch (question.type) {
        case "text":
            return (
                <div>
                    {label}
                    <input
                        type={question.id === "contact_email" ? "email" : "text"}
                        value={(value as string) || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={question.placeholder}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-brand-green focus:outline-none transition-colors bg-white"
                    />
                </div>
            );

        case "dropdown":
            return (
                <div>
                    {label}
                    <select
                        value={(value as string) || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-brand-green focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
                    >
                        <option value="">Bitte wählen...</option>
                        {question.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            );

        case "radio":
            return (
                <div>
                    {label}
                    <div className="space-y-2">
                        {question.options?.map((opt) => {
                            const selected = value === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => onChange(opt.value)}
                                    className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${selected
                                        ? "border-brand-green bg-brand-dusty-green/50"
                                        : "border-gray-200 hover:border-brand-green/50 bg-white"
                                        }`}
                                >
                                    <span
                                        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selected ? "border-brand-green bg-brand-green" : "border-gray-300"
                                            }`}
                                    >
                                        {selected && (
                                            <span className="w-2 h-2 rounded-full bg-white" />
                                        )}
                                    </span>
                                    <span className="text-sm">{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            );

        case "multi":
            return (
                <div>
                    {label}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.options?.map((opt) => {
                            const selected = multiValue?.includes(opt.value) ?? false;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => onToggleMulti(opt.value)}
                                    className={`text-left px-4 py-3.5 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${selected
                                        ? "border-brand-green bg-brand-dusty-green/50"
                                        : "border-gray-200 hover:border-brand-green/50 bg-white"
                                        }`}
                                >
                                    <span
                                        className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selected ? "border-brand-green bg-brand-green" : "border-gray-300"
                                            }`}
                                    >
                                        {selected && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="text-sm">{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            );

        case "scale":
            return (
                <div>
                    {label}
                    <div className="flex items-center gap-2 sm:gap-3 justify-center mt-2">
                        {question.scaleMin && (
                            <span className="text-xs text-gray-400 hidden sm:block">{question.scaleMin}</span>
                        )}
                        {question.options?.map((opt) => {
                            const selected = value === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => onChange(opt.value)}
                                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 font-semibold text-sm transition-all duration-200 ${selected
                                        ? "border-brand-iris bg-brand-iris text-white scale-[1.15]"
                                        : "border-gray-200 hover:border-brand-iris/50 text-gray-600 bg-white"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                        {question.scaleMax && (
                            <span className="text-xs text-gray-400 hidden sm:block">{question.scaleMax}</span>
                        )}
                    </div>
                    <div className="flex justify-between mt-1 sm:hidden">
                        <span className="text-xs text-gray-400">{question.scaleMin}</span>
                        <span className="text-xs text-gray-400">{question.scaleMax}</span>
                    </div>
                </div>
            );

        case "matrix":
            return (
                <div>
                    {label}
                    <div className="overflow-x-auto -mx-4 px-4">
                        <table className="w-full min-w-[400px]">
                            <thead>
                                <tr>
                                    <th className="text-left text-xs text-gray-400 font-normal pb-3 pr-4" />
                                    {question.matrixColumns?.map((col) => (
                                        <th
                                            key={col}
                                            className="text-center text-xs text-gray-400 font-normal pb-3 px-2"
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {question.matrixRows?.map((row) => (
                                    <tr key={row} className="border-t border-gray-100">
                                        <td className="text-sm text-brand-black py-3 pr-4">
                                            {row}
                                        </td>
                                        {question.matrixColumns?.map((col) => {
                                            const selected = matrixValue?.[row] === col;
                                            return (
                                                <td key={col} className="text-center py-3 px-2">
                                                    <button
                                                        onClick={() => onSetMatrix(row, col)}
                                                        className={`w-8 h-8 rounded-full border-2 transition-all mx-auto ${selected
                                                            ? "border-brand-iris bg-brand-iris"
                                                            : "border-gray-200 hover:border-brand-iris/50"
                                                            }`}
                                                    >
                                                        {selected && (
                                                            <span className="block w-2.5 h-2.5 rounded-full bg-white mx-auto" />
                                                        )}
                                                    </button>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

        default:
            return null;
    }
}
