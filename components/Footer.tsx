"use client";

import { useState } from "react";
import { siteConfig } from "@/site.config";

function LegalModal({
    open,
    onClose,
    title,
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 sm:p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-futura font-bold text-xl text-brand-black">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function Footer() {
    const [modal, setModal] = useState<string | null>(null);
    const l = siteConfig.legal;

    return (
        <>
            <footer className="bg-brand-black text-white pt-12 sm:pt-16 pb-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2.5 mb-4">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg text-brand-green font-futura font-bold text-xs">
                                    KI
                                </span>
                                <span className="font-futura font-semibold text-sm">
                                    {siteConfig.siteName}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {siteConfig.description}
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-futura font-semibold text-sm mb-4">Kontakt</h3>
                            <div className="space-y-2 text-sm text-gray-400">
                                <p>{l.companyName}</p>
                                <p>{l.street}</p>
                                <p>
                                    {l.zip} {l.city}
                                </p>
                                <p>
                                    <a href={`tel:${l.phone}`} className="hover:text-brand-green transition-colors">
                                        {l.phone}
                                    </a>
                                </p>
                                <p>
                                    <a href={`mailto:${l.email}`} className="hover:text-brand-green transition-colors">
                                        {l.email}
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="font-futura font-semibold text-sm mb-4">Rechtliches</h3>
                            <div className="space-y-2 text-sm">
                                {[
                                    { key: "impressum", label: "Impressum" },
                                    { key: "datenschutz", label: "Datenschutzerklärung" },
                                    { key: "agb", label: "AGB" },
                                    { key: "disclaimer", label: "Disclaimer" },
                                ].map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => setModal(item.key)}
                                        className="block text-gray-400 hover:text-brand-green transition-colors"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} {l.companyName}. Alle Rechte vorbehalten.
                    </div>
                </div>
            </footer>

            {/* ── LEGAL MODALS ─────────────────────────────────────── */}

            <LegalModal open={modal === "impressum"} onClose={() => setModal(null)} title="Impressum">
                <p><strong>Angaben gemäß § 5 TMG:</strong></p>
                <p>{l.companyName}<br />{l.street}<br />{l.zip} {l.city}<br />{l.country}</p>
                <p><strong>Vertreten durch:</strong><br />Geschäftsführer: {l.managingDirector}</p>
                <p><strong>Kontakt:</strong><br />Telefon: {l.phone}<br />E-Mail: {l.email}</p>
                <p><strong>Registereintrag:</strong><br />Eintragung im Handelsregister.<br />Registergericht: {l.registerCourt}<br />Registernummer: {l.registerNumber}</p>
                <p><strong>Umsatzsteuer-ID:</strong><br />Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />{l.vatId}</p>
                <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />{l.responsibleContent}<br />{l.street}<br />{l.zip} {l.city}</p>
            </LegalModal>

            <LegalModal open={modal === "datenschutz"} onClose={() => setModal(null)} title="Datenschutzerklärung">
                <p><strong>1. Datenschutz auf einen Blick</strong></p>
                <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
                <p><strong>2. Datenerfassung auf dieser Website</strong></p>
                <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber: {l.companyName}, {l.street}, {l.zip} {l.city}. Telefon: {l.phone}, E-Mail: {l.email}.</p>
                <p><strong>3. Fragebogen-Daten</strong></p>
                <p>Wenn Sie unseren KI-Readiness Check ausfüllen, werden Ihre Angaben auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) bzw. Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) verarbeitet. Die Daten werden ausschließlich zur Berechnung Ihres KI-Reifegrad-Scores und zur optionalen Kontaktaufnahme verwendet.</p>
                <p><strong>4. E-Mail-Kommunikation</strong></p>
                <p>Wenn Sie uns Ihre E-Mail-Adresse im Rahmen des Checks mitteilen, verwenden wir diese zur Zusendung Ihrer Ergebnisse und ggf. weiterführender Informationen. Sie können diese Kommunikation jederzeit durch eine formlose Nachricht an {l.email} abbestellen.</p>
                <p><strong>5. Hosting</strong></p>
                <p>Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA gehostet. Details zur Datenverarbeitung finden Sie in der Datenschutzerklärung von Vercel: https://vercel.com/legal/privacy-policy.</p>
                <p><strong>6. Ihre Rechte</strong></p>
                <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Richten Sie Ihre Anfrage an: {l.email}.</p>
            </LegalModal>

            <LegalModal open={modal === "agb"} onClose={() => setModal(null)} title="Allgemeine Geschäftsbedingungen">
                <p><strong>§ 1 Geltungsbereich</strong></p>
                <p>Diese AGB gelten für die Nutzung des KI-Readiness Checks auf {siteConfig.domain}, betrieben von {l.companyName}.</p>
                <p><strong>§ 2 Leistungsbeschreibung</strong></p>
                <p>Der KI-Readiness Check ist ein kostenloser Online-Fragebogen, der den KI-Reifegrad eines Unternehmens analysiert und Handlungsempfehlungen generiert. Die Nutzung ist unverbindlich.</p>
                <p><strong>§ 3 Haftungsausschluss</strong></p>
                <p>Die Ergebnisse des KI-Readiness Checks basieren auf algorithmischen Schätzungen und stellen keine professionelle Beratung dar. Die berechneten Kennzahlen (insbesondere das Einsparpotenzial) sind Näherungswerte und keine Garantien.</p>
                <p><strong>§ 4 Urheberrecht</strong></p>
                <p>Die auf dieser Website erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung oder Verbreitung bedarf der schriftlichen Zustimmung von {l.companyName}.</p>
                <p><strong>§ 5 Gerichtsstand</strong></p>
                <p>Gerichtsstand für alle Streitigkeiten ist Berlin, sofern gesetzlich zulässig.</p>
            </LegalModal>

            <LegalModal open={modal === "disclaimer"} onClose={() => setModal(null)} title="Disclaimer">
                <p><strong>Haftung für Inhalte</strong></p>
                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.</p>
                <p><strong>Haftung für Links</strong></p>
                <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.</p>
                <p><strong>KI-Readiness-Ergebnisse</strong></p>
                <p>Die Ergebnisse des KI-Readiness Checks sind algorithmisch generierte Schätzungen. Sie basieren auf den von Ihnen gemachten Angaben und allgemeinen Branchenvergleichswerten. Die tatsächlichen Potenziale können erheblich abweichen. Die Ergebnisse stellen keine professionelle Unternehmensberatung dar.</p>
            </LegalModal>
        </>
    );
}
