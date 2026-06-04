'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '../services/auth';
import { logoutAction } from '../actions/auth';
import type { SafeUser } from '../types/user';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    await logoutAction();
    setUser(null);
    router.push('/auth/login');
    router.refresh(); // refresh server components to clear cached user data
  }, [router]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
  };
}
