import React from 'react';
import SiteLayoutClient from '@/components/SiteLayoutClient';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayoutClient>{children}</SiteLayoutClient>;
}
