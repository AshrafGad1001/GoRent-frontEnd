'use server';

import { cookies } from 'next/headers';
import type {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
  SafeUser,
  AuthActionResult,
} from '../types/user';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Cookie config
const TOKEN_COOKIE = 'token';
const USER_COOKIE = 'user';
const MAX_AGE = 24 * 60 * 60; // 1 day in seconds

/* ──────────────────────────────────────────────
 *  LOGIN
 * ────────────────────────────────────────────── */
export async function loginAction(
  payload: LoginPayload
): Promise<AuthActionResult> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: LoginResponse = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'فشل تسجيل الدخول. يرجى التأكد من البيانات.',
      };
    }

    // Extract safe user data (no password hash, no __v, etc.)
    const safeUser: SafeUser = {
      _id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
    };

    // Set HttpOnly cookies on the server
    const cookieStore = await cookies();

    cookieStore.set(TOKEN_COOKIE, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    });

    cookieStore.set(USER_COOKIE, JSON.stringify(safeUser), {
      httpOnly: false, // readable by JS for UI display
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    });

    return {
      success: true,
      message: data.message || 'تم تسجيل الدخول بنجاح',
      user: safeUser,
    };
  } catch {
    return {
      success: false,
      message: 'فشل الاتصال بالخادم. يرجى المحاولة لاحقاً.',
    };
  }
}

/* ──────────────────────────────────────────────
 *  REGISTER
 * ────────────────────────────────────────────── */
export async function registerAction(
  payload: RegisterPayload
): Promise<AuthActionResult> {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data: RegisterResponse = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'فشل التسجيل. يرجى التأكد من البيانات.',
      };
    }

    return {
      success: true,
      message: data.message || 'تم التسجيل بنجاح',
    };
  } catch {
    return {
      success: false,
      message: 'فشل الاتصال بالخادم. يرجى المحاولة لاحقاً.',
    };
  }
}

/* ──────────────────────────────────────────────
 *  LOGOUT
 * ────────────────────────────────────────────── */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(USER_COOKIE);
}

/* ──────────────────────────────────────────────
 *  GET CURRENT USER (server-side)
 * ────────────────────────────────────────────── */
export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get(USER_COOKIE);

  if (!userCookie?.value) return null;

  try {
    return JSON.parse(userCookie.value) as SafeUser;
  } catch {
    return null;
  }
}
