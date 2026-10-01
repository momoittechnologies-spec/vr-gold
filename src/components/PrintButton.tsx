'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 text-xs font-black text-navy-950 bg-gold-400 hover:bg-gold-500 px-6 py-2.5 rounded-xl shadow-md transition-transform hover:scale-105 cursor-pointer"
    >
      <Printer className="w-4 h-4 text-navy-950" />
      <span>Print Official Voucher (A4)</span>
    </button>
  );
}
