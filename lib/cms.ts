/**
 * Future CMS (e.g. Strapi) — keep API URL and token in env, fetch here only.
 * Homepage copy can move to Strapi entries later without changing components much.
 */
export const strapi = {
  url: process.env.NEXT_PUBLIC_STRAPI_URL ?? "",
  /** Server-only read token when you add Strapi */
  readToken: process.env.STRAPI_API_TOKEN ?? "",
} as const;

export function isCmsConfigured(): boolean {
  return strapi.url.length > 0;
}
