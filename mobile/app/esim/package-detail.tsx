import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import * as WebBrowser from "expo-web-browser";
import { createCheckout } from "@/services/esim-api";
import { useProfileStore, useEsimStore } from "@/lib/store";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function PackageDetailScreen() {
  const params = useLocalSearchParams<{
    packageId: string;
    title: string;
    dataAmount: string;
    validityDays: string;
    priceUsd: string;
    operatorTitle: string;
    countryCode: string;
  }>();
  const { t } = useTranslation();
  const profile = useProfileStore((s) => s.profile);
  const addOrder = useEsimStore((s) => s.addOrder);

  const [email, setEmail] = useState(profile?.email ?? "");
  const [loading, setLoading] = useState(false);

  const priceUsd = parseInt(params.priceUsd ?? "0", 10);

  const handleBuy = async () => {
    if (!email.trim() || !email.includes("@")) {
      Alert.alert(t("common.error"), t("esim.checkout.invalidEmail"));
      return;
    }

    setLoading(true);
    try {
      const { checkoutUrl, orderId } = await createCheckout(
        params.packageId ?? "",
        email.trim()
      );

      // Store order locally
      addOrder({
        orderId,
        email: email.trim(),
        airaloPackageId: params.packageId ?? "",
        packageTitle: params.title ?? "",
        countryCode: params.countryCode ?? "",
        priceUsd,
        quantity: 1,
        status: "pending",
        qrCodeUrl: null,
        installationInstructions: null,
        airaloSimIccid: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Open Stripe Checkout in browser
      await WebBrowser.openBrowserAsync(checkoutUrl);
    } catch (e) {
      Alert.alert(
        t("common.error"),
        e instanceof Error ? e.message : t("esim.checkout.failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.packageCard}>
        <Text style={styles.title}>{params.title}</Text>
        <Text style={styles.price}>{formatPrice(priceUsd)}</Text>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t("esim.package.data")}</Text>
          <Text style={styles.detailValue}>{params.dataAmount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t("esim.package.validity")}</Text>
          <Text style={styles.detailValue}>
            {t("esim.package.days", {
              count: parseInt(params.validityDays ?? "0", 10),
            })}
          </Text>
        </View>
        {params.operatorTitle ? (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {t("esim.package.operator")}
            </Text>
            <Text style={styles.detailValue}>{params.operatorTitle}</Text>
          </View>
        ) : null}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t("esim.package.country")}</Text>
          <Text style={styles.detailValue}>
            {t(`esim.countries.${params.countryCode}`)}
          </Text>
        </View>
      </View>

      <View style={styles.checkoutSection}>
        <Text style={styles.sectionTitle}>{t("esim.checkout.title")}</Text>
        <Text style={styles.emailLabel}>{t("esim.checkout.emailLabel")}</Text>
        <TextInput
          style={styles.emailInput}
          value={email}
          onChangeText={setEmail}
          placeholder={t("esim.checkout.emailPlaceholder")}
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.buyButton, loading && styles.buyButtonDisabled]}
          onPress={handleBuy}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buyButtonText}>
              {t("esim.checkout.buyNow", { price: formatPrice(priceUsd) })}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.stripeNote}>{t("esim.checkout.stripeNote")}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  packageCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 14,
    opacity: 0.6,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  checkoutSection: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  emailLabel: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 6,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 8,
  },
  buyButtonDisabled: {
    opacity: 0.6,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  stripeNote: {
    fontSize: 11,
    opacity: 0.5,
    textAlign: "center",
  },
});
