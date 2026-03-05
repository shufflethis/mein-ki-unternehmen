import { sections, Section } from "./questions";

export interface CategoryScore {
    id: string;
    label: string;
    score: number;
    maxScore: number;
    percent: number;
}

export interface ScoringResult {
    totalScore: number;
    totalPercent: number;
    maturityLevel: {
        label: string;
        emoji: string;
        level: number;
    };
    categories: CategoryScore[];
    savingsPotential: {
        hoursPerWeek: number;
        hoursPerYear: number;
        eurosPerYear: number;
    } | null;
}

// Sections that contribute to scoring
const SCORING_SECTIONS = [
    "ki_status",
    "processes",
    "data",
    "marketing",
    "employees",
    "budget",
];

const CATEGORY_LABELS: Record<string, string> = {
    ki_status: "KI-Status",
    processes: "Prozesse & Automatisierung",
    data: "Daten & Infrastruktur",
    marketing: "Marketing & Sichtbarkeit",
    employees: "Mitarbeiter & Kompetenzen",
    budget: "Budget & Bereitschaft",
};

// Company size multipliers for savings calculation
const SIZE_MULTIPLIERS: Record<string, number> = {
    "1-10": 5,
    "11-50": 25,
    "51-250": 100,
    "251-1000": 400,
    "1000+": 800,
};

// Hours mapping for savings calculation
const HOURS_MAP: Record<string, number> = {
    under_5: 3,
    "5_10": 7.5,
    "10_20": 15,
    "20_plus": 25,
};

function getQuestionMaxScore(question: {
    type: string;
    options?: { score?: number }[];
    scoreWeight?: number;
}): number {
    if (!question.options) return 0;

    const weight = question.scoreWeight || 1;

    if (question.type === "multi") {
        // Multi-select: sum top 4 scores
        const sorted = question.options
            .map((o) => o.score || 0)
            .sort((a, b) => b - a);
        const top4 = sorted.slice(0, 4);
        return top4.reduce((sum, s) => sum + s, 0) * weight;
    }

    // Radio, scale, dropdown: max single option score
    const maxOption = Math.max(...question.options.map((o) => o.score || 0));
    return maxOption * weight;
}

function getQuestionScore(
    question: {
        id: string;
        type: string;
        options?: { value: string; score?: number }[];
        scoreWeight?: number;
    },
    answers: Record<string, unknown>
): number {
    const answer = answers[question.id];
    if (!answer || !question.options) return 0;

    const weight = question.scoreWeight || 1;

    if (question.type === "multi" && Array.isArray(answer)) {
        // Sum scores of selected options, capped at top 4
        const selectedScores = answer
            .map((val: string) => {
                const opt = question.options!.find((o) => o.value === val);
                return opt?.score || 0;
            })
            .sort((a: number, b: number) => b - a)
            .slice(0, 4);
        return selectedScores.reduce((sum: number, s: number) => sum + s, 0) * weight;
    }

    // Single-value questions
    const opt = question.options.find((o) => o.value === answer);
    return (opt?.score || 0) * weight;
}

export function calculateScore(
    answers: Record<string, unknown>
): ScoringResult {
    const categories: CategoryScore[] = [];
    let totalScore = 0;
    let totalMaxScore = 0;

    for (const sectionId of SCORING_SECTIONS) {
        const section = sections.find((s: Section) => s.id === sectionId);
        if (!section) continue;

        let sectionScore = 0;
        let sectionMax = 0;

        for (const q of section.questions) {
            if (!q.options || q.options.every((o) => o.score === undefined))
                continue;

            const qScore = getQuestionScore(q, answers);
            const qMax = getQuestionMaxScore(q);

            sectionScore += qScore;
            sectionMax += qMax;
        }

        const sectionWeight = section.scoreWeight || 1;
        const weightedScore = sectionScore * sectionWeight;
        const weightedMax = sectionMax * sectionWeight;

        totalScore += weightedScore;
        totalMaxScore += weightedMax;

        categories.push({
            id: sectionId,
            label: CATEGORY_LABELS[sectionId] || section.title,
            score: weightedScore,
            maxScore: weightedMax,
            percent: weightedMax > 0 ? Math.round((weightedScore / weightedMax) * 100) : 0,
        });
    }

    const totalPercent =
        totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

    // Get maturity level
    const maturityLevels = [
        { min: 0, max: 20, label: "KI-Einsteiger", emoji: "🌱", level: 1 },
        { min: 21, max: 40, label: "KI-Experimentierer", emoji: "🔬", level: 2 },
        { min: 41, max: 60, label: "KI-Nutzer", emoji: "⚙️", level: 3 },
        { min: 61, max: 80, label: "KI-Integriert", emoji: "🚀", level: 4 },
        { min: 81, max: 100, label: "KI-First", emoji: "🏆", level: 5 },
    ];

    const maturityLevel =
        maturityLevels.find(
            (l) => totalPercent >= l.min && totalPercent <= l.max
        ) || maturityLevels[0];

    // Calculate savings potential
    let savingsPotential: ScoringResult["savingsPotential"] = null;
    const repetitiveHours = answers.repetitive_hours as string | undefined;
    const companySize = answers.company_size as string | undefined;

    if (repetitiveHours && companySize) {
        const baseHours = HOURS_MAP[repetitiveHours] || 0;
        const sizeMultiplier = SIZE_MULTIPLIERS[companySize] || 5;
        const staffRatio = 0.3; // 30% of staff affected
        const savingsRatio = 0.3; // 30% automation potential
        const weeks = 48;
        const hourlyRate = 50;

        const hoursPerWeek = Math.round(
            baseHours * sizeMultiplier * staffRatio * savingsRatio
        );
        const hoursPerYear = hoursPerWeek * weeks;
        const eurosPerYear = hoursPerYear * hourlyRate;

        savingsPotential = { hoursPerWeek, hoursPerYear, eurosPerYear };
    }

    return {
        totalScore: totalPercent,
        totalPercent,
        maturityLevel,
        categories,
        savingsPotential,
    };
}

export function getRecommendations(
    answers: Record<string, unknown>,
    totalPercent: number
): string[] {
    const recs: string[] = [];

    const kiUsage = answers.ki_usage as string;
    if (kiUsage === "none" || kiUsage === "experiments") {
        recs.push(
            "Starten Sie mit KI-Assistenten wie ChatGPT oder Claude für alltägliche Aufgaben — Textgenerierung, Recherche und E-Mail-Entwürfe lassen sich sofort beschleunigen."
        );
    }

    const kiStrategy = answers.ki_strategy as string;
    if (kiStrategy === "none" || kiStrategy === "planning") {
        recs.push(
            "Entwickeln Sie eine konkrete KI-Strategie mit klaren Zielen, Verantwortlichkeiten und messbaren KPIs für die nächsten 6–12 Monate."
        );
    }

    const dataStructure = answers.data_structure as string;
    if (dataStructure === "unstructured" || dataStructure === "none") {
        recs.push(
            "Investieren Sie in Datenstrukturierung und -zentralisierung. Saubere Daten sind die Grundlage für jede erfolgreiche KI-Initiative."
        );
    }

    const kiVisibility = answers.ki_visibility as string;
    if (kiVisibility === "rarely" || kiVisibility === "unknown") {
        recs.push(
            "Optimieren Sie Ihre digitale Präsenz für KI-Suchsysteme (GEO). Immer mehr Kunden nutzen ChatGPT, Perplexity und Co. statt Google."
        );
    }

    const kiAffinity = answers.ki_affinity as string;
    if (kiAffinity === "none" || kiAffinity === "experiments") {
        recs.push(
            "Schulen Sie Ihr Team im Umgang mit KI-Tools. Regelmäßige Workshops und Hands-on-Trainings bauen Berührungsängste ab und steigern die Produktivität."
        );
    }

    const kiBudget = answers.ki_budget as string;
    if (kiBudget === "none") {
        recs.push(
            "Planen Sie ein dediziertes KI-Budget ein. Selbst kleine Investitionen in Pilotprojekte können schnellen ROI liefern."
        );
    }

    if (totalPercent < 60) {
        recs.push(
            "Ein geführter KI-Readiness-Workshop mit Experten kann helfen, die wichtigsten Quick Wins für Ihr Unternehmen zu identifizieren."
        );
    }

    return recs.slice(0, 5);
}
