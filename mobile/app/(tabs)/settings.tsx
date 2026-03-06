import { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Text, View } from "@/components/Themed";
import { useProfileStore } from "@/lib/store";
import { setLanguage, getCurrentLanguage, type SupportedLanguage } from "@/lib/i18n";
import type { UserProfile } from "@/lib/types";

const PROFILE_STORAGE_KEY = "autowifi_user_profile";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { profile, setProfile } = useProfileStore();
  const [firstName, setFirstName] = useState(profile?.firstName ?? "");
  const [lastName, setLastName] = useState(profile?.lastName ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [saved, setSaved] = useState(false);
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

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
      Alert.alert(t('settings.inputError'), t('settings.fillAll'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(t('settings.inputError'), t('settings.invalidEmail'));
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
      Alert.alert(t('common.error'), t('settings.saveFailed'));
    }
  };

  const handleLanguageChange = async (lang: SupportedLanguage) => {
    await setLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Language Switcher */}
        <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
        <Text style={styles.description}>{t('settings.languageDesc')}</Text>
        <View style={styles.langGrid}>
          {([
            { code: "ja" as const, label: "日本語" },
            { code: "en" as const, label: "English" },
            { code: "zh" as const, label: "中文" },
            { code: "ko" as const, label: "한국어" },
          ]).map(({ code, label }) => (
            <TouchableOpacity
              key={code}
              style={[
                styles.langButton,
                currentLang === code && styles.langButtonActive,
              ]}
              onPress={() => handleLanguageChange(code)}
            >
              <Text
                style={[
                  styles.langButtonText,
                  currentLang === code && styles.langButtonTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Profile Section */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          {t('settings.profile')}
        </Text>
        <Text style={styles.description}>{t('settings.profileDesc')}</Text>

        <Text style={styles.label}>{t('settings.firstName')}</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Taro"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text style={styles.label}>{t('settings.lastName')}</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Yamada"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text style={styles.label}>{t('settings.email')}</Text>
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
            {saved ? t('common.saved') : t('common.save')}
          </Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>{t('settings.passwordInfo')}</Text>
          <Text style={styles.infoText}>{t('settings.passwordDesc')}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>{t('settings.supportedSpots')}</Text>
          <Text style={styles.infoText}>
            {t('settings.supportedSpotsDesc')}
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
  langGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  langButton: {
    width: "47%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    alignItems: "center",
  },
  langButtonActive: {
    borderColor: "#2196F3",
    backgroundColor: "rgba(33, 150, 243, 0.1)",
  },
  langButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },
  langButtonTextActive: {
    color: "#2196F3",
  },
});
