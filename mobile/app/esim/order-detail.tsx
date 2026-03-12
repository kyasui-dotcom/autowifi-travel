import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { fetchOrder, fetchSimUsage } from "@/services/esim-api";
import { useProfileStore, useEsimStore } from "@/lib/store";
import type { EsimOrder, EsimUsage, EsimOrderStatus } from "@/lib/types";

const statusColors: Record<EsimOrderStatus, string> = {
  pending: "#FF9800",
  paid: "#2196F3",
  ordered: "#2196F3",
  completed: "#4CAF50",
  failed: "#F44336",
  refunded: "#9E9E9E",
};

const POLL_STATUSES: EsimOrderStatus[] = ["pending", "paid", "ordered"];
const POLL_INTERVAL_MS = 5000;

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatBytes(bytes: number): string {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)} GB`;
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(0)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export default function OrderDetailScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { t } = useTranslation();
  const profile = useProfileStore((s) => s.profile);
  const updateOrder = useEsimStore((s) => s.updateOrder);
  const cachedOrder = useEsimStore((s) =>
    s.orders.find((o) => o.orderId === orderId)
  );

  const [order, setOrder] = useState<EsimOrder | null>(cachedOrder ?? null);
  const [usage, setUsage] = useState<EsimUsage | null>(null);
  const [loading, setLoading] = useState(!cachedOrder);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!orderId || !profile?.email) return;

    const load = async () => {
      try {
        const o = await fetchOrder(orderId, profile.email);
        setOrder(o);
        updateOrder(orderId, o);

        if (o.status === "completed" && o.airaloSimIccid) {
          const u = await fetchSimUsage(o.airaloSimIccid).catch(() => null);
          setUsage(u);
        }
      } catch {
        // Use cached order
      } finally {
        setLoading(false);
      }
    };

    load();

    // Poll while order is in progress
    if (
      cachedOrder &&
      POLL_STATUSES.includes(cachedOrder.status)
    ) {
      pollRef.current = setInterval(load, POLL_INTERVAL_MS);
    }

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [orderId, profile?.email]);

  // Stop polling when order is completed/failed
  useEffect(() => {
    if (order && !POLL_STATUSES.includes(order.status) && pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, [order?.status]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>{t("esim.order.notFound")}</Text>
      </View>
    );
  }

  const statusColor = statusColors[order.status] ?? "#999";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Status */}
      <View style={styles.statusSection}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>
            {t(`esim.order.status.${order.status}`)}
          </Text>
        </View>
        {POLL_STATUSES.includes(order.status) && (
          <View style={styles.pollingRow}>
            <ActivityIndicator size="small" />
            <Text style={styles.pollingText}>
              {t("esim.order.processing")}
            </Text>
          </View>
        )}
      </View>

      {/* Package Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t("esim.order.packageInfo")}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t("esim.package.title")}</Text>
          <Text style={styles.detailValue}>{order.packageTitle}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t("esim.package.country")}</Text>
          <Text style={styles.detailValue}>
            {t(`esim.countries.${order.countryCode}`)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t("esim.package.price")}</Text>
          <Text style={styles.detailValue}>
            {formatPrice(order.priceUsd)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{t("esim.order.date")}</Text>
          <Text style={styles.detailValue}>
            {new Date(order.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>

      {/* QR Code */}
      {order.status === "completed" && order.qrCodeUrl && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("esim.order.qrCode")}</Text>
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: order.qrCodeUrl }}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.qrHint}>{t("esim.order.qrHint")}</Text>
        </View>
      )}

      {/* Installation Instructions */}
      {order.status === "completed" && order.installationInstructions && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {t("esim.order.instructions")}
          </Text>
          {order.installationInstructions.steps.map((step) => (
            <View key={step.step} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Data Usage */}
      {usage && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("esim.order.dataUsage")}</Text>
          <View style={styles.usageBar}>
            <View
              style={[
                styles.usageFill,
                { width: `${100 - usage.percentage}%` },
              ]}
            />
          </View>
          <View style={styles.usageLabels}>
            <Text style={styles.usageText}>
              {formatBytes(usage.remaining)} / {formatBytes(usage.total)}
            </Text>
            <Text style={styles.usageText}>{usage.percentage}%</Text>
          </View>
        </View>
      )}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.5,
  },
  statusSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  pollingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  pollingText: {
    fontSize: 13,
    opacity: 0.6,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 13,
    opacity: 0.6,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "600",
  },
  qrContainer: {
    alignItems: "center",
    padding: 16,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  qrHint: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: "center",
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
  },
  usageBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
    overflow: "hidden",
    marginBottom: 8,
  },
  usageFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  usageLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  usageText: {
    fontSize: 12,
    opacity: 0.6,
  },
});
