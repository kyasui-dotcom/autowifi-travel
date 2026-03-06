import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "@/components/Themed";
import { loadPatterns } from "@/services/pattern-sync";
import { getPatternName } from "@/lib/i18n";
import SpotRequestModal from "@/components/spots/SpotRequestModal";
import type { PortalPattern } from "@/lib/types";

const API_BASE = "https://autowifi-travel-api.k-yasui-102.workers.dev";

interface SpotItemProps {
  pattern: PortalPattern;
  feedbackState?: "up" | "down";
  onThumbsUp: (spotId: string) => void;
  onThumbsDown: (spotId: string) => void;
  commentText: string;
  onCommentChange: (spotId: string, text: string) => void;
  onCommentSend: (spotId: string) => void;
  commentSending: boolean;
}

function SpotItem({
  pattern,
  feedbackState,
  onThumbsUp,
  onThumbsDown,
  commentText,
  onCommentChange,
  onCommentSend,
  commentSending,
}: SpotItemProps) {
  const { t } = useTranslation();
  const showCommentInput = feedbackState === "down";

  return (
    <View style={styles.spotCard}>
      <View style={styles.spotHeader}>
        <Text style={styles.spotName}>{getPatternName(pattern)}</Text>
        {pattern.tier === "premium" && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>{t("spots.premium")}</Text>
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
        <View style={styles.footerLeft}>
          <Text style={styles.spotType}>
            {t(`spots.portalType.${pattern.portalType}`)}
          </Text>
          <Text style={styles.spotVersion}>v{pattern.patternVersion}</Text>
        </View>
        <View style={styles.feedbackRow}>
          {feedbackState ? (
            <Text style={styles.feedbackSentText}>
              {t("spots.feedbackSent")}
            </Text>
          ) : (
            <>
              <TouchableOpacity
                style={styles.thumbButton}
                onPress={() => onThumbsUp(pattern.spotId)}
              >
                <Text style={styles.thumbEmoji}>👍</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.thumbButton}
                onPress={() => onThumbsDown(pattern.spotId)}
              >
                <Text style={styles.thumbEmoji}>👎</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {showCommentInput && (
        <View style={styles.commentSection}>
          <Text style={styles.commentLabel}>{t("spots.feedbackComment")}</Text>
          <TextInput
            style={styles.commentInput}
            value={commentText}
            onChangeText={(text) => onCommentChange(pattern.spotId, text)}
            placeholder={t("spots.feedbackPlaceholder")}
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity
            style={styles.commentSendButton}
            onPress={() => onCommentSend(pattern.spotId)}
            disabled={commentSending}
          >
            <Text style={styles.commentSendText}>
              {t("spots.feedbackSend")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function SpotsScreen() {
  const { t } = useTranslation();
  const [patterns, setPatterns] = useState<PortalPattern[]>([]);
  const [feedbackSent, setFeedbackSent] = useState<
    Record<string, "up" | "down">
  >({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [commentSending, setCommentSending] = useState<
    Record<string, boolean>
  >({});
  const [requestModalVisible, setRequestModalVisible] = useState(false);

  useEffect(() => {
    loadPatterns().then(setPatterns);
  }, []);

  const freePatterns = patterns.filter((p) => p.tier === "free");
  const premiumPatterns = patterns.filter((p) => p.tier === "premium");

  const sendReport = useCallback(
    async (spotId: string, success: boolean, errorDetail?: string) => {
      try {
        const res = await fetch(`${API_BASE}/api/reports`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ spotId, success, errorDetail }),
        });
        if (!res.ok) throw new Error("Failed");
      } catch {
        Alert.alert(t("common.error"), t("common.retry"));
      }
    },
    [t]
  );

  const handleThumbsUp = useCallback(
    async (spotId: string) => {
      setFeedbackSent((prev) => ({ ...prev, [spotId]: "up" }));
      await sendReport(spotId, true);
    },
    [sendReport]
  );

  const handleThumbsDown = useCallback((spotId: string) => {
    // Show comment input - don't send report yet
    setFeedbackSent((prev) => ({ ...prev, [spotId]: "down" }));
  }, []);

  const handleCommentChange = useCallback(
    (spotId: string, text: string) => {
      setComments((prev) => ({ ...prev, [spotId]: text }));
    },
    []
  );

  const handleCommentSend = useCallback(
    async (spotId: string) => {
      setCommentSending((prev) => ({ ...prev, [spotId]: true }));
      await sendReport(spotId, false, comments[spotId] || undefined);
      setCommentSending((prev) => ({ ...prev, [spotId]: false }));
    },
    [sendReport, comments]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[...freePatterns, ...premiumPatterns]}
        keyExtractor={(item) => item.spotId}
        renderItem={({ item }) => (
          <SpotItem
            pattern={item}
            feedbackState={feedbackSent[item.spotId]}
            onThumbsUp={handleThumbsUp}
            onThumbsDown={handleThumbsDown}
            commentText={comments[item.spotId] || ""}
            onCommentChange={handleCommentChange}
            onCommentSend={handleCommentSend}
            commentSending={!!commentSending[item.spotId]}
          />
        )}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>
            {t("spots.title", { count: patterns.length })}
          </Text>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => setRequestModalVisible(true)}
          >
            <Text style={styles.requestButtonText}>
              {t("spots.requestNew")}
            </Text>
          </TouchableOpacity>
        }
        contentContainerStyle={styles.listContent}
      />
      <SpotRequestModal
        visible={requestModalVisible}
        onClose={() => setRequestModalVisible(false)}
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
    alignItems: "center",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  spotType: {
    fontSize: 12,
    color: "#2196F3",
  },
  spotVersion: {
    fontSize: 12,
    opacity: 0.4,
  },
  feedbackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  thumbButton: {
    padding: 4,
  },
  thumbEmoji: {
    fontSize: 18,
  },
  feedbackSentText: {
    fontSize: 11,
    color: "#4CAF50",
    fontWeight: "600",
  },
  commentSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(150, 150, 150, 0.15)",
  },
  commentLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.3)",
    borderRadius: 8,
    padding: 8,
    fontSize: 13,
    minHeight: 40,
    textAlignVertical: "top",
  },
  commentSendButton: {
    alignSelf: "flex-end",
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 8,
  },
  commentSendText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  requestButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 4,
    marginBottom: 24,
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
