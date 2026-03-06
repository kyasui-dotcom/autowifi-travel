import { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "@/components/Themed";
import { loadPatterns } from "@/services/pattern-sync";
import { getPatternName } from "@/lib/i18n";
import type { PortalPattern } from "@/lib/types";

function SpotItem({ pattern }: { pattern: PortalPattern }) {
  const { t } = useTranslation();

  return (
    <View style={styles.spotCard}>
      <View style={styles.spotHeader}>
        <Text style={styles.spotName}>{getPatternName(pattern)}</Text>
        {pattern.tier === "premium" && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>{t('spots.premium')}</Text>
          </View>
        )}
      </View>
      <Text style={styles.spotCode}>
        {pattern.airportCode} - {pattern.country}
      </Text>
      <Text style={styles.spotSsids}>
        SSID: {pattern.ssids.join(", ")}
      </Text>
      <View style={styles.spotFooter}>
        <Text style={styles.spotType}>
          {t(`spots.portalType.${pattern.portalType}`)}
        </Text>
        <Text style={styles.spotVersion}>
          v{pattern.patternVersion}
        </Text>
      </View>
    </View>
  );
}

export default function SpotsScreen() {
  const { t } = useTranslation();
  const [patterns, setPatterns] = useState<PortalPattern[]>([]);
  useEffect(() => {
    loadPatterns().then(setPatterns);
  }, []);
  const freePatterns = patterns.filter((p) => p.tier === "free");
  const premiumPatterns = patterns.filter((p) => p.tier === "premium");

  return (
    <View style={styles.container}>
      <FlatList
        data={[...freePatterns, ...premiumPatterns]}
        keyExtractor={(item) => item.spotId}
        renderItem={({ item }) => <SpotItem pattern={item} />}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>
            {t('spots.title', { count: patterns.length })}
          </Text>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  spotCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
  },
  spotHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  spotName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  premiumText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
  },
  spotCode: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 4,
  },
  spotSsids: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 8,
  },
  spotFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spotType: {
    fontSize: 12,
    color: "#2196F3",
  },
  spotVersion: {
    fontSize: 12,
    opacity: 0.4,
  },
});
