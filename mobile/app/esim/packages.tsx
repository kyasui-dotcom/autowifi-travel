import { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { fetchEsimPackages } from "@/services/esim-api";
import type { EsimPackage } from "@/lib/types";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function PackageCard({
  pkg,
  onPress,
}: {
  pkg: EsimPackage;
  onPress: (pkg: EsimPackage) => void;
}) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(pkg)}>
      <View style={styles.cardHeader}>
        <Text style={styles.packageTitle}>{pkg.title}</Text>
        <Text style={styles.price}>{formatPrice(pkg.priceUsd)}</Text>
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{t("esim.package.data")}</Text>
          <Text style={styles.detailValue}>{pkg.dataAmount}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{t("esim.package.validity")}</Text>
          <Text style={styles.detailValue}>
            {t("esim.package.days", { count: pkg.validityDays })}
          </Text>
        </View>
        {pkg.operatorTitle && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              {t("esim.package.operator")}
            </Text>
            <Text style={styles.detailValue}>{pkg.operatorTitle}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function PackagesScreen() {
  const { country } = useLocalSearchParams<{ country: string }>();
  const { t } = useTranslation();
  const router = useRouter();
  const [packages, setPackages] = useState<EsimPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEsimPackages(country)
      .then(setPackages)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [country]);

  const handlePackagePress = (pkg: EsimPackage) => {
    router.push({
      pathname: "/esim/package-detail",
      params: {
        packageId: pkg.airaloPackageId,
        title: pkg.title,
        dataAmount: pkg.dataAmount,
        validityDays: String(pkg.validityDays),
        priceUsd: String(pkg.priceUsd),
        operatorTitle: pkg.operatorTitle ?? "",
        countryCode: pkg.countryCode,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.airaloPackageId}
        renderItem={({ item }) => (
          <PackageCard pkg={item} onPress={handlePackagePress} />
        )}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>
            {t("esim.packagesFor", {
              country: t(`esim.countries.${country}`),
            })}
          </Text>
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>{t("esim.noPackages")}</Text>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  listContent: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  packageTitle: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  cardDetails: {
    gap: 6,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontSize: 13,
    opacity: 0.6,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  errorText: {
    color: "#F44336",
    fontSize: 14,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.5,
  },
});
