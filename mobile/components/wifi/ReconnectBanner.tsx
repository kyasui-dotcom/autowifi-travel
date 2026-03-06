import { StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "@/components/Themed";
import type { AutoReconnectStatus } from "@/lib/types";

interface ReconnectBannerProps {
  status: AutoReconnectStatus;
  onDismiss?: () => void;
}

export function ReconnectBanner({ status, onDismiss }: ReconnectBannerProps) {
  const { t } = useTranslation();

  // Don't show banner for idle or checking states
  if (status === "idle" || status === "checking") return null;

  const config: Record<
    string,
    { text: string; color: string; showSpinner: boolean }
  > = {
    reconnecting: {
      text: t("home.reconnecting"),
      color: "#2196F3",
      showSpinner: true,
    },
    reconnected: {
      text: t("home.reconnected"),
      color: "#4CAF50",
      showSpinner: false,
    },
    failed: {
      text: t("home.reconnectFailed"),
      color: "#f44336",
      showSpinner: false,
    },
    no_credentials: {
      text: t("home.reconnectFailed"),
      color: "#FF9800",
      showSpinner: false,
    },
  };

  const c = config[status];
  if (!c) return null;

  return (
    <TouchableOpacity
      style={[styles.banner, { backgroundColor: c.color }]}
      onPress={onDismiss}
      activeOpacity={onDismiss ? 0.7 : 1}
    >
      {c.showSpinner && (
        <ActivityIndicator size="small" color="#fff" style={styles.spinner} />
      )}
      <Text style={styles.text}>{c.text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  spinner: {
    marginRight: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
