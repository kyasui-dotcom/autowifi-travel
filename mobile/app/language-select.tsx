import { StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Text, View } from "@/components/Themed";
import { setLanguage, type SupportedLanguage } from "@/lib/i18n";

const LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "zh", label: "中文", flag: "\u{1F1E8}\u{1F1F3}" },
  { code: "ko", label: "한국어", flag: "\u{1F1F0}\u{1F1F7}" },
];

export default function LanguageSelectScreen() {
  const router = useRouter();

  const handleSelect = async (lang: SupportedLanguage) => {
    await setLanguage(lang);
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.icon}>📶</Text>
          <Text style={styles.title}>AutoWiFi Travel</Text>
          <Text style={styles.subtitle}>
            言語を選択 / Select language
          </Text>
          <Text style={styles.subtitleAlt}>
            选择语言 / 언어 선택
          </Text>
        </View>

        <View style={styles.langGrid}>
          {LANGUAGES.map(({ code, label, flag }) => (
            <TouchableOpacity
              key={code}
              style={styles.langCard}
              onPress={() => handleSelect(code)}
              activeOpacity={0.7}
            >
              <Text style={styles.langFlag}>{flag}</Text>
              <Text style={styles.langLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  subtitleAlt: {
    fontSize: 16,
    color: "#666",
  },
  langGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    width: "100%",
    justifyContent: "center",
  },
  langCard: {
    width: "45%",
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  langFlag: {
    fontSize: 40,
    marginBottom: 8,
  },
  langLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
