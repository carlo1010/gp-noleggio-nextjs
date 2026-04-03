export function buildBackendApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_URL configuration.");
  }

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBaseUrl}${normalizedPath}`;
}
