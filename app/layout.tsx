import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.linkedin }],
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.siteName,
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  alternates: {
    canonical: `https://${siteConfig.domain}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ── WebApplication Schema ─────────────────────────────────
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.siteName,
    description: siteConfig.description,
    url: `https://${siteConfig.domain}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Kostenloser KI-Readiness-Check für Unternehmen",
    },
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.role,
      url: siteConfig.author.linkedin,
      sameAs: [siteConfig.author.linkedin],
      worksFor: {
        "@type": "Organization",
        name: siteConfig.legal.companyName,
      },
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.legal.companyName,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.legal.street,
        postalCode: siteConfig.legal.zip,
        addressLocality: siteConfig.legal.city,
        addressCountry: "DE",
      },
      telephone: siteConfig.legal.phone,
      email: siteConfig.legal.email,
    },
  };

  // ── HowTo Schema ─────────────────────────────────────────
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "KI im Unternehmen einsetzen — Schritt für Schritt",
    description:
      "Anleitung zur erfolgreichen KI-Einführung in Ihrem Unternehmen: Vom Status-Quo über die Strategieentwicklung bis zur operativen Umsetzung.",
    totalTime: "P3M",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.author.linkedin,
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "KI-Readiness analysieren",
        text: "Führen Sie einen KI-Readiness-Check durch, um den aktuellen Status Ihres Unternehmens zu bewerten. Analysieren Sie vorhandene Daten, Prozesse, IT-Infrastruktur und Mitarbeiterkompetenzen.",
        url: `https://${siteConfig.domain}/#readiness-check`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "KI-Strategie entwickeln",
        text: "Definieren Sie eine KI-Strategie mit konkreten Zielen, messbaren KPIs und einem realistischen Zeitplan. Identifizieren Sie Quick Wins und langfristige Transformationsprojekte.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Pilotprojekte starten",
        text: "Beginnen Sie mit überschaubaren KI-Pilotprojekten in Bereichen mit hohem ROI-Potenzial. Starten Sie mit KI-Assistenten wie ChatGPT für Textgenerierung, Kundenservice oder Datenanalyse.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Teams schulen und KI-Kompetenz aufbauen",
        text: "Investieren Sie in KI-Schulungen für Ihre Mitarbeiter. Regelmäßige Workshops und Hands-on-Trainings bauen Berührungsängste ab und steigern die Adoptionsrate.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "KI skalieren und integrieren",
        text: "Überführen Sie erfolgreiche Pilotprojekte in den operativen Betrieb. Integrieren Sie KI-Lösungen in bestehende Workflows und Systeme (CRM, ERP, Marketing-Automation).",
      },
    ],
  };

  // ── FAQ Schema ────────────────────────────────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Wie kann ich KI in meinem Unternehmen einsetzen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "KI lässt sich in nahezu jedem Unternehmensbereich einsetzen: Kundenservice (Chatbots, automatische E-Mail-Beantwortung), Marketing (Content-Erstellung, Kampagnen-Optimierung), Vertrieb (Lead-Scoring, Forecasting), HR (Bewerber-Screening), Finanzen (Buchhaltung, Reporting) und Produktion (Qualitätskontrolle, Predictive Maintenance). Starten Sie mit einem KI-Readiness-Check, um die besten Einsatzbereiche für Ihr Unternehmen zu identifizieren.",
        },
      },
      {
        "@type": "Question",
        name: "Was kostet die Einführung von KI im Unternehmen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die Kosten für KI-Einführung variieren stark: Einzelne KI-Tools (ChatGPT, Copilot) kosten 20-30€/Monat pro Nutzer. Pilotprojekte mit KI-Beratung starten ab 5.000-10.000€. Umfassende KI-Strategien und individuelle Lösungen liegen zwischen 20.000-200.000€. Der ROI ist oft bereits nach 3-6 Monaten positiv — durch Zeitersparnis, Fehlerreduktion und höhere Effizienz.",
        },
      },
      {
        "@type": "Question",
        name: "Welche KI-Tools eignen sich für kleine und mittlere Unternehmen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Für KMU empfehlen sich: ChatGPT/Claude (Textgenerierung, Recherche, E-Mail), Microsoft Copilot (Office-Integration), Midjourney/DALL-E (Bildgenerierung), Marketing-Automation-Tools mit KI (HubSpot, ActiveCampaign), KI-gestützte Analytics (Google Analytics 4, Hotjar) und Chatbots für den Kundenservice (Intercom, Tidio). Starten Sie mit 1-2 Tools und erweitern Sie schrittweise.",
        },
      },
      {
        "@type": "Question",
        name: "Was ist ein KI-Readiness-Check für Unternehmen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ein KI-Readiness-Check ist eine systematische Analyse, die bewertet, wie gut ein Unternehmen auf den Einsatz von Künstlicher Intelligenz vorbereitet ist. Der Check analysiert sechs Dimensionen: aktueller KI-Status, Prozesse & Automatisierung, Daten & Infrastruktur, Marketing & Sichtbarkeit, Mitarbeiter & Kompetenzen sowie Budget & Bereitschaft. Das Ergebnis ist ein KI-Reifegrad-Score mit konkreten Handlungsempfehlungen.",
        },
      },
      {
        "@type": "Question",
        name: "Wie lange dauert eine KI-Einführung im Unternehmen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quick Wins (Einsatz von KI-Assistenten wie ChatGPT) können innerhalb von 1-2 Wochen umgesetzt werden. Pilotprojekte dauern typischerweise 4-8 Wochen. Eine umfassende KI-Strategie mit Integration in bestehende Systeme dauert 3-6 Monate. Die vollständige KI-Transformation eines Unternehmens ist ein kontinuierlicher Prozess über 12-24 Monate.",
        },
      },
      {
        "@type": "Question",
        name: "Brauche ich Programmierkenntnisse, um KI im Unternehmen zu nutzen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nein. Moderne KI-Tools wie ChatGPT, Copilot oder Marketing-Automation-Plattformen sind für Nicht-Techniker konzipiert. Für individuelle KI-Lösungen und Integrationen kann technisches Know-how oder ein externer KI-Berater hilfreich sein. Wichtiger als Programmierkenntnisse ist ein grundlegendes Verständnis der KI-Möglichkeiten und eine klare Strategie.",
        },
      },
      {
        "@type": "Question",
        name: "Welche Branchen profitieren am meisten von KI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Alle Branchen profitieren von KI, besonders: E-Commerce (Personalisierung, Bestandsmanagement), Finanzdienstleistungen (Risikobewertung, Fraud Detection), Gesundheitswesen (Diagnoseunterstützung, Dokumentation), Produktion (Predictive Maintenance, Qualitätskontrolle), Marketing (Content-Erstellung, Kampagnen-Optimierung) und Kundenservice (Chatbots, Ticket-Routing).",
        },
      },
      {
        "@type": "Question",
        name: "Ist der KI-Readiness-Check kostenlos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, der KI-Readiness-Check auf mein-ki-unternehmen.de ist vollständig kostenlos und unverbindlich. Sie erhalten Ihren KI-Reifegrad-Score, eine Detailanalyse nach Kategorie, eine Einsparpotenzial-Berechnung und konkrete Handlungsempfehlungen — ohne versteckte Kosten. Optional können Sie ein kostenloses Beratungsgespräch mit unseren KI-Experten buchen.",
        },
      },
    ],
  };

  // ── Person/Author Schema ──────────────────────────────────
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.role,
    url: siteConfig.author.linkedin,
    sameAs: [siteConfig.author.linkedin],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.legal.companyName,
      url: `https://${siteConfig.domain}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.legal.street,
        postalCode: siteConfig.legal.zip,
        addressLocality: siteConfig.legal.city,
        addressCountry: "DE",
      },
    },
    knowsAbout: [
      "Künstliche Intelligenz",
      "KI-Strategie für Unternehmen",
      "Digitale Transformation",
      "Marketing Automation",
      "KI-Einführung im Mittelstand",
    ],
  };

  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {/* Privacy-friendly analytics by Plausible */}
        <script async src="https://analytics.polymarkt.de/js/pa-ChGTjGXjJCn__3bVSFt5J.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init();`,
          }}
        />
      </head>
      <body className="font-open-sans antialiased">{children}</body>
    </html>
  );
}
