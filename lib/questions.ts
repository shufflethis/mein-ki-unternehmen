export type QuestionType =
    | "text"
    | "dropdown"
    | "radio"
    | "multi"
    | "scale"
    | "matrix";

export interface QuestionOption {
    label: string;
    value: string;
    score?: number;
}

export interface Question {
    id: string;
    label: string;
    type: QuestionType;
    required?: boolean;
    placeholder?: string;
    options?: QuestionOption[];
    scoreWeight?: number;
    scaleMin?: string;
    scaleMax?: string;
    matrixRows?: string[];
    matrixColumns?: string[];
}

export interface Section {
    id: string;
    title: string;
    emoji: string;
    subtitle: string;
    scoreWeight?: number;
    questions: Question[];
}

export const sections: Section[] = [
    // ── Section 1: Unternehmensdaten ──────────────────────────────
    {
        id: "company",
        title: "Unternehmensdaten",
        emoji: "🏢",
        subtitle: "Erzählen Sie uns von Ihrem Unternehmen",
        questions: [
            {
                id: "company_name",
                label: "Ihr Unternehmen",
                type: "text",
                required: true,
                placeholder: "z.B. Mustermann GmbH",
            },
            {
                id: "website",
                label: "Website",
                type: "text",
                placeholder: "www.beispiel.de",
            },
            {
                id: "industry",
                label: "Branche",
                type: "dropdown",
                required: true,
                options: [
                    { label: "Industrie / Produktion", value: "industry_production" },
                    { label: "Handel / E-Commerce", value: "trade_ecommerce" },
                    { label: "Dienstleistungen", value: "services" },
                    { label: "Immobilien", value: "real_estate" },
                    { label: "Gesundheit / Pharma", value: "health_pharma" },
                    { label: "Finanzen / Versicherungen", value: "finance_insurance" },
                    { label: "Software / IT", value: "software_it" },
                    { label: "Medien / Marketing", value: "media_marketing" },
                    { label: "Bau / Handwerk", value: "construction" },
                    { label: "Öffentlicher Sektor", value: "public_sector" },
                    { label: "Sonstiges", value: "other" },
                ],
            },
            {
                id: "company_size",
                label: "Unternehmensgröße (Mitarbeiter)",
                type: "dropdown",
                required: true,
                options: [
                    { label: "1–10", value: "1-10", score: 1 },
                    { label: "11–50", value: "11-50", score: 2 },
                    { label: "51–250", value: "51-250", score: 3 },
                    { label: "251–1.000", value: "251-1000", score: 4 },
                    { label: "1.000+", value: "1000+", score: 5 },
                ],
            },
            {
                id: "revenue",
                label: "Jahresumsatz (optional)",
                type: "dropdown",
                options: [
                    { label: "unter 1 Mio. €", value: "under_1m" },
                    { label: "1–10 Mio. €", value: "1m_10m" },
                    { label: "10–50 Mio. €", value: "10m_50m" },
                    { label: "50–250 Mio. €", value: "50m_250m" },
                    { label: "250 Mio. €+", value: "250m_plus" },
                ],
            },
            {
                id: "role",
                label: "Ihre Rolle",
                type: "dropdown",
                required: true,
                options: [
                    { label: "Geschäftsführer / Inhaber", value: "ceo_owner" },
                    { label: "Vorstand / C-Level", value: "c_level" },
                    { label: "Abteilungsleiter", value: "department_head" },
                    { label: "Digital / Marketing Lead", value: "digital_lead" },
                    { label: "IT Leitung", value: "it_lead" },
                    { label: "Innovation / Strategie", value: "innovation" },
                    { label: "Sonstiges", value: "other" },
                ],
            },
        ],
    },

    // ── Section 2: Unternehmensstruktur ───────────────────────────
    {
        id: "structure",
        title: "Unternehmensstruktur",
        emoji: "👥",
        subtitle: "Wie ist Ihr Unternehmen aufgestellt?",
        questions: [
            {
                id: "departments",
                label: "Welche Abteilungen hat Ihr Unternehmen?",
                type: "multi",
                options: [
                    { label: "Vertrieb / Sales", value: "sales" },
                    { label: "Marketing", value: "marketing" },
                    { label: "Kundenservice / Support", value: "support" },
                    { label: "HR / Recruiting", value: "hr" },
                    { label: "Produktion / Operations", value: "operations" },
                    { label: "Einkauf / Supply Chain", value: "supply_chain" },
                    { label: "IT / Software", value: "it" },
                    { label: "Finanzen / Controlling", value: "finance" },
                    { label: "Recht / Compliance", value: "legal" },
                    { label: "Management / Strategie", value: "management" },
                ],
            },
            {
                id: "dept_headcount",
                label: "Mitarbeiterzahl pro Abteilung",
                type: "matrix",
                matrixRows: ["Marketing", "Sales", "Service", "Administration", "IT"],
                matrixColumns: ["0", "1–5", "6–20", "20+"],
            },
        ],
    },

    // ── Section 3: Aktueller KI-Status (HAUPTSCORING) ────────────
    {
        id: "ki_status",
        title: "Aktueller KI-Status",
        emoji: "🤖",
        subtitle: "Wie nutzen Sie KI aktuell in Ihrem Unternehmen?",
        scoreWeight: 2,
        questions: [
            {
                id: "ki_usage",
                label: "Nutzen Sie bereits KI-Tools in Ihrem Unternehmen?",
                type: "radio",
                scoreWeight: 2,
                options: [
                    { label: "Nein, bisher nicht", value: "none", score: 0 },
                    { label: "Erste Experimente einzelner Mitarbeiter", value: "experiments", score: 5 },
                    { label: "Regelmäßige Nutzung in Teilbereichen", value: "regular", score: 10 },
                    { label: "Teil von etablierten Prozessen", value: "processes", score: 15 },
                    { label: "Strategischer Bestandteil", value: "strategic", score: 20 },
                ],
            },
            {
                id: "ki_tools",
                label: "Welche KI-Tools werden eingesetzt?",
                type: "multi",
                scoreWeight: 1,
                options: [
                    { label: "ChatGPT / Claude", value: "chatgpt_claude", score: 2 },
                    { label: "Microsoft Copilot", value: "copilot", score: 3 },
                    { label: "Midjourney / DALL-E", value: "image_ai", score: 2 },
                    { label: "ElevenLabs / Voice AI", value: "voice_ai", score: 3 },
                    { label: "HeyGen / Video AI", value: "video_ai", score: 3 },
                    { label: "Marketing Automation", value: "marketing_auto", score: 4 },
                    { label: "AI Analytics", value: "ai_analytics", score: 4 },
                    { label: "Individuelle KI-Lösungen", value: "custom_ai", score: 5 },
                    { label: "Keine", value: "none", score: 0 },
                ],
            },
            {
                id: "ki_strategy",
                label: "Gibt es eine KI-Strategie in Ihrem Unternehmen?",
                type: "radio",
                scoreWeight: 2,
                options: [
                    { label: "Nein", value: "none", score: 0 },
                    { label: "In Planung", value: "planning", score: 3 },
                    { label: "Erste Pilotprojekte", value: "pilot", score: 6 },
                    { label: "Ja, in einzelnen Abteilungen", value: "some_depts", score: 9 },
                    { label: "Ja, unternehmensweit", value: "company_wide", score: 12 },
                ],
            },
        ],
    },

    // ── Section 4: Prozesse & Automatisierung ─────────────────────
    {
        id: "processes",
        title: "Prozesse & Automatisierung",
        emoji: "⚙️",
        subtitle: "Wo sind Ihre größten Effizienzpotenziale?",
        questions: [
            {
                id: "time_consuming",
                label: "Welche Aufgaben kosten am meisten Zeit?",
                type: "multi",
                options: [
                    { label: "Kundenanfragen / Support", value: "support" },
                    { label: "Content / Marketing", value: "content" },
                    { label: "Reporting / Analyse", value: "reporting" },
                    { label: "Datenaufbereitung", value: "data_prep" },
                    { label: "Angebotserstellung", value: "proposals" },
                    { label: "Terminmanagement", value: "scheduling" },
                    { label: "Recruiting / Bewerbungen", value: "recruiting" },
                    { label: "Interne Kommunikation", value: "internal_comm" },
                    { label: "Dokumentation", value: "documentation" },
                    { label: "Produktion / Planung", value: "production" },
                ],
            },
            {
                id: "efficiency_loss",
                label: "Wo sehen Sie die größten Effizienzverluste?",
                type: "text",
                placeholder: "Beschreiben Sie kurz...",
            },
            {
                id: "automate_wish",
                label: "Was würden Sie am liebsten automatisieren?",
                type: "text",
                placeholder: "z.B. E-Mail-Beantwortung, Reporting...",
            },
            {
                id: "repetitive_hours",
                label: "Wie viele Stunden/Woche gehen für repetitive Aufgaben drauf?",
                type: "radio",
                scoreWeight: 1.5,
                options: [
                    { label: "Unter 5 Stunden", value: "under_5", score: 2 },
                    { label: "5–10 Stunden", value: "5_10", score: 4 },
                    { label: "10–20 Stunden", value: "10_20", score: 6 },
                    { label: "20+ Stunden", value: "20_plus", score: 8 },
                ],
            },
        ],
    },

    // ── Section 5: Daten & Infrastruktur ──────────────────────────
    {
        id: "data",
        title: "Daten & Infrastruktur",
        emoji: "💾",
        subtitle: "Welche Datenbasis steht zur Verfügung?",
        questions: [
            {
                id: "data_location",
                label: "Wo liegen Ihre Unternehmensdaten?",
                type: "multi",
                options: [
                    { label: "CRM-System", value: "crm", score: 3 },
                    { label: "ERP-System", value: "erp", score: 3 },
                    { label: "Excel / Google Sheets", value: "excel", score: 1 },
                    { label: "Cloud-Tools (SaaS)", value: "cloud", score: 2 },
                    { label: "Data Warehouse", value: "warehouse", score: 4 },
                    { label: "Verteilt / unklar", value: "distributed", score: 0 },
                ],
            },
            {
                id: "data_structure",
                label: "Wie strukturiert sind Ihre Daten?",
                type: "radio",
                scoreWeight: 1.5,
                options: [
                    { label: "Sehr strukturiert und zentral", value: "structured", score: 8 },
                    { label: "Teilweise strukturiert", value: "partial", score: 5 },
                    { label: "Größtenteils unstrukturiert", value: "unstructured", score: 2 },
                    { label: "Kaum Datenbasis vorhanden", value: "none", score: 0 },
                ],
            },
            {
                id: "internal_devs",
                label: "Haben Sie interne IT-/Entwickler-Kapazitäten?",
                type: "radio",
                scoreWeight: 1,
                options: [
                    { label: "Nein", value: "none", score: 0 },
                    { label: "1–2 Personen", value: "small", score: 3 },
                    { label: "Team von 3–10", value: "medium", score: 6 },
                    { label: "Große IT-Abteilung", value: "large", score: 8 },
                ],
            },
        ],
    },

    // ── Section 6: Marketing & Sichtbarkeit ───────────────────────
    {
        id: "marketing",
        title: "Marketing & Sichtbarkeit",
        emoji: "📡",
        subtitle: "Wie sichtbar ist Ihr Unternehmen digital?",
        questions: [
            {
                id: "channels",
                label: "Welche Marketing-Kanäle nutzen Sie?",
                type: "multi",
                options: [
                    { label: "Website / SEO", value: "website_seo", score: 2 },
                    { label: "Social Media (allgemein)", value: "social", score: 2 },
                    { label: "LinkedIn", value: "linkedin", score: 3 },
                    { label: "Instagram / TikTok", value: "instagram_tiktok", score: 2 },
                    { label: "YouTube", value: "youtube", score: 2 },
                    { label: "Reddit / Communities", value: "reddit", score: 2 },
                    { label: "Newsletter / E-Mail", value: "newsletter", score: 2 },
                    { label: "Paid Ads (Google, Meta etc.)", value: "paid_ads", score: 2 },
                ],
            },
            {
                id: "ki_visibility",
                label:
                    "Wird Ihr Unternehmen in KI-Suchsystemen (ChatGPT, Perplexity etc.) gefunden?",
                type: "radio",
                scoreWeight: 2,
                options: [
                    { label: "Ja, regelmäßig", value: "regular", score: 10 },
                    { label: "Teilweise", value: "partial", score: 6 },
                    { label: "Kaum", value: "rarely", score: 2 },
                    { label: "Weiß nicht", value: "unknown", score: 0 },
                ],
            },
            {
                id: "ki_visibility_importance",
                label: "Wie wichtig ist Ihnen die Sichtbarkeit in KI-Systemen?",
                type: "scale",
                scaleMin: "Unwichtig",
                scaleMax: "Sehr wichtig",
                options: [
                    { label: "1", value: "1", score: 1 },
                    { label: "2", value: "2", score: 2 },
                    { label: "3", value: "3", score: 3 },
                    { label: "4", value: "4", score: 4 },
                    { label: "5", value: "5", score: 5 },
                ],
            },
        ],
    },

    // ── Section 7: Mitarbeiter & Kompetenzen ──────────────────────
    {
        id: "employees",
        title: "Mitarbeiter & Kompetenzen",
        emoji: "🎓",
        subtitle: "Wie ist die KI-Kompetenz in Ihrem Team?",
        questions: [
            {
                id: "ki_affinity",
                label: "Wie hoch ist die KI-Affinität Ihrer Mitarbeiter?",
                type: "radio",
                scoreWeight: 1.5,
                options: [
                    { label: "Keine Erfahrung", value: "none", score: 0 },
                    { label: "Erste Experimente einzelner Personen", value: "experiments", score: 3 },
                    { label: "Einzelne KI-Experten im Unternehmen", value: "experts", score: 6 },
                    { label: "Mehrere Teams nutzen KI aktiv", value: "teams", score: 9 },
                    { label: "KI ist Teil der Unternehmenskultur", value: "culture", score: 12 },
                ],
            },
            {
                id: "ki_training",
                label: "Gibt es KI-Schulungen oder Weiterbildungen?",
                type: "radio",
                scoreWeight: 1,
                options: [
                    { label: "Nein", value: "none", score: 0 },
                    { label: "Vereinzelt / auf Eigeninitiative", value: "sporadic", score: 3 },
                    { label: "Geplant", value: "planned", score: 5 },
                    { label: "Regelmäßig für alle Mitarbeiter", value: "regular", score: 8 },
                ],
            },
        ],
    },

    // ── Section 8: Herausforderungen ──────────────────────────────
    {
        id: "challenges",
        title: "Herausforderungen",
        emoji: "🎯",
        subtitle: "Was sind Ihre größten Business-Herausforderungen?",
        questions: [
            {
                id: "challenges",
                label: "Welchen Herausforderungen stehen Sie gegenüber?",
                type: "multi",
                options: [
                    { label: "Fachkräftemangel", value: "talent_shortage" },
                    { label: "Zu viele manuelle Prozesse", value: "manual_processes" },
                    { label: "Steigende Kosten", value: "rising_costs" },
                    { label: "Langsame Abläufe", value: "slow_processes" },
                    { label: "Geringe digitale Sichtbarkeit", value: "low_visibility" },
                    { label: "Ineffiziente Kommunikation", value: "inefficient_comm" },
                    { label: "Wettbewerbsdruck", value: "competition" },
                ],
            },
            {
                id: "ki_lever",
                label: "In welchem Bereich hätte KI den größten Hebel?",
                type: "text",
                placeholder: "z.B. Kundenkommunikation, Datenanalyse...",
            },
        ],
    },

    // ── Section 9: Budget & Priorität ─────────────────────────────
    {
        id: "budget",
        title: "Budget & Priorität",
        emoji: "💰",
        subtitle: "Wie konkret sind Ihre KI-Pläne?",
        questions: [
            {
                id: "ki_budget",
                label: "Welches Budget steht für KI-Initiativen bereit?",
                type: "radio",
                options: [
                    { label: "Noch keines", value: "none", score: 0 },
                    { label: "Unter 10.000 €", value: "under_10k", score: 2 },
                    { label: "10.000–50.000 €", value: "10k_50k", score: 5 },
                    { label: "50.000–200.000 €", value: "50k_200k", score: 8 },
                    { label: "200.000 €+", value: "200k_plus", score: 10 },
                ],
            },
            {
                id: "ki_timeline",
                label: "Wann möchten Sie KI einsetzen?",
                type: "radio",
                options: [
                    { label: "Sofort / so schnell wie möglich", value: "asap", score: 10 },
                    { label: "Innerhalb der nächsten 3 Monate", value: "3_months", score: 7 },
                    { label: "Innerhalb von 12 Monaten", value: "12_months", score: 4 },
                    { label: "Noch offen", value: "open", score: 1 },
                ],
            },
        ],
    },

    // ── Section 10: Abschluss ─────────────────────────────────────
    {
        id: "closing",
        title: "Abschluss",
        emoji: "📊",
        subtitle: "Fast geschafft! Noch ein paar letzte Angaben.",
        questions: [
            {
                id: "want_analysis",
                label: "Möchten Sie eine persönliche Auswertung von unseren KI-Experten?",
                type: "radio",
                options: [
                    { label: "Ja, bitte!", value: "yes" },
                    { label: "Nein, danke", value: "no" },
                ],
            },
            {
                id: "contact_name",
                label: "Ihr Name",
                type: "text",
                required: true,
                placeholder: "Max Mustermann",
            },
            {
                id: "contact_email",
                label: "E-Mail-Adresse",
                type: "text",
                required: true,
                placeholder: "max@beispiel.de",
            },
            {
                id: "contact_phone",
                label: "Telefonnummer (optional)",
                type: "text",
                placeholder: "+49 ...",
            },
        ],
    },
];
