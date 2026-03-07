import { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "@/lib/config";

interface SpotRequestModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SpotRequestModal({
  visible,
  onClose,
}: SpotRequestModalProps) {
  const { t } = useTranslation();
  const [spotName, setSpotName] = useState("");
  const [location, setLocation] = useState("");
  const [ssid, setSsid] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const resetForm = () => {
    setSpotName("");
    setLocation("");
    setSsid("");
    setNotes("");
    setSent(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!spotName.trim()) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/spot-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spotName: spotName.trim(),
          location: location.trim() || undefined,
          ssid: ssid.trim() || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSent(true);
    } catch {
      Alert.alert(t("common.error"), t("common.retry"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContainer}>
          {/* Title bar */}
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>{t("spots.requestTitle")}</Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityLabel={t("common.cancel")}
              accessibilityRole="button"
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {sent ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>{t("spots.requestSent")}</Text>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleClose}
              >
                <Text style={styles.submitButtonText}>{t("common.done")}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
              {/* Spot Name (required) */}
              <Text style={styles.label}>{t("spots.requestName")} *</Text>
              <TextInput
                style={styles.input}
                value={spotName}
                onChangeText={setSpotName}
                placeholder={t("spots.requestName")}
                placeholderTextColor="#999"
              />

              {/* Location (optional) */}
              <Text style={styles.label}>{t("spots.requestLocation")}</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder={t("spots.requestLocation")}
                placeholderTextColor="#999"
              />

              {/* SSID (optional) */}
              <Text style={styles.label}>{t("spots.requestSsid")}</Text>
              <TextInput
                style={styles.input}
                value={ssid}
                onChangeText={setSsid}
                placeholder={t("spots.requestSsid")}
                placeholderTextColor="#999"
              />

              {/* Notes (optional, multiline) */}
              <Text style={styles.label}>{t("spots.requestNotes")}</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                value={notes}
                onChangeText={setNotes}
                placeholder={t("spots.requestNotes")}
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
              />

              {/* Submit button */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !spotName.trim() && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!spotName.trim() || submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    {t("spots.requestSubmit")}
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 24,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    maxHeight: "80%",
    overflow: "hidden",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150, 150, 150, 0.2)",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 18,
    color: "#999",
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.3)",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: "#333",
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  successContainer: {
    padding: 32,
    alignItems: "center",
  },
  successText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
