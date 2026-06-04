/* ──────────────────────────────────────────────
 *  User & Auth Types
 * ────────────────────────────────────────────── */

/** User shape returned by the backend */
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; // hashed — never used on frontend
  role: 'tenant' | 'owner' | string;
  isVerified: boolean;
  isbanned: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

/** Minimal user info we store in the cookie (safe subset) */
export interface SafeUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

/* ── Payloads ── */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

/* ── Responses ── */

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

/* ── Action Results ── */

export interface AuthActionResult {
  success: boolean;
  message: string;
  user?: SafeUser;
}
