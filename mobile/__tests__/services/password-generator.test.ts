import { generatePassword } from "@/services/password-generator";

describe("generatePassword", () => {
  it("generates password with default rules", () => {
    const pw = generatePassword();
    expect(pw.length).toBeGreaterThanOrEqual(12);
    expect(pw.length).toBeLessThanOrEqual(16);
  });

  it("contains uppercase when required", () => {
    const pw = generatePassword({
      minLength: 12, maxLength: 16,
      requireUppercase: true, requireLowercase: false,
      requireNumbers: false, requireSpecial: false,
    });
    expect(pw).toMatch(/[A-Z]/);
  });

  it("contains lowercase when required", () => {
    const pw = generatePassword({
      minLength: 12, maxLength: 16,
      requireUppercase: false, requireLowercase: true,
      requireNumbers: false, requireSpecial: false,
    });
    expect(pw).toMatch(/[a-z]/);
  });

  it("contains numbers when required", () => {
    const pw = generatePassword({
      minLength: 12, maxLength: 16,
      requireUppercase: false, requireLowercase: false,
      requireNumbers: true, requireSpecial: false,
    });
    expect(pw).toMatch(/[0-9]/);
  });

  it("contains special chars when required", () => {
    const pw = generatePassword({
      minLength: 12, maxLength: 16,
      requireUppercase: false, requireLowercase: false,
      requireNumbers: false, requireSpecial: true,
    });
    expect(pw).toMatch(/[!@#$%&*]/);
  });

  it("uses custom special chars", () => {
    const pw = generatePassword({
      minLength: 20, maxLength: 20,
      requireUppercase: false, requireLowercase: false,
      requireNumbers: false, requireSpecial: true,
      allowedSpecialChars: "-_",
    });
    expect(pw).toMatch(/[-_]/);
  });

  it("respects exact length when min === max", () => {
    const pw = generatePassword({
      minLength: 8, maxLength: 8,
      requireUppercase: true, requireLowercase: true,
      requireNumbers: true, requireSpecial: false,
    });
    expect(pw.length).toBe(8);
  });

  it("falls back to default pool when nothing required", () => {
    const pw = generatePassword({
      minLength: 10, maxLength: 10,
      requireUppercase: false, requireLowercase: false,
      requireNumbers: false, requireSpecial: false,
    });
    expect(pw.length).toBe(10);
    expect(pw).toMatch(/^[A-Za-z0-9]+$/);
  });
});
