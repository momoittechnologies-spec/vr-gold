'use client';

import React, { useState } from 'react';
import LiveRatesTicker from '@/components/LiveRatesTicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BookVisitModal from '@/components/BookVisitModal';
import { LanguageProvider } from '@/context/LanguageContext';

interface Props {
  children: React.ReactNode;
}

export default function SiteLayoutClient({ children }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalGrams, setModalGrams] = useState<number | undefined>(undefined);
  const [modalBank, setModalBank] = useState<string | undefined>(undefined);

  const handleOpenBooking = (grams?: number, bank?: string) => {
    setModalGrams(grams);
    setModalBank(bank);
    setIsModalOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col font-sans selection:bg-gold-500 selection:text-white">
        <LiveRatesTicker onOpenBooking={() => handleOpenBooking()} />
        <Header onOpenBooking={() => handleOpenBooking()} />
        <main className="flex-grow">{children}</main>
        <WhatsAppFloat />
        <Footer />

        <BookVisitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialGrams={modalGrams}
          initialBank={modalBank}
        />
      </div>
    </LanguageProvider>
  );
}
