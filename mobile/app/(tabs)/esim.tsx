import { useState, useMemo } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import patternsData from "@/assets/portal-patterns/patterns-v1.json";
import type { PortalPattern } from "@/lib/types";

const patterns = patternsData.patterns as PortalPattern[];

const countrySlugs: Record<string, string> = {
  KR: "south-korea",
  SG: "singapore",
  US: "united-states",
  HK: "hong-kong",
  TW: "taiwan",
  TH: "thailand",
  CN: "china",
  VN: "vietnam",
  PH: "philippines",
  ID: "indonesia",
  MY: "malaysia",
  JP: "japan",
};

const countryFlags: Record<string, string> = {
  KR: "\u{1F1F0}\u{1F1F7}",
  SG: "\u{1F1F8}\u{1F1EC}",
  US: "\u{1F1FA}\u{1F1F8}",
  HK: "\u{1F1ED}\u{1F1F0}",
  TW: "\u{1F1F9}\u{1F1FC}",
  TH: "\u{1F1F9}\u{1F1ED}",
  CN: "\u{1F1E8}\u{1F1F3}",
  VN: "\u{1F1FB}\u{1F1F3}",
  PH: "\u{1F1F5}\u{1F1ED}",
  ID: "\u{1F1EE}\u{1F1E9}",
  MY: "\u{1F1F2}\u{1F1FE}",
  JP: "\u{1F1EF}\u{1F1F5}",
};

function getCountries(): string[] {
  const seen = new Set<string>();
  const overseas: string[] = [];
  const domestic: string[] = [];

  for (const p of patterns) {
    if (!seen.has(p.country)) {
      seen.add(p.country);
      if (p.country === "JP") {
        domestic.push(p.country);
      } else {
        overseas.push(p.country);
      }
    }
  }
  return [...overseas, ...domestic];
}

function CountryCard({
  countryCode,
  onPress,
}: {
  countryCode: string;
  onPress: (countryCode: string) => void;
}) {
  const { t } = useTranslation();
  const flag = countryFlags[countryCode] ?? "";
  const name = t(`esim.countries.${countryCode}`);
  const spotCount = patterns.filter((p) => p.country === countryCode).length;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(countryCode)}
    >
      <View style={styles.cardLeft}>
        <Text style={styles.flag}>{flag}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.countryName}>{name}</Text>
          <Text style={styles.spotCount}>
            {t("esim.spotCount", { count: spotCount })}
          </Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.esimLabel}>{t("esim.viewPackages")}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function EsimScreen() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const countries = getCountries();
  const router = useRouter();

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries;
    const q = searchQuery.trim().toLowerCase();
    return countries.filter((code) => {
      const name = t(`esim.countries.${code}`).toLowerCase();
      return name.includes(q) || code.toLowerCase().includes(q);
    });
  }, [countries, searchQuery, t]);

  const handleCountryPress = (countryCode: string) => {
    const lang = i18next.language || "en";
    const slug = countrySlugs[countryCode] || countryCode.toLowerCase();
    const url = `https://autowifi-travel.com/${lang}/esim/${slug}`;
    const name = t(`esim.countries.${countryCode}`);
    router.push({
      pathname: "/esim-webview",
      params: { url, title: `${name} eSIM` },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CountryCard countryCode={item} onPress={handleCountryPress} />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{t("esim.title")}</Text>
              <TouchableOpacity
                style={styles.ordersButton}
                onPress={() => router.push("/esim/orders")}
              >
                <Text style={styles.ordersButtonText}>
                  {t("esim.myOrders")}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>{t("esim.subtitle")}</Text>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={t("esim.searchPlaceholder")}
              placeholderTextColor="#999"
              clearButtonMode="while-editing"
              autoCorrect={false}
            />
            {searchQuery.trim() !== "" && (
              <Text style={styles.resultCount}>
                {t("esim.resultCount", { count: filteredCountries.length })}
              </Text>
            )}
          </View>
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t("esim.noResults")}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ordersButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ordersButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.6,
    lineHeight: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  spotCount: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 2,
  },
  cardRight: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  esimLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginTop: 12,
    marginBottom: 4,
  },
  resultCount: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 4,
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.5,
  },
});
