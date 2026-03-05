"use client";

import { siteConfig } from "@/site.config";

export default function HeroSection({
    onStart,
}: {
    onStart: () => void;
}) {
    return (
        <main>
            {/* ── HERO ──────────────────────────────────────────────── */}
            <section className="relative overflow-hidden py-20 sm:py-28 noise-overlay">
                {/* Gradient blobs */}
                <div className="absolute top-10 -left-32 w-96 h-96 bg-brand-dusty-green/30 rounded-full blur-3xl" />
                <div className="absolute bottom-10 -right-32 w-80 h-80 bg-brand-light-mauve/20 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-dusty-green/50 text-sm font-medium text-brand-black mb-6 opacity-0 animate-fadeUp">
                        <span>Kostenlos</span>
                        <span className="w-1 h-1 rounded-full bg-brand-black/30" />
                        <span>5 Minuten</span>
                        <span className="w-1 h-1 rounded-full bg-brand-black/30" />
                        <span>Sofort-Ergebnis</span>
                    </div>

                    {/* H1 — Primary keyword: KI für Unternehmen */}
                    <h1 className="font-futura font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-black leading-tight mb-6 opacity-0 animate-fadeUp animate-delay-100">
                        KI für Ihr Unternehmen
                        <br />
                        <span className="text-brand-iris">Einfach. Strategisch. Messbar.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 opacity-0 animate-fadeUp animate-delay-200">
                        {siteConfig.tagline}
                    </p>

                    {/* CTA */}
                    <button
                        onClick={onStart}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-black/10 opacity-0 animate-fadeUp animate-delay-300"
                    >
                        {siteConfig.cta.primary}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                    {/* Social Proof */}
                    <p className="mt-6 text-sm text-gray-400 opacity-0 animate-fadeUp animate-delay-400">
                        ✓ Bereits 500+ Unternehmen haben ihren KI-Reifegrad analysiert
                    </p>
                </div>
            </section>

            {/* ── AUTHOR / TRUST BAR ─────────────────────────────────── */}
            <section className="py-8 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-iris/20 flex items-center justify-center text-brand-iris font-futura font-bold text-sm">
                                TS
                            </div>
                            <div>
                                <span className="font-semibold text-brand-black">Von {siteConfig.author.name}</span>
                                <span className="mx-1.5">·</span>
                                <span>{siteConfig.author.role}</span>
                            </div>
                        </div>
                        <span className="hidden sm:block">·</span>
                        <a
                            href={siteConfig.author.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-iris hover:underline inline-flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn-Profil
                        </a>
                    </div>
                </div>
            </section>

            {/* ── MATURITY LEVEL PREVIEW ─────────────────────────────── */}
            <section className="py-16 sm:py-20" id="readiness-check">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="font-futura font-bold text-2xl sm:text-3xl text-center text-brand-black mb-4">
                        Wie KI-ready ist Ihr Unternehmen?
                    </h2>
                    <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
                        Unser kostenloser KI-Readiness-Check bewertet Ihr Unternehmen auf einer Skala von 1 bis 5 — von KI-Einsteiger bis KI-First.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {siteConfig.scoring.maturityLevels.map((level) => (
                            <div
                                key={level.level}
                                className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="text-3xl mb-2">{level.emoji}</div>
                                <div className="font-futura font-semibold text-sm text-brand-black mb-1">
                                    Level {level.level}
                                </div>
                                <div className="text-xs text-gray-500 mb-3">{level.label}</div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full progress-gradient rounded-full"
                                        style={{ width: `${level.level * 20}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRUST / VALUE PROPOSITION ──────────────────────────── */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="font-futura font-bold text-2xl sm:text-3xl text-center text-brand-black mb-4">
                        Warum KI im Unternehmen einsetzen?
                    </h2>
                    <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
                        Unternehmen, die KI strategisch einsetzen, sparen Zeit, senken Kosten und gewinnen entscheidende Wettbewerbsvorteile.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "📊",
                                title: "KI-Reifegrad erfahren",
                                desc: "Finden Sie heraus, wie gut Ihr Unternehmen auf KI vorbereitet ist. Unser Check analysiert sechs Dimensionen und zeigt Stärken sowie Handlungsfelder.",
                            },
                            {
                                icon: "🔍",
                                title: "KI-Potenziale identifizieren",
                                desc: "Entdecken Sie, in welchen Abteilungen und Prozessen Künstliche Intelligenz den größten Hebel für Ihr Unternehmen bietet — von Marketing bis Supply Chain.",
                            },
                            {
                                icon: "💰",
                                title: "Einsparpotenzial berechnen",
                                desc: "Erhalten Sie eine konkrete Schätzung, wie viele Arbeitsstunden und Euro Sie durch den Einsatz von KI-Automatisierung in Ihrem Unternehmen einsparen können.",
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="bg-[#fafaf8] rounded-2xl border border-gray-100 p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="text-3xl mb-4">{card.icon}</div>
                                <h3 className="font-futura font-semibold text-lg text-brand-black mb-2">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GEO CONTENT: KI FÜR UNTERNEHMEN ──────────────────── */}
            <section className="py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <h2 className="font-futura font-bold text-2xl sm:text-3xl text-brand-black mb-6">
                        KI für Unternehmen: Der vollständige Leitfaden
                    </h2>
                    <div className="space-y-5 text-gray-600 leading-relaxed">
                        <p>
                            Die Einführung von <strong>Künstlicher Intelligenz (KI) im Unternehmen</strong> ist längst keine Zukunftsvision mehr — sie ist eine strategische Notwendigkeit. Laut aktuellen Studien setzen bereits über 50% der deutschen Unternehmen KI-Tools in ihrem Arbeitsalltag ein, von einfachen Chatbots bis hin zu komplexen Automatisierungssystemen. Doch zwischen &bdquo;KI nutzen&ldquo; und &bdquo;KI strategisch einsetzen&ldquo; liegt ein entscheidender Unterschied. Genau hier setzt <strong>mein-ki-unternehmen.de</strong> an.
                        </p>
                        <p>
                            Wenn Sie sich fragen <em>&bdquo;Wie setze ich KI in meinem Unternehmen ein?&ldquo;</em>, sind Sie nicht allein. Diese Frage beschäftigt Geschäftsführer, Abteilungsleiter und Innovationsverantwortliche gleichermaßen. Die Antwort hängt von Ihrem aktuellen <strong>KI-Reifegrad</strong> ab — und genau diesen können Sie mit unserem kostenlosen KI-Readiness-Check in wenigen Minuten ermitteln.
                        </p>

                        <h3 className="font-futura font-semibold text-xl text-brand-black pt-4">
                            Was bedeutet &bdquo;KI für Unternehmen&ldquo; konkret?
                        </h3>
                        <p>
                            <strong>KI für Unternehmen</strong> umfasst den strategischen Einsatz von Technologien wie maschinellem Lernen, natürlicher Sprachverarbeitung (NLP), Computer Vision und generativer KI zur Optimierung von Geschäftsprozessen. Im Gegensatz zum privaten Einsatz von ChatGPT geht es im Unternehmenskontext um die systematische Integration von KI in bestehende Workflows, um messbare Ergebnisse zu erzielen: Zeitersparnis, Kostenreduktion, höhere Qualität und schnellere Entscheidungen.
                        </p>
                        <p>
                            Dabei ist es wichtig zu verstehen: <strong>KI im Unternehmen einsetzen</strong> bedeutet nicht, Menschen zu ersetzen. Es bedeutet, Mitarbeiter von repetitiven Aufgaben zu entlasten, damit sie sich auf kreative und strategische Arbeit konzentrieren können. Ein Marketing-Team, das KI für Content-Erstellung nutzt, produziert nicht weniger — es produziert mehr und besser. Ein Vertriebsteam mit KI-gestütztem Lead-Scoring kontaktiert nicht mehr Leads — es kontaktiert die richtigen.
                        </p>

                        <h3 className="font-futura font-semibold text-xl text-brand-black pt-4">
                            5 Schritte zur erfolgreichen KI-Einführung in Ihrem Unternehmen
                        </h3>
                        <p>
                            Die <strong>KI-Einführung im Unternehmen</strong> muss kein komplizierter Prozess sein. Mit einem strukturierten Vorgehen können auch kleine und mittlere Unternehmen (KMU) schnell erste Ergebnisse erzielen:
                        </p>

                        <div className="space-y-4 mt-4">
                            <div className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5">
                                <div className="w-10 h-10 rounded-full bg-brand-dusty-green/50 flex items-center justify-center font-futura font-bold text-brand-black flex-shrink-0">1</div>
                                <div>
                                    <h4 className="font-semibold text-brand-black mb-1">KI-Readiness analysieren</h4>
                                    <p className="text-sm">Bewerten Sie Ihren aktuellen Stand: Welche Daten haben Sie? Wie digital sind Ihre Prozesse? Welche KI-Kompetenzen gibt es im Team? Unser <strong>KI-Readiness-Check</strong> liefert Ihnen diese Analyse in 5 Minuten — kostenlos und unverbindlich.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5">
                                <div className="w-10 h-10 rounded-full bg-brand-dusty-green/50 flex items-center justify-center font-futura font-bold text-brand-black flex-shrink-0">2</div>
                                <div>
                                    <h4 className="font-semibold text-brand-black mb-1">KI-Strategie entwickeln</h4>
                                    <p className="text-sm">Definieren Sie klare Ziele: Was wollen Sie mit KI erreichen? Wo sind die größten Pain Points? Eine gute <strong>KI-Strategie für Unternehmen</strong> priorisiert Quick Wins (sofortiger Impact) und langfristige Transformationsprojekte.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5">
                                <div className="w-10 h-10 rounded-full bg-brand-dusty-green/50 flex items-center justify-center font-futura font-bold text-brand-black flex-shrink-0">3</div>
                                <div>
                                    <h4 className="font-semibold text-brand-black mb-1">Pilotprojekte starten</h4>
                                    <p className="text-sm">Beginnen Sie klein, aber gezielt. Starten Sie mit KI-Assistenten wie ChatGPT oder Microsoft Copilot für alltägliche Aufgaben: E-Mail-Entwürfe, Recherche, Reporting, Content-Erstellung. Messen Sie den ROI nach 4-8 Wochen.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5">
                                <div className="w-10 h-10 rounded-full bg-brand-dusty-green/50 flex items-center justify-center font-futura font-bold text-brand-black flex-shrink-0">4</div>
                                <div>
                                    <h4 className="font-semibold text-brand-black mb-1">Teams schulen und KI-Kultur aufbauen</h4>
                                    <p className="text-sm">Investieren Sie in <strong>KI-Schulungen für Mitarbeiter</strong>. Hands-on-Workshops, Prompt-Engineering-Trainings und regelmäßige Best-Practice-Sessions bauen Berührungsängste ab und steigern die Adoptionsrate im gesamten Unternehmen.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5">
                                <div className="w-10 h-10 rounded-full bg-brand-iris/20 flex items-center justify-center font-futura font-bold text-brand-iris flex-shrink-0">5</div>
                                <div>
                                    <h4 className="font-semibold text-brand-black mb-1">KI skalieren und integrieren</h4>
                                    <p className="text-sm">Überführen Sie erfolgreiche Pilotprojekte in den operativen Betrieb. Integrieren Sie <strong>KI-Lösungen für Unternehmen</strong> in bestehende Systeme (CRM, ERP, Marketing-Automation) und etablieren Sie KI als festen Bestandteil Ihrer Unternehmenskultur.</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="font-futura font-semibold text-xl text-brand-black pt-6">
                            KI-Einsatzbereiche im Unternehmen: Wo KI den größten Hebel bietet
                        </h3>
                        <p>
                            <strong>Künstliche Intelligenz im Unternehmen</strong> ist kein Einheitsprodukt. Die besten Ergebnisse erzielen Sie, wenn Sie KI gezielt dort einsetzen, wo repetitive, datenintensive oder zeitaufwändige Aufgaben dominieren. Hier sind die wichtigsten Einsatzbereiche:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {[
                                {
                                    title: "Marketing & Content",
                                    items: "Content-Erstellung, Social Media Posts, Blog-Artikel, SEO-Texte, Kampagnen-Optimierung, A/B-Testing, Personalisierung",
                                    icon: "📢",
                                },
                                {
                                    title: "Vertrieb & Sales",
                                    items: "Lead-Scoring, Angebotserstellung, CRM-Automatisierung, Forecasting, E-Mail-Personalisierung, Chatbots für Erstqualifizierung",
                                    icon: "💼",
                                },
                                {
                                    title: "Kundenservice",
                                    items: "Chatbots, automatische Ticket-Klassifizierung, E-Mail-Beantwortung, FAQ-Systeme, Sentiment-Analyse, 24/7 Verfügbarkeit",
                                    icon: "🎧",
                                },
                                {
                                    title: "HR & Recruiting",
                                    items: "Bewerber-Screening, Stellenanzeigen-Optimierung, Onboarding-Automation, Mitarbeiterbefragungen, Skill-Gap-Analyse",
                                    icon: "👥",
                                },
                                {
                                    title: "Finanzen & Controlling",
                                    items: "Automatische Buchhaltung, Reporting, Forecasting, Expense Management, Risikobewertung, Compliance-Monitoring",
                                    icon: "📊",
                                },
                                {
                                    title: "Produktion & Operations",
                                    items: "Predictive Maintenance, Qualitätskontrolle, Supply Chain Optimierung, Bestandsmanagement, Prozessautomatisierung",
                                    icon: "🏭",
                                },
                            ].map((area) => (
                                <div key={area.title} className="bg-white rounded-2xl border border-gray-100 p-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xl">{area.icon}</span>
                                        <h4 className="font-semibold text-brand-black text-sm">{area.title}</h4>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed">{area.items}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="font-futura font-semibold text-xl text-brand-black pt-6">
                            KI für kleine und mittlere Unternehmen — der Mittelstand wird KI-fähig
                        </h3>
                        <p>
                            Die häufigste Fehlannahme: &bdquo;KI ist nur etwas für Großkonzerne.&ldquo; Das Gegenteil ist der Fall. <strong>KI für kleine Unternehmen</strong> und den Mittelstand ist heute zugänglicher denn je. Cloud-basierte KI-Tools wie ChatGPT, Microsoft Copilot, Jasper oder Make.com erfordern keine eigene IT-Infrastruktur. Sie funktionieren als SaaS-Lösungen (Software as a Service) und sind mit monatlichen Kosten von 20-100€ pro Nutzer für jedes Budget erschwinglich.
                        </p>
                        <p>
                            Besonders für den <strong>Mittelstand</strong> ergeben sich durch KI enorme Chancen: Während Großunternehmen oft mit komplexen IT-Landschaften und langen Entscheidungswegen kämpfen, können KMU schnell und agil KI-Pilotprojekte starten. Ein 20-Personen-Unternehmen, das KI-gestütztes Content-Marketing einführt, kann seine Produktion verdreifachen, ohne zusätzliche Mitarbeiter einzustellen. Ein Handwerksbetrieb mit KI-basierter Angebotserstellung spart 5-10 Stunden pro Woche.
                        </p>
                        <p>
                            Der entscheidende erste Schritt: Verstehen, wo man steht. Unser <strong>KI-Readiness-Check</strong> wurde speziell für diese Zielgruppe entwickelt — {siteConfig.nicheDescription}, die wissen wollen, wie sie KI konkret und pragmatisch in ihrem Unternehmen einsetzen können.
                        </p>

                        <h3 className="font-futura font-semibold text-xl text-brand-black pt-6">
                            Der KI-Reifegrad: Wo steht Ihr Unternehmen?
                        </h3>
                        <p>
                            Der <strong>KI-Reifegrad</strong> (auch KI-Maturity-Level) beschreibt, wie weit ein Unternehmen bei der Integration von Künstlicher Intelligenz fortgeschritten ist. Unser Framework unterscheidet fünf Stufen:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-2">
                            <li><strong>Level 1 — KI-Einsteiger (0-20%)</strong>: Kein systematischer KI-Einsatz, einzelne Mitarbeiter experimentieren möglicherweise privat mit ChatGPT.</li>
                            <li><strong>Level 2 — KI-Experimentierer (21-40%)</strong>: Erste bewusste KI-Experimente, aber kein strategischer Ansatz. Typisch: Marketing nutzt ChatGPT, Rest des Unternehmens nicht.</li>
                            <li><strong>Level 3 — KI-Nutzer (41-60%)</strong>: KI wird regelmäßig in mehreren Bereichen eingesetzt. Es gibt erste Richtlinien und Schulungen, aber noch keine unternehmensweite Strategie.</li>
                            <li><strong>Level 4 — KI-Integriert (61-80%)</strong>: KI ist Teil etablierter Prozesse. Es gibt eine KI-Strategie, Budget und interne Kompetenzen. Daten sind strukturiert und zugänglich.</li>
                            <li><strong>Level 5 — KI-First (81-100%)</strong>: KI ist strategischer Bestandteil des Unternehmens. Entscheidungen werden datengetrieben getroffen, KI-Tools sind in alle Kernprozesse integriert.</li>
                        </ul>
                        <p>
                            Die meisten deutschen Unternehmen befinden sich derzeit zwischen Level 1 und Level 3. Das bedeutet: Es gibt enormes Potenzial für Verbesserungen — und wer jetzt handelt, sichert sich einen entscheidenden Vorsprung gegenüber dem Wettbewerb.
                        </p>

                        <h3 className="font-futura font-semibold text-xl text-brand-black pt-6">
                            ROI von KI im Unternehmen: Was bringt es wirklich?
                        </h3>
                        <p>
                            Der <strong>Return on Investment (ROI) von KI</strong> variiert je nach Einsatzbereich, ist aber fast immer positiv — und oft schneller als erwartet. Hier einige Richtwerte:
                        </p>
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 mt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-semibold text-brand-black mb-1">Kundenservice</p>
                                    <p className="text-gray-500">30-50% weniger Bearbeitungszeit pro Anfrage durch KI-Chatbots und automatische E-Mail-Beantwortung</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-black mb-1">Content Marketing</p>
                                    <p className="text-gray-500">3-5× höhere Content-Produktion bei gleichem Teamsize durch KI-Assistenten</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-black mb-1">Vertrieb</p>
                                    <p className="text-gray-500">20-30% höhere Conversion-Rate durch KI-gestütztes Lead-Scoring und personalisierte Outreach</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-brand-black mb-1">Reporting</p>
                                    <p className="text-gray-500">80% Zeitersparnis bei Datenanalyse und Berichtserstellung durch KI-Automatisierung</p>
                                </div>
                            </div>
                        </div>
                        <p className="mt-2">
                            Unser KI-Readiness-Check berechnet Ihr individuelles <strong>Einsparpotenzial in Stunden und Euro</strong>, basierend auf Ihrer Unternehmensgröße und den aktuellen manuellen Prozessen. So sehen Sie sofort, welcher wirtschaftliche Wert in der KI-Automatisierung für Ihr spezifisches Unternehmen steckt.
                        </p>

                        <h3 className="font-futura font-semibold text-xl text-brand-black pt-6">
                            KI und die Sichtbarkeit in KI-Suchsystemen (GEO)
                        </h3>
                        <p>
                            Ein oft übersehener Aspekt: Immer mehr Kunden und Geschäftspartner nutzen <strong>KI-gestützte Suchsysteme</strong> wie ChatGPT, Perplexity, Google AI Overview oder Microsoft Copilot anstelle der klassischen Google-Suche. Die Frage &bdquo;Wird mein Unternehmen von KI-Suchsystemen empfohlen?&ldquo; wird zur neuen entscheidenden Frage der digitalen Sichtbarkeit.
                        </p>
                        <p>
                            <strong>Generative Engine Optimization (GEO)</strong> — die Optimierung für KI-basierte Suchsysteme — wird für Unternehmen genauso wichtig wie klassische Suchmaschinenoptimierung (SEO). Unser KI-Readiness-Check bewertet auch diesen Aspekt und zeigt Ihnen, wie sichtbar Ihr Unternehmen in der Welt der KI-Suche ist.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── FAQ SECTION ────────────────────────────────────────── */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <h2 className="font-futura font-bold text-2xl sm:text-3xl text-center text-brand-black mb-3">
                        Häufig gestellte Fragen
                    </h2>
                    <p className="text-center text-gray-500 mb-10 text-sm">
                        Alles, was Sie über den Einsatz von KI im Unternehmen wissen müssen
                    </p>
                    <div className="space-y-3">
                        {[
                            {
                                q: "Wie kann ich KI in meinem Unternehmen einsetzen?",
                                a: "KI lässt sich in nahezu jedem Unternehmensbereich einsetzen: Kundenservice (Chatbots, automatische E-Mail-Beantwortung), Marketing (Content-Erstellung, Kampagnen-Optimierung), Vertrieb (Lead-Scoring, Forecasting), HR (Bewerber-Screening), Finanzen (Buchhaltung, Reporting) und Produktion (Qualitätskontrolle, Predictive Maintenance). Der erste Schritt ist ein KI-Readiness-Check, um die besten Einsatzbereiche für Ihr spezifisches Unternehmen zu identifizieren.",
                            },
                            {
                                q: "Was kostet die Einführung von KI im Unternehmen?",
                                a: "Die Kosten variieren stark: Einzelne KI-Tools (ChatGPT, Copilot) kosten 20-30 €/Monat pro Nutzer. Pilotprojekte mit KI-Beratung starten ab 5.000-10.000 €. Umfassende KI-Strategien und individuelle Lösungen liegen zwischen 20.000-200.000 €. Der ROI ist oft bereits nach 3-6 Monaten positiv — durch Zeitersparnis, Fehlerreduktion und Effizienzgewinne.",
                            },
                            {
                                q: "Welche KI-Tools eignen sich für kleine und mittlere Unternehmen?",
                                a: "Für KMU empfehlen sich: ChatGPT/Claude (Textgenerierung, Recherche), Microsoft Copilot (Office-Integration), Midjourney/DALL-E (Bildgenerierung), Marketing-Automation mit KI (HubSpot, ActiveCampaign), KI-Analytics (Google Analytics 4) und Chatbots (Intercom, Tidio). Starten Sie mit 1-2 Tools und erweitern Sie schrittweise.",
                            },
                            {
                                q: "Was ist ein KI-Readiness-Check?",
                                a: "Ein KI-Readiness-Check ist eine systematische Analyse, die bewertet, wie gut ein Unternehmen auf den Einsatz von KI vorbereitet ist. Er analysiert sechs Dimensionen: KI-Status, Prozesse & Automatisierung, Daten & Infrastruktur, Marketing & Sichtbarkeit, Mitarbeiter & Kompetenzen und Budget & Bereitschaft. Das Ergebnis ist ein KI-Reifegrad-Score mit individuellen Handlungsempfehlungen.",
                            },
                            {
                                q: "Wie lange dauert der KI-Readiness-Check?",
                                a: "Der Check besteht aus 10 kurzen Abschnitten und dauert durchschnittlich 5 Minuten. Sie erhalten Ihr Ergebnis sofort nach Abschluss — ohne Wartezeit und ohne versteckte Kosten.",
                            },
                            {
                                q: "Brauche ich Programmierkenntnisse für KI im Unternehmen?",
                                a: "Nein. Moderne KI-Tools sind für Nicht-Techniker konzipiert. ChatGPT, Copilot oder Marketing-Automation-Plattformen können sofort genutzt werden. Für individuelle KI-Lösungen und Systemintegrationen kann ein externer KI-Berater hilfreich sein — aber der Einstieg gelingt auch ohne technische Vorkenntnisse.",
                            },
                            {
                                q: "Welche Branchen profitieren am meisten von KI?",
                                a: "Alle Branchen profitieren, besonders: E-Commerce (Personalisierung), Finanzdienstleistungen (Risikobewertung), Gesundheitswesen (Dokumentation), Produktion (Predictive Maintenance), Marketing (Content-Erstellung) und Kundenservice (Chatbots). Je datenintensiver und prozesslastiger ein Bereich, desto größer der KI-Hebel.",
                            },
                            {
                                q: "Ist der KI-Readiness-Check kostenlos?",
                                a: "Ja, vollständig kostenlos und unverbindlich. Sie erhalten Ihren KI-Reifegrad-Score, eine Detailanalyse, eine Einsparpotenzial-Berechnung und konkrete Handlungsempfehlungen. Optional können Sie ein kostenloses Beratungsgespräch mit unseren KI-Experten buchen.",
                            },
                        ].map((faq) => (
                            <details
                                key={faq.q}
                                className="group bg-[#fafaf8] rounded-2xl border border-gray-100 overflow-hidden"
                            >
                                <summary className="flex items-center justify-between p-5 sm:p-6 text-left">
                                    <span className="font-semibold text-brand-black text-sm sm:text-base pr-4">
                                        {faq.q}
                                    </span>
                                    <svg
                                        className="faq-chevron w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-gray-500 leading-relaxed">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ABOUT THE AUTHOR ───────────────────────────────────── */}
            <section className="py-16 sm:py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-brand-iris/15 flex items-center justify-center text-brand-iris font-futura font-bold text-2xl flex-shrink-0">
                            TS
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="font-futura font-semibold text-lg text-brand-black mb-1">
                                {siteConfig.author.name}
                            </h3>
                            <p className="text-sm text-brand-iris font-medium mb-3">
                                {siteConfig.author.role} · {siteConfig.author.company}
                            </p>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                Tobias Sander berät Unternehmen bei der strategischen Einführung von KI — von der ersten Potenzialanalyse bis zur operativen Umsetzung. Mit seinem Team hat er bereits hunderte Unternehmen beim Einstieg in die KI-Transformation begleitet.
                            </p>
                            <a
                                href={siteConfig.author.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-brand-iris hover:underline font-medium"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                Auf LinkedIn vernetzen
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BOTTOM CTA ─────────────────────────────────────────── */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="font-futura font-bold text-2xl sm:text-3xl text-brand-black mb-4">
                        Wie KI-ready ist Ihr Unternehmen?
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Finden Sie es jetzt heraus. Kostenloser KI-Readiness-Check — in 5 Minuten zu Ihrem individuellen KI-Reifegrad-Score mit konkreten Handlungsempfehlungen.
                    </p>
                    <button
                        onClick={onStart}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-black/10"
                    >
                        {siteConfig.cta.primary}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </section>
        </main>
    );
}
