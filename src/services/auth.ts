import type { SafeUser } from '../types/user';

/**
 * Read the user info cookie (client-side).
 * The token cookie is HttpOnly and NOT accessible here — that's by design.
 */
export function getUser(): SafeUser | null {
  if (typeof window === 'undefined') return null;

  const match = document.cookie.match(/(?:^|;\s*)user=([^;]*)/);
  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match[1])) as SafeUser;
  } catch {
    return null;
  }
}

/**
 * Check if the user is authenticated (client-side).
 * Checks for the user cookie since the token cookie is HttpOnly.
 */
export function isAuthenticated(): boolean {
  return getUser() !== null;
}
