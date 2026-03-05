import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import patternsData from "@/assets/portal-patterns/patterns-v1.json";
import type { PortalPattern } from "@/lib/types";

const patterns = patternsData.patterns as PortalPattern[];

// Country code → Airalo URL slug mapping
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

const countryNames: Record<string, string> = {
  KR: "韓国",
  SG: "シンガポール",
  US: "アメリカ",
  HK: "香港",
  TW: "台湾",
  TH: "タイ",
  MY: "マレーシア",
  JP: "日本",
};

const countryFlags: Record<string, string> = {
  KR: "🇰🇷",
  SG: "🇸🇬",
  US: "🇺🇸",
  HK: "🇭🇰",
  TW: "🇹🇼",
  TH: "🇹🇭",
  MY: "🇲🇾",
  JP: "🇯🇵",
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
  // TODO: Replace with your Airalo affiliate tracking link
  return `https://www.airalo.com/${slug}-esim`;
}

function CountryCard({
  countryCode,
  onPress,
}: {
  countryCode: string;
  onPress: (url: string, name: string) => void;
}) {
  const flag = countryFlags[countryCode] ?? "";
  const name = countryNames[countryCode] ?? countryCode;
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
          <Text style={styles.spotCount}>WiFiスポット {spotCount}件</Text>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.esimLabel}>eSIMを見る →</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function EsimScreen() {
  const countries = getCountries();
  const router = useRouter();

  const handleCountryPress = (url: string, name: string) => {
    router.push({
      pathname: "/esim-webview",
      params: { url, title: `${name}のeSIM` },
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
            <Text style={styles.title}>eSIM購入</Text>
            <Text style={styles.subtitle}>
              渡航先のeSIMをAiraloで購入できます。{"\n"}
              フリーWiFiが使えない場所でも安心。
            </Text>
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
