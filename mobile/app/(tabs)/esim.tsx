import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import patternsData from "@/assets/portal-patterns/patterns-v1.json";
import type { PortalPattern } from "@/lib/types";

const patterns = patternsData.patterns as PortalPattern[];

// Country code -> Airalo URL slug mapping
const airaloSlugs: Record<string, string> = {
  KR: "south-korea",
  SG: "singapore",
  US: "united-states",
  HK: "hong-kong",
  TW: "taiwan",
  TH: "thailand",
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
  MY: "\u{1F1F2}\u{1F1FE}",
  JP: "\u{1F1EF}\u{1F1F5}",
};

// Get unique countries from patterns (preserving order, overseas first)
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

function buildAiraloUrl(countryCode: string): string {
  const slug = airaloSlugs[countryCode] ?? countryCode.toLowerCase();
  return `https://www.airalo.com/${slug}-esim`;
}

function CountryCard({
  countryCode,
  onPress,
}: {
  countryCode: string;
  onPress: (url: string, name: string) => void;
}) {
  const { t } = useTranslation();
  const flag = countryFlags[countryCode] ?? "";
  const name = t(`esim.countries.${countryCode}`);
  const spotCount = patterns.filter((p) => p.country === countryCode).length;

  const handlePress = () => {
    onPress(buildAiraloUrl(countryCode), name);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.cardLeft}>
        <Text style={styles.flag}>{flag}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.countryName}>{name}</Text>
          <Text style={styles.spotCount}>
            {t('esim.spotCount', { count: spotCount })}
          </Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.esimLabel}>{t('esim.viewEsim')}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function EsimScreen() {
  const { t } = useTranslation();
  const countries = getCountries();
  const router = useRouter();

  const handleCountryPress = (url: string, name: string) => {
    router.push({
      pathname: "/esim-webview",
      params: { url, title: t('esim.countryEsim', { country: name }) },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CountryCard countryCode={item} onPress={handleCountryPress} />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>{t('esim.title')}</Text>
            <Text style={styles.subtitle}>{t('esim.subtitle')}</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
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
});
