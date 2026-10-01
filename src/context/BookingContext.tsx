'use client';

import React, { createContext, useContext, useState } from 'react';

interface BookingParams {
  grams?: number;
  bank?: string;
}

interface BookingContextType {
  isModalOpen: boolean;
  modalGrams?: number;
  modalBank?: string;
  openBooking: (grams?: number, bank?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalGrams, setModalGrams] = useState<number | undefined>(undefined);
  const [modalBank, setModalBank] = useState<string | undefined>(undefined);

  const openBooking = (grams?: number, bank?: string) => {
    setModalGrams(grams);
    setModalBank(bank);
    setIsModalOpen(true);
  };

  const closeBooking = () => {
    setIsModalOpen(false);
  };

  return (
    <BookingContext.Provider
      value={{
        isModalOpen,
        modalGrams,
        modalBank,
        openBooking,
        closeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
