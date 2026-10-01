export const APP_STORE_URL = 'https://apps.apple.com/us/app/churchday/id6765494714'

// The church management portal (Flutter web, deployed separately).
export const PORTAL_URL = 'https://app.church-day.com'
// `?signup=1` opens the portal on its Sign Up tab rather than Sign In.
export const PORTAL_SIGNUP_URL = `${PORTAL_URL}/?signup=1`

/**
 * Signup URL carrying a pre-selected plan.
 *
 * The portal's plan picker reads `?plan=` and pre-selects that tier, so a
 * visitor who clicked "Growth" on the pricing table doesn't land on a generic
 * chooser and have to pick it again.
 */
export type PlanId = 'starter' | 'growth' | 'pro'

export function portalSignupUrl(plan?: PlanId): string {
  return plan ? `${PORTAL_SIGNUP_URL}&plan=${plan}` : PORTAL_SIGNUP_URL
}
