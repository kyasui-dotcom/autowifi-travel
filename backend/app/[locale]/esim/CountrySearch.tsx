"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface Country {
  slug: string;
  name: string;
  flag: string;
  continent: string;
}

interface CountrySearchProps {
  countries: Country[];
  locale: string;
  labels: {
    searchTitle: string;
    searchLead: string;
    resultsLabel: string;
    cardCta: string;
    searchPlaceholder: string;
    noResults: string;
    continents: Record<string, string>;
  };
}

export default function CountrySearch({ countries, locale, labels }: CountrySearchProps) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? countries.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.slug.toLowerCase().includes(query.toLowerCase())
      )
    : countries;

  // Group by continent
  const grouped = filtered.reduce<Record<string, Country[]>>((acc, country) => {
    if (!acc[country.continent]) {
      acc[country.continent] = [];
    }
    acc[country.continent].push(country);
    return acc;
  }, {});

  const continentOrder = ["Asia", "Europe", "North America", "South America", "Oceania", "Africa"];
  const sortedContinents = Object.keys(grouped).sort(
    (a, b) => continentOrder.indexOf(a) - continentOrder.indexOf(b)
  );
  const resultCount = filtered.length;

  return (
    <>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>&#x1F50D;</span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={labels.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.searchMeta}>
          <span className={styles.searchResults}>
            {resultCount} {labels.resultsLabel}
          </span>
        </div>
      </div>

      <div className={styles.container}>
        {sortedContinents.length === 0 && (
          <div className={styles.noResults}>{labels.noResults}</div>
        )}

        {sortedContinents.map((continent) => (
          <section key={continent} className={styles.continentSection}>
            <div className={styles.continentHeader}>
              <h2 className={styles.continentTitle}>{labels.continents[continent] ?? continent}</h2>
              <span className={styles.continentCount}>{grouped[continent].length}</span>
            </div>
            <div className={styles.countriesGrid}>
              {grouped[continent].map((country) => (
                <a
                  key={country.slug}
                  href={`/${locale}/esim/${country.slug}`}
                  className={styles.countryCard}
                >
                  <div className={styles.countryIdentity}>
                    <span className={styles.countryFlag}>{country.flag}</span>
                    <span className={styles.countryName}>{country.name}</span>
                  </div>
                  <span className={styles.countryCta}>
                    {labels.cardCta} &rarr;
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
