/**
 * Analytics hook. No-op for now; wire it to Cloudflare Web Analytics or
 * another tool at deploy time. Never send answers or personal data.
 */
export function track(event: string, props: Record<string, string | number> = {}): void {
  if (import.meta.env.DEV) console.debug('[track]', event, props)
}
