import React, { useState } from 'react';
import { X, SunMedium, ShieldCheck, Info } from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { HayleysLogo } from '../common/HayleysLogo';

export const DigitalCardModal: React.FC = () => {
  const { customer, isDigitalCardOpen, setIsDigitalCardOpen } = useLoyalty();
  const [highBrightness, setHighBrightness] = useState(false);

  if (!isDigitalCardOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div
        className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
          highBrightness ? 'bg-white filter brightness-110' : 'bg-slate-900 text-white'
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wide uppercase text-emerald-300">
              Hayleys {customer.tier} Pass
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHighBrightness(!highBrightness)}
              className={`p-1.5 rounded-full text-xs transition-colors flex items-center gap-1 ${
                highBrightness
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              title="Toggle scanner high-brightness mode"
            >
              <SunMedium className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsDigitalCardOpen(false)}
              className="p-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 text-center space-y-5">
          <div className="flex justify-center">
            <HayleysLogo variant={highBrightness ? 'green' : 'white'} size="md" showSubtitle={true} />
          </div>

          <div>
            <h2
              className={`text-xl font-extrabold tracking-tight ${
                highBrightness ? 'text-slate-900' : 'text-white'
              }`}
            >
              {customer.name}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1 text-xs text-emerald-500 font-medium">
              <span className="font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                {customer.tier} Tier
              </span>
              <span>·</span>
              <span>Member Since {customer.joinedYear}</span>
            </div>
            <div
              className={`font-mono text-sm tracking-widest font-bold mt-2 ${
                highBrightness ? 'text-slate-700' : 'text-emerald-300'
              }`}
            >
              {customer.membershipId}
            </div>
          </div>

          {/* QR Code Graphic Box */}
          <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mx-auto border border-slate-200">
            {/* SVG QR Code Simulation */}
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="mx-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary */}
              <rect width="160" height="160" fill="white" />
              {/* QR Finder Pattern Top-Left */}
              <rect x="10" y="10" width="40" height="40" rx="4" fill="#006837" />
              <rect x="18" y="18" width="24" height="24" rx="2" fill="white" />
              <rect x="24" y="24" width="12" height="12" rx="1" fill="#006837" />

              {/* QR Finder Pattern Top-Right */}
              <rect x="110" y="10" width="40" height="40" rx="4" fill="#006837" />
              <rect x="118" y="18" width="24" height="24" rx="2" fill="white" />
              <rect x="124" y="24" width="12" height="12" rx="1" fill="#006837" />

              {/* QR Finder Pattern Bottom-Left */}
              <rect x="10" y="110" width="40" height="40" rx="4" fill="#006837" />
              <rect x="18" y="118" width="24" height="24" rx="2" fill="white" />
              <rect x="24" y="124" width="12" height="12" rx="1" fill="#006837" />

              {/* Data pattern matrices */}
              <g fill="#0f172a">
                <rect x="60" y="15" width="8" height="8" />
                <rect x="75" y="15" width="8" height="8" />
                <rect x="90" y="15" width="8" height="8" />
                <rect x="60" y="30" width="8" height="8" />
                <rect x="75" y="45" width="8" height="8" />
                <rect x="90" y="30" width="8" height="8" />

                <rect x="15" y="60" width="8" height="8" />
                <rect x="30" y="75" width="8" height="8" />
                <rect x="45" y="60" width="8" height="8" />
                <rect x="60" y="60" width="8" height="8" />
                <rect x="75" y="75" width="8" height="8" />
                <rect x="90" y="60" width="8" height="8" />
                <rect x="105" y="75" width="8" height="8" />
                <rect x="120" y="60" width="8" height="8" />
                <rect x="135" y="75" width="8" height="8" />

                <rect x="15" y="90" width="8" height="8" />
                <rect x="30" y="90" width="8" height="8" />
                <rect x="60" y="90" width="8" height="8" />
                <rect x="75" y="90" width="8" height="8" />
                <rect x="105" y="90" width="8" height="8" />
                <rect x="135" y="90" width="8" height="8" />

                <rect x="60" y="120" width="8" height="8" />
                <rect x="75" y="105" width="8" height="8" />
                <rect x="90" y="120" width="8" height="8" />
                <rect x="105" y="135" width="8" height="8" />
                <rect x="120" y="120" width="8" height="8" />
                <rect x="135" y="135" width="8" height="8" />
              </g>

              {/* Center Hayleys emblem */}
              <circle cx="80" cy="80" r="14" fill="#006837" />
              <text
                x="80"
                y="85"
                textAnchor="middle"
                fill="white"
                fontFamily="sans-serif"
                fontWeight="bold"
                fontSize="12"
              >
                H
              </text>
            </svg>

            {/* Clean QR details below (barcode removed) */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between px-2 text-[11px]">
              <span className="font-mono font-bold text-slate-800 tracking-wider">
                {customer.membershipId}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                QR Pass
              </span>
            </div>
          </div>

          {/* Usage notice */}
          <div
            className={`p-3 rounded-xl text-left flex items-start gap-2.5 text-xs ${
              highBrightness ? 'bg-slate-100 text-slate-700' : 'bg-white/5 text-slate-300'
            }`}
          >
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              Present this card at checkouts across <strong>Retail, Leisure, Travels, and Mobility</strong> to earn and redeem group points.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 text-center">
          <button
            onClick={() => setIsDigitalCardOpen(false)}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
