'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BookVisitModal from '@/components/BookVisitModal';
import { LanguageProvider } from '@/context/LanguageContext';
import { BookingProvider, useBooking } from '@/context/BookingContext';

interface Props {
  children: React.ReactNode;
}

function BookingModalPortal() {
  const { isModalOpen, modalGrams, modalBank, closeBooking } = useBooking();
  return (
    <BookVisitModal
      isOpen={isModalOpen}
      onClose={closeBooking}
      initialGrams={modalGrams}
      initialBank={modalBank}
    />
  );
}

export default function SiteLayoutClient({ children }: Props) {
  return (
    <LanguageProvider>
      <BookingProvider>
        <div className="min-h-screen flex flex-col font-sans selection:bg-gold-500 selection:text-white">
          <Header />
          <main className="flex-grow pb-16 sm:pb-0">{children}</main>
          <WhatsAppFloat />
          <Footer />
          <BookingModalPortal />
        </div>
      </BookingProvider>
    </LanguageProvider>
  );
}
