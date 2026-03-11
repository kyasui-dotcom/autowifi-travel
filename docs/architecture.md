# Architecture Overview

## System Architecture

```
Mobile App (Expo/React Native)
  |
  |-- Pattern Sync (API fetch + AsyncStorage cache + bundled fallback)
  |-- Portal Automation (WebView + injected JavaScript)
  |-- Credential Manager (expo-secure-store)
  |-- Geofence Monitor (expo-location + expo-task-manager)
  |
  v
Backend API (Next.js on Cloudflare Workers)
  |
  v
Cloudflare D1 (SQLite)
```

## Data Flow

### Pattern Loading
1. Fetch from API with `since_version` for incremental updates
2. On failure, use AsyncStorage cached patterns
3. On cache miss/corruption, use bundled `patterns-v1.json`

### Portal Automation
1. Detect WiFi SSID via `react-native-wifi-reborn`
2. Match SSID to pattern from loaded patterns
3. Detect captive portal via HTTP probe (204 check)
4. Generate automation JavaScript from pattern rules
5. Inject script into WebView loading the portal page
6. Script fills forms, clicks buttons, reports progress via postMessage
7. Verify internet access after automation completes

### Auto-Reconnection
1. Every 2 minutes, verify internet access
2. If down, match current SSID to known pattern
3. Look up saved credentials
4. Launch silent WebView to re-authenticate
5. Update last-used timestamp on success

### Geofencing
1. Load geofence regions from bundled data
2. Select nearest regions (iOS: 20 max, Android: 100 max)
3. Register with expo-location for background monitoring
4. On region enter, send notification with deep link to portal screen

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | Expo 55, React Native 0.83, TypeScript |
| State | Zustand with AsyncStorage persistence |
| Navigation | Expo Router |
| Backend | Next.js 16 on Cloudflare Workers |
| Database | Cloudflare D1 (SQLite) via Drizzle ORM |
| i18n | i18next (ja, en, zh, ko) |
| CI/CD | GitHub Actions |
