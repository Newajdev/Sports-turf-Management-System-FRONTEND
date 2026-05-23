/**
 * Detects Next.js server-action / server-component redirect errors so
 * client mutations do not surface them as failed requests.
 */
export function isRedirectError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const digest =
    "digest" in error && typeof (error as { digest?: unknown }).digest === "string"
      ? (error as { digest: string }).digest
      : null;

  if (digest?.startsWith("NEXT_REDIRECT")) return true;

  const message =
    "message" in error && typeof (error as { message?: unknown }).message === "string"
      ? (error as { message: string }).message
      : "";

  return message.includes("NEXT_REDIRECT");
}
