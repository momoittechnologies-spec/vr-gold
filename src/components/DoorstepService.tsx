"use client";

import React from "react";
import { Phone, CheckCircle2, Building, ShieldCheck, ArrowRight, Wallet, Clock, Users } from "lucide-react";

export default function DoorstepService() {
  const steps = [
    {
      num: "01",
      title: "Call Or WhatsApp Our Kadapa Desk",
      desc: "Contact 8978973576 or 8978977465 with your bank pledge receipt / loan slip and get an immediate estimation.",
      icon: Phone,
    },
    {
      num: "02",
      title: "We Arrive At Your Bank / Finance Branch",
      desc: "Our executive meets you directly at SBI, Andhra Pragathi Grameena Bank, Canara Bank, Muthoot, or Manappuram in Kadapa.",
      icon: Building,
    },
    {
      num: "03",
      title: "We Pay The Full Loan Settlement",
      desc: "VR Gold clears the complete principal and accrued interest directly with the bank/finance company counter.",
      icon: Wallet,
    },
    {
      num: "04",
      title: "Collect Your Released Gold & Cash Difference",
      desc: "Your gold is officially released. We verify purity in front of you and pay you the remaining cash or instant UPI balance.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="doorstep" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-300">
            <span>కాల్ చేసిన వెంటనే మీ దగ్గరకే వచ్చి డబ్బులు కట్టి విడిపించబడును</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
            Doorstep Bank Gold Release in Kadapa
          </h2>
          <p className="text-base text-gray-600 mt-4 leading-relaxed">
            Stop worrying about arranging tens of thousands of rupees to clear your gold loan. We provide the full cash backing, visit the bank with you, and settle everything on the spot.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-gray-50 hover:bg-gold-50/50 border border-gray-200 hover:border-gold-300 transition-all group relative"
              >
                <div className="text-3xl font-black text-gold-400 group-hover:text-gold-600 transition-colors mb-3">
                  {step.num}
                </div>
                <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-navy-950 mb-2">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Direct Callout Card */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block">
              Urgent Cash Need in Kadapa?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Do not let high bank interest eat up your gold&apos;s true value.
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Call us now. We will dispatch our authorized executive to your location anywhere across Kadapa city and nearby mandals.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:8978973576"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-black text-xs shadow-lg transition-transform hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>Call 8978973576</span>
            </a>
            <a
              href="tel:8978977465"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call 8978977465</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
