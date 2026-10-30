import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Tag,
  Building2,
  Palmtree,
  Car,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit } from '../../types';

export const PromotionDetailModal: React.FC = () => {
  const { selectedPromotion, setSelectedPromotion, customer } = useLoyalty();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [activationMessage, setActivationMessage] = useState<string | null>(null);

  if (!selectedPromotion) return null;

  const getBUIcon = (bu: BusinessUnit) => {
    switch (bu) {
      case 'RETAIL':
        return Building2;
      case 'LEISURE':
        return Palmtree;
      case 'MOBILITY':
        return Car;
      case 'TRAVELS':
        return Compass;
      default:
        return Tag;
    }
  };

  const Icon = getBUIcon(selectedPromotion.businessUnit);

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleActivate = () => {
    setIsActivated(true);
    setActivationMessage(
      `Promotion "${selectedPromotion.title}" is now active on your Silver card! Bonus points will credit on checkout.`
    );
    setTimeout(() => {
      setActivationMessage(null);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
        {/* Top Header & Close button */}
        <div className="relative">
          {/* Picture of the promotion */}
          <div className="relative aspect-16/9 w-full bg-slate-900 overflow-hidden">
            <img
              src={selectedPromotion.image}
              alt={selectedPromotion.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/40" />

            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedPromotion(null);
                setIsActivated(false);
                setActivationMessage(null);
              }}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badges on picture */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase bg-emerald-700/90 text-white px-2.5 py-1 rounded-lg backdrop-blur-xs shadow-xs flex items-center gap-1">
                <Icon className="w-3 h-3" />
                <span>{selectedPromotion.businessUnit} PROMOTION</span>
              </span>
              <span className="text-[10px] font-extrabold bg-amber-400 text-amber-950 px-2 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                <Sparkles className="w-2.5 h-2.5" />
                Special Offer
              </span>
            </div>

            {/* Bottom title & bonus on picture */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
              <div>
                <span className="text-2xl font-black text-amber-300 tracking-tight block">
                  {selectedPromotion.discountOrBonus}
                </span>
                <span className="text-[11px] text-slate-200 font-medium">
                  {customer.tier} Member Privilege
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg font-medium text-slate-200">
                <Clock className="w-3 h-3 text-amber-300" />
                <span>Valid until {selectedPromotion.validUntil}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Feedback Banner */}
          {activationMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-semibold flex items-start gap-2.5 animate-fade-in shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Promotion Activated!</span>
                <span className="text-[11px] text-emerald-700 font-normal leading-relaxed">
                  {activationMessage}
                </span>
              </div>
            </div>
          )}

          {/* Title & Description */}
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {selectedPromotion.title}
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {selectedPromotion.description}
            </p>
          </div>

          {/* Promo Code Card */}
          {selectedPromotion.code && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Promotion Code
                </span>
                <span className="font-mono text-sm font-extrabold text-slate-900 select-all tracking-wider">
                  {selectedPromotion.code}
                </span>
              </div>
              <button
                onClick={() => copyCode(selectedPromotion.code!)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors"
              >
                {copiedCode === selectedPromotion.code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* How to Earn 3-Step Guide */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>How to Claim This Promotion</span>
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center mx-auto">
                  1
                </span>
                <span className="text-[10px] font-bold text-slate-800 block">Buy 2 Items</span>
                <span className="text-[9px] text-slate-500 block leading-tight">
                  Eligible retail items in one bill
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center mx-auto">
                  2
                </span>
                <span className="text-[10px] font-bold text-slate-800 block">Scan Card</span>
                <span className="text-[9px] text-slate-500 block leading-tight">
                  Present your Silver card pass
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px] flex items-center justify-center mx-auto">
                  3
                </span>
                <span className="text-[10px] font-bold text-amber-900 block">+100 Points</span>
                <span className="text-[9px] text-slate-500 block leading-tight">
                  Instant credit to group wallet
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <h4 className="text-[11px] font-bold text-slate-800">Terms & Conditions:</h4>
            <ul className="space-y-1 text-[11px] text-slate-500">
              {selectedPromotion.terms.map((term, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{term}</span>
                </li>
              ))}
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Points can be cross-redeemed across The Kingsbury, Amaya Resorts, and Advantis Mobility.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2.5">
          <button
            onClick={() => {
              setSelectedPromotion(null);
              setIsActivated(false);
              setActivationMessage(null);
            }}
            className="flex-1 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleActivate}
            className={`flex-1 py-2.5 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 ${
              isActivated
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-emerald-800 hover:bg-emerald-700'
            }`}
          >
            {isActivated ? (
              <>
                <Check className="w-4 h-4" />
                <span>Activated</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Activate Promotion</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
