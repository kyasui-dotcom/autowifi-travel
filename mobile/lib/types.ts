// ===== Portal Pattern Types =====

export type PortalType = "registration" | "login" | "agree_only" | "redirect_only";

export type ValueSource =
  | "profile.firstName"
  | "profile.lastName"
  | "profile.fullName"
  | "profile.fullNameReversed"
  | "profile.email"
  | "credentials.password"
  | "credentials.username"
  | "static";

export type InputMethod = "set_value" | "select" | "click" | "check";

export type ActionType = "click" | "check" | "scroll_to" | "wait";

export interface FieldMapping {
  fieldId: string;
  selector: string;
  fallbackSelectors?: string[];
  valueSource: ValueSource;
  staticValue?: string;
  inputMethod: InputMethod;
  delayMs?: number;
}

export interface ActionStep {
  description: string;
  selector: string;
  fallbackSelectors?: string[];
  action: ActionType;
  delayMs?: number;
  waitForSelector?: string;
  waitTimeoutMs?: number;
}

export interface SuccessCondition {
  method: "url_change" | "url_contains" | "element_appears" | "element_disappears" | "http_probe";
  value: string;
}

export interface PasswordRules {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecial: boolean;
  allowedSpecialChars?: string;
}

export interface PortalFlow {
  fields: FieldMapping[];
  postFillActions: ActionStep[];
  successCondition: SuccessCondition;
  loginUrl?: string;
}

export interface AgreeOnlyFlow {
  actions: ActionStep[];
  successCondition: SuccessCondition;
}

export interface PortalPattern {
  spotId: string;
  name: string;
  nameJa: string;
  nameZh?: string;
  nameKo?: string;
  airportCode: string;
  country: string;
  ssids: string[];
  portalType: PortalType;
  portalUrl?: string;
  tier: "free" | "premium";

  registration?: PortalFlow;
  login?: PortalFlow;
  agreeOnly?: AgreeOnlyFlow;

  preActions?: ActionStep[];
  customScript?: string;
  notes?: string;
  patternVersion: number;
  lastVerified: string;
  passwordRules?: PasswordRules;
}

export interface PatternBundle {
  version: number;
  updatedAt: string;
  patterns: PortalPattern[];
}

// ===== User Profile =====

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

// ===== Saved Credentials =====

export interface SavedCredentials {
  spotId: string;
  username?: string;
  password: string;
  registeredAt: string;
  lastUsedAt?: string;
}

// ===== WiFi Status =====

export type WifiConnectionStatus = "disconnected" | "connected_no_portal" | "portal_detected" | "auto_connecting" | "connected";

export interface WifiState {
  ssid: string | null;
  status: WifiConnectionStatus;
  matchedPattern: PortalPattern | null;
  portalUrl: string | null;
}

// ===== Auto Reconnect =====

export type AutoReconnectStatus = "idle" | "checking" | "reconnecting" | "reconnected" | "failed" | "no_credentials";

export interface AutoReconnectState {
  status: AutoReconnectStatus;
  lastCheckAt: string | null;
  reconnectPattern: PortalPattern | null;
}

// ===== Automation Status =====

export type AutomationStatus = "started" | "field_filled" | "action_done" | "completed" | "error" | "field_not_found" | "action_not_found";

export interface AutomationMessage {
  type: "automation_status";
  status: AutomationStatus;
  detail: string;
}

// ===== Geofence Types =====

export interface GeofenceRegion {
  spotId: string;
  latitude: number;
  longitude: number;
  radius: number;
  identifier: string;
}

export interface GeofenceBundle {
  version: number;
  updatedAt: string;
  regions: GeofenceRegion[];
}

// ===== Auto-Detected Portal Types =====

export interface DetectedField {
  selector: string;
  fieldType: "email" | "password" | "firstName" | "lastName" | "fullName" | "phone" | "room" | "text" | "unknown";
  inputType: string;
  name: string;
  placeholder: string;
  required: boolean;
  confidence: number;
}

export interface DetectedCheckbox {
  selector: string;
  label: string;
  isTermsRelated: boolean;
  checked: boolean;
  confidence: number;
}

export interface DetectedAction {
  selector: string;
  text: string;
  tagName: string;
  type: string;
  purpose: "agree" | "connect" | "submit" | "continue" | "free_access" | "action";
  confidence: number;
}

export interface AutoDetectedPortal {
  type: "portal_scan_result";
  url: string;
  title: string;
  detectedType: "agree_only" | "registration" | "email_only" | "login" | "unknown";
  fields: DetectedField[];
  actions: DetectedAction[];
  checkboxes: DetectedCheckbox[];
  confidence: number;
  rawFormCount: number;
  language: string;
}

export type GeofenceStatus = "disabled" | "permission_denied" | "initializing" | "monitoring" | "error";

export interface GeofenceState {
  enabled: boolean;
  status: GeofenceStatus;
  activeRegionCount: number;
  lastTriggeredSpotId: string | null;
  lastTriggeredAt: string | null;
}
