import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "@/components/Themed";
import { useProfileStore } from "@/lib/store";
import type { UserProfile } from "@/lib/types";

const PROFILE_STORAGE_KEY = "autowifi_user_profile";

export default function SettingsScreen() {
  const { profile, setProfile } = useProfileStore();
  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const raw = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (raw) {
        const p: UserProfile = JSON.parse(raw);
        setFirstName(p.firstName);
        setLastName(p.lastName);
        setEmail(p.email);
        setProfile(p);
      }
    } catch {
      // ignore
    }
  };

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      Alert.alert("入力エラー", "すべての項目を入力してください");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("入力エラー", "正しいメールアドレスを入力してください");
      return;
    }

    const newProfile: UserProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    };

    try {
      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(newProfile)
      );
      setProfile(newProfile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      Alert.alert("エラー", "プロフィールの保存に失敗しました");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>プロフィール</Text>
        <Text style={styles.description}>
          WiFiポータルの自動登録に使用される情報です。ローマ字で入力してください。
        </Text>

        <Text style={styles.label}>名 (First Name)</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Taro"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text style={styles.label}>姓 (Last Name)</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Yamada"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text style={styles.label}>メールアドレス</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="taro@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.saveButton, saved && styles.savedButton]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            {saved ? "保存しました" : "保存する"}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>パスワードについて</Text>
          <Text style={styles.infoText}>
            WiFiポータルの登録時に必要なパスワードは、スポットごとに自動生成されます。
            生成されたパスワードは暗号化してデバイスに保存され、次回接続時に自動で使用されます。
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>対応スポット</Text>
          <Text style={styles.infoText}>
            Free: 仁川(ICN), チャンギ(SIN), ハワイ(HNL), 香港(HKG){"\n"}
            Premium: 桃園(TPE), スワンナプーム(BKK), 他
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  savedButton: {
    backgroundColor: "#4CAF50",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "rgba(150, 150, 150, 0.08)",
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.7,
  },
});
