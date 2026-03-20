import Link from "next/link";
import { BreadcrumbJsonLd } from "./JsonLd";
import styles from "./article.module.css";

export type Locale = "en" | "ja" | "ko" | "zh";

export interface FaqItem {
  q: string;
  a: string;
}

export interface Section {
  title: string;
  body: string;
}

export interface ArticleContent {
  title: string;
  subtitle: string;
  intro: string;
  sections: Section[];
  faqTitle: string;
  faqs: FaqItem[];
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  breadcrumbHome: string;
  breadcrumbGuide: string;
  breadcrumbCurrent: string;
  datePublished?: string;
  dateModified?: string;
}

export interface RelatedArticle {
  slug: string;
  title: string;
}

interface Props {
  locale: Locale;
  slug: string;
  content: ArticleContent;
  relatedArticles?: RelatedArticle[];
  relatedTitle?: string;
}

export default function ArticleLayout({ locale, slug, content: c, relatedArticles, relatedTitle }: Props) {
  const baseUrl = "https://autowifi-travel.com";
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.intro.slice(0, 160),
    author: { "@type": "Organization", name: "AutoWiFi Travel" },
    publisher: { "@type": "Organization", name: "AutoWiFi Travel" },
    datePublished: c.datePublished || "2026-03-13",
    dateModified: c.dateModified || new Date().toISOString().split("T")[0],
  };

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: c.breadcrumbHome, url: `${baseUrl}/${locale}` },
          { name: c.breadcrumbGuide, url: `${baseUrl}/${locale}/guide` },
          { name: c.breadcrumbCurrent, url: `${baseUrl}/${locale}/guide/${slug}` },
        ]}
      />

      <nav className={styles.breadcrumb}>
        <Link href={`/${locale}`}>{c.breadcrumbHome}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href={`/${locale}/guide`}>{c.breadcrumbGuide}</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{c.breadcrumbCurrent}</span>
      </nav>

      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>{c.title}</h1>
        <p className={styles.heroSubtitle}>{c.subtitle}</p>
      </header>

      <section className={styles.section}>
        <p className={styles.introText}>{c.intro}</p>
      </section>

      {c.sections.map((sec, i) => (
        <section key={i} className={styles.section}>
          <h2 className={styles.sectionTitle}>{sec.title}</h2>
          <div className={styles.sectionBody}>
            {sec.body.split("\n\n").map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{c.faqTitle}</h2>
        <div className={styles.faqList}>
          {c.faqs.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {relatedArticles && relatedArticles.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{relatedTitle || "Related Guides"}</h2>
          <div className={styles.relatedGrid}>
            {relatedArticles.map((ra) => (
              <Link
                key={ra.slug}
                href={`/${locale}/guide/${ra.slug}`}
                className={styles.relatedCard}
              >
                {ra.title} →
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>{c.ctaTitle}</h2>
        <p className={styles.ctaDesc}>{c.ctaDesc}</p>
        <Link href={`/${locale}/esim`} className={styles.ctaButton}>
          {c.ctaButton} →
        </Link>
      </section>
    </div>
  );
}
