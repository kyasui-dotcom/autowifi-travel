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

// ===== Automation Status =====

export type AutomationStatus = "started" | "field_filled" | "action_done" | "completed" | "error" | "field_not_found" | "action_not_found";

export interface AutomationMessage {
  type: "automation_status";
  status: AutomationStatus;
  detail: string;
}
