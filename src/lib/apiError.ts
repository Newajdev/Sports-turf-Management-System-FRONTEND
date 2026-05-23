/* eslint-disable @typescript-eslint/no-explicit-any */

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error && typeof error === "object") {
    const axiosError = error as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    if (axiosError.message) {
      return axiosError.message;
    }
  }
  return fallback;
}
