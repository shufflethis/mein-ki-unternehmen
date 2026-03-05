"use client";

import { siteConfig } from "@/site.config";

interface HeaderProps {
    mode: "landing" | "questionnaire" | "results";
    currentSection?: number;
    totalSections?: number;
    progress?: number;
}

export default function Header({
    mode,
    currentSection,
    totalSections,
    progress,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 glass border-b border-gray-100/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-9 h-9 bg-brand-black rounded-lg text-brand-green font-futura font-bold text-sm">
                        KI
                    </span>
                    <span className="font-futura font-semibold text-brand-black text-sm sm:text-base">
                        {siteConfig.siteName}
                    </span>
                </div>

                {/* Right side */}
                {mode === "landing" && (
                    <a
                        href={`tel:${siteConfig.legal.phone}`}
                        className="text-sm text-gray-500 hover:text-brand-black transition-colors hidden sm:block"
                    >
                        {siteConfig.legal.phone}
                    </a>
                )}

                {mode === "questionnaire" && (
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-xs sm:text-sm text-gray-500">
                            Abschnitt {currentSection} von {totalSections}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-brand-iris">
                            {progress}%
                        </span>
                        <div className="w-20 sm:w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full progress-gradient rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {mode === "results" && (
                    <span className="text-sm text-gray-500">Ihr Ergebnis</span>
                )}
            </div>
        </header>
    );
}
