jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
}));

jest.mock("react-native-wifi-reborn", () => ({
  getCurrentWifiSSID: jest.fn(),
  forceWifiUsageWithOptions: jest.fn(),
}));

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  requestBackgroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  startGeofencingAsync: jest.fn(),
  stopGeofencingAsync: jest.fn(),
  GeofencingEventType: { Enter: 1, Exit: 2 },
  Accuracy: { Balanced: 3 },
}));

jest.mock("expo-task-manager", () => ({
  defineTask: jest.fn(),
  isTaskRegisteredAsync: jest.fn(),
}));

jest.mock("expo-notifications", () => ({
  scheduleNotificationAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
  addNotificationResponseReceivedListener: jest.fn(),
  removeNotificationSubscription: jest.fn(),
}));

jest.mock("@/assets/portal-patterns/patterns-v1.json", () => ({
  patterns: [
    {
      spotId: "test-spot",
      name: "Test Spot",
      nameJa: "テストスポット",
      ssids: ["TestWiFi"],
      portalType: "agree_only",
      tier: "free",
      patternVersion: 1,
    },
  ],
}));

jest.mock("@/lib/config", () => ({
  API_BASE_URL: "https://test-api.example.com",
}));
