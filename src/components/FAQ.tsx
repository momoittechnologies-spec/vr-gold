"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      q: "How does VR Gold release pledged gold from banks?",
      a: "Our authorized executive visits your bank or finance company (SBI, APGB, Canara, Muthoot, Manappuram) along with you. We pay the full loan balance, interest, and penalties directly to the bank. Once the gold is released, we test its purity using a computerized Karatmeter and immediately pay you the surplus market value in cash or instant bank transfer.",
    },
    {
      q: "కాల్ చేసిన వెంటనే నిజంగానే మా దగ్గరకే వచ్చి డబ్బులు కట్టి విడిపిస్తారా?",
      a: "అవును! మీరు 8978973576 లేదా 8978977465 కు కాల్ చేయగానే, మా ఎగ్జిక్యూటివ్ నేరుగా మీ బ్యాంక్ లేదా ఫైనాన్స్ బ్రాంచ్ వద్దకు వచ్చి పూర్తి నగదు చెల్లించి మీ బంగారాన్ని విడిపిస్తారు. మీకు ఎటువంటి ఇబ్బంది లేకుండా మిగిలిన నగదును అక్కడే మీకు అందిస్తాము.",
    },
    {
      q: "What documents are required to release and sell pledged gold?",
      a: "You need to carry: 1) Original pledge loan slip / bank gold receipt, 2) Valid Government ID (Aadhaar Card / Voter ID / PAN Card), and 3) Passport size photograph.",
    },
    {
      q: "What if the bank loan amount is higher than the gold value?",
      a: "If the accrued interest exceeds the gold value, we will be transparent and inform you beforehand. However, in 95% of cases where gold was pledged in previous years, the current gold market rate is significantly higher, leaving you with substantial surplus cash!",
    },
    {
      q: "How is the gold purity tested?",
      a: "We use an advanced German computerized Karatmeter. It uses non-destructive X-ray fluorescence (XRF) to check exact gold karat (22K 916 / 24K 999) without rubbing on stones or melting.",
    },
    {
      q: "Where is VR Gold located in Kadapa?",
      a: "We are located at D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony, KADAPA. We are open all 7 days from 9:00 AM to 8:30 PM.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-surface-light border-t border-gold-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold-700" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Clear, honest answers about pledged gold clearance and spot cash sales in Kadapa.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-navy-950 text-sm sm:text-base cursor-pointer hover:bg-gold-50/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
