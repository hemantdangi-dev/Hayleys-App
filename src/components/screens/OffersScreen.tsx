import React, { useState } from 'react';
import { Sparkles, Tag, Clock, ShieldCheck, X, CheckCircle, ExternalLink } from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Offer } from '../../types';
import { translations } from '../../translations';

export const OffersScreen: React.FC = () => {
  const { customer, offers, language, startCrossBusinessRedemption } = useLoyalty();
  const t = translations[language];

  const [selectedBU, setSelectedBU] = useState<'ALL' | BusinessUnit>('ALL');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [claimedNotice, setClaimedNotice] = useState<string | null>(null);

  const filteredOffers = offers.filter((o) => {
    return selectedBU === 'ALL' || o.businessUnit === selectedBU;
  });

  const handleClaimOffer = (offer: Offer) => {
    setClaimedNotice(`Offer "${offer.title}" activated! Promo code: ${offer.code || 'HLY-CLAIMED'}`);
    setTimeout(() => {
      setClaimedNotice(null);
      setSelectedOffer(null);
    }, 2500);
  };

  return (
    <div className="space-y-4 px-4 py-3 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
          {t.nav.offers} & Privileges
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Exclusive group privileges across Retail, Leisure, Travels, and Mobility
        </p>
      </div>

      {/* BU Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {(['ALL', 'RETAIL', 'LEISURE', 'TRAVELS', 'MOBILITY'] as const).map((bu) => (
          <button
            key={bu}
            onClick={() => setSelectedBU(bu)}
            className={`px-3 py-1.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-colors ${
              selectedBU === bu
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {bu === 'ALL' ? 'All Offers' : bu}
          </button>
        ))}
      </div>

      {/* Offers Cards */}
      <div className="space-y-3.5">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            onClick={() => setSelectedOffer(offer)}
            className="group rounded-3xl overflow-hidden border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            {/* Image Banner */}
            <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
              <img
                src={offer.image}
                alt={offer.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Tag Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase bg-emerald-800 text-white px-2 py-0.5 rounded-md">
                  {offer.businessUnit}
                </span>
                {offer.isForYou && (
                  <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    For You
                  </span>
                )}
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 flex items-baseline justify-between text-white">
                <span className="text-xl font-extrabold">{offer.discountOrBonus}</span>
                <span className="text-[11px] text-slate-200 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Until {offer.validUntil}</span>
                </span>
              </div>
            </div>

            {/* Offer Body */}
            <div className="p-3.5 space-y-2 text-xs">
              <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors text-sm">
                {offer.title}
              </h3>
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {offer.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">{customer.tier} Member Privilege</span>
                <span className="font-bold text-emerald-700 group-hover:underline">
                  View Terms & Redeem →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Detail Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs uppercase font-bold text-emerald-800">
                {selectedOffer.businessUnit} PRIVILEGE
              </span>
              <button
                onClick={() => setSelectedOffer(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100">
              <img
                src={selectedOffer.image}
                alt={selectedOffer.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="text-emerald-700 font-extrabold text-lg">
                {selectedOffer.discountOrBonus}
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 mt-0.5">
                {selectedOffer.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {selectedOffer.description}
              </p>
            </div>

            {/* Terms */}
            <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-900 block text-[11px]">Eligibility & Terms:</span>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-500">
                {selectedOffer.terms.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
                <li>Valid across authorized Hayleys {selectedOffer.businessUnit} outlets in Sri Lanka.</li>
              </ul>
            </div>

            {claimedNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{claimedNotice}</span>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedOffer(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleClaimOffer(selectedOffer)}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Activate Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
