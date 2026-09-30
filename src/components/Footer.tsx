"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-400 border-t border-navy-900 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-navy-900">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500 to-amber-700 flex items-center justify-center text-white font-black text-base shadow-md">
                VR
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                VR <span className="text-gold-400">GOLD BUYER&apos;S</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              Kadapa&apos;s trusted gold buyers and pledged gold loan clearance service. We clear bank gold loans with immediate full cash payment, offering maximum daily market value and doorstep convenience across Kadapa district.
            </p>
            <div className="pt-2 text-xs text-gold-300 font-semibold">
              “WE ARE FOR YOU” — Serving Kadapa, NGO Colony, Rayalaseema.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#doorstep" className="hover:text-gold-400 transition-colors">
                  Bank Gold Loan Release
                </Link>
              </li>
              <li>
                <Link href="#doorstep" className="hover:text-gold-400 transition-colors">
                  Doorstep Bank Settlement
                </Link>
              </li>
              <li>
                <Link href="#calculator" className="hover:text-gold-400 transition-colors">
                  Spot Cash for Gold Jewellery
                </Link>
              </li>
              <li>
                <Link href="#calculator" className="hover:text-gold-400 transition-colors">
                  22K / 24K Live Gold Calculator
                </Link>
              </li>
              <li>
                <Link href="#why-us" className="hover:text-gold-400 transition-colors">
                  Karatmeter Purity Testing
                </Link>
              </li>
            </ul>
          </div>

          {/* Branch Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Kadapa Branch
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  D.No. 42/1201, Beside Mruthunjayakunta Sivalayam, Near Y-Junction, NGO Colony, KADAPA.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:8978973576" className="text-white hover:text-gold-400 font-bold transition-colors">
                  +91 89789 73576
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:8978977465" className="text-white hover:text-gold-400 font-bold transition-colors">
                  +91 89789 77465
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} VR GOLD BUYER&apos;S. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            <span>Engineered by</span>
            <a
              href="https://www.momoittechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300 font-bold underline"
            >
              MOMO IT TECHNOLOGIES, Kadapa
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
