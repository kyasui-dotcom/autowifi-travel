import { useState, useEffect, useCallback, useMemo } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "@/components/Themed";
import { loadPatterns } from "@/services/pattern-sync";
import { getPatternName } from "@/lib/i18n";
import { API_BASE_URL } from "@/lib/config";
import SpotRequestModal from "@/components/spots/SpotRequestModal";
import type { PortalPattern } from "@/lib/types";

type FilterType = "all" | "free" | "premium";
type SortType = "name" | "country";

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
      <View style={styles.spotMeta}>
        <Text style={styles.spotCode}>
          {pattern.airportCode ? `${pattern.airportCode} · ` : ""}
          {pattern.country}
        </Text>
        <Text style={styles.spotType}>
          {t(`spots.portalType.${pattern.portalType}`)}
        </Text>
      </View>
      <Text style={styles.spotSsids}>
        SSID: {pattern.ssids.join(", ")}
      </Text>
      <View style={styles.spotFooter}>
        <Text style={styles.spotVersion}>v{pattern.patternVersion}</Text>
        <View style={styles.feedbackRow}>
          {feedbackState ? (
            <Text style={styles.feedbackSentText}>
              {t("spots.feedbackSent")} {feedbackState === "up" ? "✓" : ""}
            </Text>
          ) : (
            <>
              <TouchableOpacity
                style={styles.thumbButton}
                onPress={() => onThumbsUp(pattern.spotId)}
                accessibilityLabel={t("spots.feedbackWorked")}
                accessibilityRole="button"
              >
                <Text style={styles.thumbEmoji}>👍</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.thumbButton}
                onPress={() => onThumbsDown(pattern.spotId)}
                accessibilityLabel={t("spots.feedbackNotWorked")}
                accessibilityRole="button"
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
            accessibilityLabel={t("spots.feedbackComment")}
          />
          <TouchableOpacity
            style={[
              styles.commentSendButton,
              commentSending && styles.commentSendButtonDisabled,
            ]}
            onPress={() => onCommentSend(pattern.spotId)}
            disabled={commentSending}
          >
            <Text style={styles.commentSendText}>
              {commentSending ? "..." : t("spots.feedbackSend")}
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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [feedbackSent, setFeedbackSent] = useState<
    Record<string, "up" | "down">
  >({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [commentSending, setCommentSending] = useState<
    Record<string, boolean>
  >({});
  const [requestModalVisible, setRequestModalVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadPatterns()
      .then(setPatterns)
      .finally(() => setLoading(false));
  }, []);

  // Filtered & searched patterns with memoization
  const filteredPatterns = useMemo(() => {
    let result = patterns;

    // Filter by tier
    if (filterType === "free") {
      result = result.filter((p) => p.tier === "free");
    } else if (filterType === "premium") {
      result = result.filter((p) => p.tier === "premium");
    }

    // Search by name, country, airport code, SSID
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          getPatternName(p).toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          (p.airportCode?.toLowerCase().includes(q) ?? false) ||
          (p.nameJa?.includes(q) ?? false) ||
          (p.nameZh?.includes(q) ?? false) ||
          (p.nameKo?.includes(q) ?? false) ||
          p.ssids.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Sort: spots with airport codes first, then alphabetical
    result.sort((a, b) => {
      if (a.country !== b.country) return a.country.localeCompare(b.country);
      return getPatternName(a).localeCompare(getPatternName(b));
    });

    return result;
  }, [patterns, filterType, searchQuery]);

  // Country count for display
  const countryCount = useMemo(() => {
    const countries = new Set(patterns.map((p) => p.country));
    return countries.size;
  }, [patterns]);

  const sendReport = useCallback(
    async (spotId: string, success: boolean, errorDetail?: string) => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/reports`, {
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

  const renderFilterChip = useCallback(
    (type: FilterType, label: string) => (
      <TouchableOpacity
        style={[
          styles.filterChip,
          filterType === type && styles.filterChipActive,
        ]}
        onPress={() => setFilterType(type)}
        accessibilityRole="button"
        accessibilityState={{ selected: filterType === type }}
      >
        <Text
          style={[
            styles.filterChipText,
            filterType === type && styles.filterChipTextActive,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    ),
    [filterType]
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>{t("common.loading")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPatterns}
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
          <View style={styles.headerSection}>
            <Text style={styles.sectionTitle}>
              {t("spots.title", { count: patterns.length })}
            </Text>
            <Text style={styles.countrySubtext}>
              {countryCount} {t("spots.countries")}
            </Text>

            {/* Search bar */}
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={t("spots.searchPlaceholder")}
              placeholderTextColor="#999"
              clearButtonMode="while-editing"
              autoCorrect={false}
              accessibilityLabel={t("spots.searchPlaceholder")}
            />

            {/* Filter chips */}
            <View style={styles.filterRow}>
              {renderFilterChip("all", t("spots.filterAll"))}
              {renderFilterChip("free", "Free")}
              {renderFilterChip("premium", "Premium")}
            </View>

            {/* Results count if filtered */}
            {(searchQuery || filterType !== "all") && (
              <Text style={styles.resultCount}>
                {t("spots.resultCount", { count: filteredPatterns.length })}
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t("spots.noResults")}</Text>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    opacity: 0.6,
  },
  listContent: {
    padding: 16,
  },
  headerSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  countrySubtext: {
    fontSize: 13,
    opacity: 0.5,
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.3)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.3)",
  },
  filterChipActive: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  filterChipText: {
    fontSize: 13,
    opacity: 0.7,
  },
  filterChipTextActive: {
    color: "#fff",
    opacity: 1,
    fontWeight: "600",
  },
  resultCount: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 4,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.5,
  },
  spotCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
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
    fontSize: 15,
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
  spotMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  spotCode: {
    fontSize: 13,
    opacity: 0.6,
  },
  spotType: {
    fontSize: 12,
    color: "#2196F3",
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
    padding: 6,
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
  commentSendButtonDisabled: {
    opacity: 0.5,
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
