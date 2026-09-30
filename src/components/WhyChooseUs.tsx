"use client";

import React from "react";
import { ShieldCheck, Award, Zap, Coins, Clock, Lock } from "lucide-react";

export default function WhyChooseUs() {
  const points = [
    {
      title: "100% Karatmeter Purity Testing",
      desc: "Zero scraping, zero acids, zero weight loss. Computerized German Karatmeter testing right in front of you.",
      icon: Award,
    },
    {
      title: "Highest Spot Cash Market Rate",
      desc: "We peg our daily rates directly to the live Bullion market in Kadapa, guaranteeing the maximum cash payout per gram.",
      icon: Coins,
    },
    {
      title: "All Banks & NBFCs Covered",
      desc: "We release pledged gold from SBI, Andhra Bank/Union Bank, Canara, APGB, Muthoot, Manappuram, and private finance firms.",
      icon: ShieldCheck,
    },
    {
      title: "Immediate Cash or Bank Transfer",
      desc: "Receive instant hard cash or direct RTGS/IMPS transfer to your bank account within minutes of settlement.",
      icon: Zap,
    },
    {
      title: "Doorstep Bank Assistance",
      desc: "Our executives visit your bank branch directly with the required clearance funds so you have zero hassle.",
      icon: Clock,
    },
    {
      title: "100% Confidential & Secure",
      desc: "All transactions are documented legally with complete customer privacy and confidentiality guaranteed.",
      icon: Lock,
    },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-surface-light border-t border-gold-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-gold-700 bg-gold-100 px-3 py-1 rounded-full">
            Kadapa Trust Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight mt-3">
            Why Kadapa Families Trust VR Gold Buyer&apos;s
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Transparent pricing, zero deductions, computerized purity checks, and respectful customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gold-200/80 hover:border-gold-400 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-700 flex items-center justify-center mb-4 border border-gold-200">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-navy-950 mb-2">{pt.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{pt.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
