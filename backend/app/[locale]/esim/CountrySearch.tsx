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
      </div>

      <div className={styles.container}>
        {sortedContinents.length === 0 && (
          <div className={styles.noResults}>{labels.noResults}</div>
        )}

        {sortedContinents.map((continent) => (
          <section key={continent} className={styles.continentSection}>
            <h2 className={styles.continentTitle}>{labels.continents[continent] ?? continent}</h2>
            <div className={styles.countriesGrid}>
              {grouped[continent].map((country) => (
                <a
                  key={country.slug}
                  href={`/${locale}/esim/${country.slug}`}
                  className={styles.countryCard}
                >
                  <span className={styles.countryFlag}>{country.flag}</span>
                  <span className={styles.countryName}>{country.name}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
