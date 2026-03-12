import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { fetchOrders } from "@/services/esim-api";
import { useProfileStore, useEsimStore } from "@/lib/store";
import type { EsimOrder, EsimOrderStatus } from "@/lib/types";

const statusColors: Record<EsimOrderStatus, string> = {
  pending: "#FF9800",
  paid: "#2196F3",
  ordered: "#2196F3",
  completed: "#4CAF50",
  failed: "#F44336",
  refunded: "#9E9E9E",
};

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function OrderCard({
  order,
  onPress,
}: {
  order: EsimOrder;
  onPress: (order: EsimOrder) => void;
}) {
  const { t } = useTranslation();
  const statusColor = statusColors[order.status] ?? "#999";

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(order)}>
      <View style={styles.cardHeader}>
        <Text style={styles.packageTitle}>{order.packageTitle}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>
            {t(`esim.order.status.${order.status}`)}
          </Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.date}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.price}>{formatPrice(order.priceUsd)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function OrdersScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const profile = useProfileStore((s) => s.profile);
  const { orders: cachedOrders, setOrders } = useEsimStore();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = useCallback(async () => {
    if (!profile?.email) return;
    try {
      const orders = await fetchOrders(profile.email);
      setOrders(orders);
    } catch {
      // Use cached orders on error
    }
  }, [profile?.email, setOrders]);

  useEffect(() => {
    loadOrders().finally(() => setLoading(false));
  }, [loadOrders]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, [loadOrders]);

  const handleOrderPress = (order: EsimOrder) => {
    router.push({
      pathname: "/esim/order-detail",
      params: { orderId: order.orderId },
    });
  };

  if (!profile?.email) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>{t("esim.orders.needProfile")}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cachedOrders}
        keyExtractor={(item) => item.orderId}
        renderItem={({ item }) => (
          <OrderCard order={item} onPress={handleOrderPress} />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>{t("esim.orders.empty")}</Text>
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
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  packageTitle: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 12,
    opacity: 0.5,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.5,
  },
});
