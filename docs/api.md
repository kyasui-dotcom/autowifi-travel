# AutoWiFi Travel API Reference

Base URL: `https://autowifi-travel-api.yasuikunihiro.workers.dev`

## Endpoints

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "autowifi-travel-api",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### GET /api/patterns

Fetch WiFi portal patterns. Supports incremental updates via `since_version` query parameter.

**Query Parameters:**
- `since_version` (optional): Only return patterns with version > this value

**Response:**
```json
{
  "version": 18,
  "updatedAt": "2025-01-01T00:00:00.000Z",
  "patterns": [
    {
      "spotId": "nrt-free-wifi",
      "name": "Narita Airport Free WiFi",
      "nameJa": "成田空港無料WiFi",
      "nameZh": "成田机场免费WiFi",
      "nameKo": "나리타공항 무료WiFi",
      "airportCode": "NRT",
      "country": "JP",
      "ssids": ["FreeWiFi-NARITA"],
      "portalType": "agree_only",
      "tier": "free",
      "patternVersion": 5
    }
  ]
}
```

### GET /api/patterns-version

Get the latest pattern bundle version number.

**Response:**
```json
{
  "version": 18,
  "publishedAt": "2025-01-01T00:00:00.000Z"
}
```

### POST /api/reports

Submit a connection report (success or failure).

**Request Body:**
```json
{
  "spotId": "nrt-free-wifi",
  "success": true,
  "errorDetail": "optional error message",
  "automationLog": {},
  "deviceInfo": "Android 14"
}
```

**Required fields:** `spotId`, `success`

**Response:**
```json
{ "ok": true }
```

### POST /api/spot-requests

Request a new WiFi spot to be added.

**Request Body:**
```json
{
  "spotName": "Tokyo Station WiFi",
  "location": "Tokyo Station",
  "country": "JP",
  "ssid": "TokyoStation_FreeWiFi",
  "notes": "Near ticket gate"
}
```

**Required fields:** `spotName`

**Response:**
```json
{ "ok": true }
```

### POST /api/seed

Seed the database with initial WiFi patterns. Admin use only.

**Response:**
```json
{
  "ok": true,
  "inserted": 565
}
```
