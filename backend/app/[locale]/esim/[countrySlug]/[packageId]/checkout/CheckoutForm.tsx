"use client";

import { useState, type FormEvent } from "react";
import styles from "./page.module.css";

interface CheckoutFormProps {
  packageId: string;
  locale: string;
  labels: {
    formTitle: string;
    formLead: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHint: string;
    submitButton: string;
    submitting: string;
    invalidEmail: string;
    checkoutFailed: string;
    missingCheckoutUrl: string;
  };
}

export default function CheckoutForm({ packageId, locale, labels }: CheckoutFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError(labels.invalidEmail);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/esim/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          email,
          source: "web",
          locale,
        }),
      });

      const data = (await response.json()) as { error?: string; checkoutUrl?: string };

      if (!response.ok) {
        throw new Error(data.error || labels.checkoutFailed);
      }

      // Redirect to Stripe checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(labels.missingCheckoutUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.checkoutFailed);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formSection}>
      <div className={styles.formIntro}>
        <h2 className={styles.formTitle}>{labels.formTitle}</h2>
        <p className={styles.formLead}>{labels.formLead}</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>
          {labels.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          className={styles.formInput}
          placeholder={labels.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <p className={styles.formHint}>{labels.emailHint}</p>
      </div>

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? labels.submitting : labels.submitButton}
      </button>
    </form>
  );
}
