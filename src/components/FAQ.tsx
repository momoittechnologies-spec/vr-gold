'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQ() {
  const { isTelugu } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = isTelugu
    ? [
        {
          q: 'బంగారు వ్యాల్యుయేషన్ ఎలా లెక్కించబడుతుంది?',
          a: 'నేటి ప్రత్యక్ష బులియన్ మార్కెట్ బెంచ్‌మార్క్ రేటు ప్రకారం, ఎటువంటి రాపిడి లేదా కరగబెట్టడం లేకుండా జర్మన్ ఎక్స్-రే క్యారెట్‌మీటర్ ద్వారా ఖచ్చితమైన స్వచ్ఛతను పరీక్షించి నికర బరువు ఆధారంగా విలువను లెక్కిస్తాము.',
        },
        {
          q: 'తాకట్టు బంగారం విడిపించి విక్రయించడానికి ఏ పత్రాలు అవసరం?',
          a: '1) ఒరిజినల్ బ్యాంక్ తాకట్టు స్లిప్ లేదా రశీదు, 2) ప్రభుత్వ గుర్తింపు కార్డు (ఆధార్ కార్డ్ / పాన్ కార్డ్), మరియు 3) మీ బ్యాంక్ ఖాతా వివరాలు (నగదు కాకుండా డిజిటల్ బదిలీ కోరుకుంటే).',
        },
        {
          q: 'బ్యాంక్ తాకట్టు రుణాల క్లియరెన్స్ విధానం ఎలా పనిచేస్తుంది?',
          a: 'మా అధికారిక ప్రతినిధి అవసరమైన 100% నిధులతో నేరుగా మీతో పాటు బ్యాంక్ బ్రాంచ్‌కు వస్తారు. కౌంటర్ వద్దే లోన్ మొత్తం చెల్లించి బంగారం విడిపించిన తర్వాత, స్వచ్ఛతను నిర్ధారించి మిగిలిన మిగులు నగదును మీకు అక్కడే అందజేస్తారు.',
        },
        {
          q: 'కడపలో డోర్‌స్టెప్ మరియు బ్యాంక్ ఎస్కార్ట్ సేవ ఉచితమా?',
          a: 'అవును, కడప నగర పరిధి మరియు సమీప ప్రాంతాల్లోని షెడ్యూల్డ్ బ్యాంకుల వద్దకు మా ప్రతినిధి ఉచితంగా హాజరవుతారు. ఎటువంటి ముందస్తు ఫీజులు లేదా అడ్వాన్స్ ఛార్జీలు ఉండవు.',
        },
        {
          q: 'VR GOLD కడప బ్రాంచ్‌ను ఎలా సంప్రదించాలి?',
          a: 'కడప NGO కాలనీ, Y-జంక్షన్ సమీపంలో మృత్యుంజయకుంట శివాలయం పక్కనే మా ఆఫీస్ ఉంది. ఉదయం 9:00 నుండి రాత్రి 8:30 వరకు వారంలో 7 రోజులూ తెరిచి ఉంటుంది. హెల్ప్‌లైన్: 8978973576.',
        },
      ]
    : [
        {
          q: 'How is gold valuation calculated?',
          a: 'Valuation is pegged directly to the daily spot bullion benchmark. Purity is tested non-destructively using a computerized German XRF Karatmeter, and the payout is calculated on the net gold weight without arbitrary deductions.',
        },
        {
          q: 'What documents are required to release and sell pledged gold?',
          a: 'You need: 1) Original bank pledge slip or loan receipt, 2) Valid government identity proof (Aadhaar Card or PAN Card), and 3) Bank account details if opting for instant IMPS transfer rather than cash.',
        },
        {
          q: 'How does bank pledged-gold clearance work?',
          a: 'Our authorized officer accompanies you directly to your bank counter with 100% of the settlement funds. We clear your loan dues directly at the branch, retrieve the ornaments, test purity in your presence, and hand over your surplus cash immediately.',
        },
        {
          q: 'Do you provide doorstep and bank escort assistance?',
          a: 'Yes, our verified field officers provide doorstep assistance and bank branch escort across Kadapa municipal limits and surrounding regional hubs with zero advance fees.',
        },
        {
          q: 'Where is VR GOLD located and what are the working hours?',
          a: 'We are located at D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony, Kadapa. Open Monday to Sunday, 9:00 AM to 8:30 PM. Helpline: 8978973576.',
        },
      ];

  return (
    <section id="faq" className="py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-3 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
            <span style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}>
              {isTelugu ? 'సందేహాలు & సమాధానాలు' : 'Got Questions?'}
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Frequently Asked Questions'}
          </h2>
          <p
            className="text-xs sm:text-sm text-slate-600 mt-2.5"
            style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
          >
            {isTelugu
              ? 'బంగారు విక్రయం మరియు తాకట్టు విడిపించే విధానం గురించి స్పష్టమైన, పారదర్శక సమాధానాలు.'
              : 'Clear, transparent answers about gold valuation and bank loan clearance in Kadapa.'}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-100/60 transition-colors"
                  style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white"
                    style={isTelugu ? { fontFamily: 'var(--font-telugu), sans-serif' } : {}}
                  >
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
