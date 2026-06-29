'use client';

import React from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import SettingsTab from '../../../../components/profile/tabs/SettingsTab';

export default function OwnerSettingsPage() {
  const { user, checkAuth } = useAuth();

  if (!user) return null;

  return <SettingsTab user={user} onUpdate={checkAuth} />;
}
