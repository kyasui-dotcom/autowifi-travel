import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Text, View } from "@/components/Themed";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";

export default function EsimWebViewScreen() {
  const { url, title } = useLocalSearchParams<{
    url: string;
    title: string;
  }>();

  const handleOpenExternal = () => {
    if (url) Linking.openURL(url);
  };

  if (!url) {
    return (
      <View style={styles.container}>
        <Text>URLが指定されていません</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarTitle} numberOfLines={1}>
          {title ?? "eSIM"}
        </Text>
        <TouchableOpacity onPress={handleOpenExternal}>
          <Text style={styles.externalLink}>ブラウザで開く</Text>
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150, 150, 150, 0.2)",
  },
  toolbarTitle: {
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
    marginRight: 12,
  },
  externalLink: {
    fontSize: 13,
    color: "#2196F3",
  },
  webview: {
    flex: 1,
  },
});
