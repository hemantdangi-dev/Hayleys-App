import React, { useState } from 'react';
import { Sparkles, Clock, ArrowRight, Tag, Building2, Palmtree, Compass, Car } from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Offer } from '../../types';
import { translations } from '../../translations';

export const OffersScreen: React.FC = () => {
  const { customer, offers, language, setSelectedPromotion } = useLoyalty();
  const t = translations[language];

  const [selectedBU, setSelectedBU] = useState<'ALL' | BusinessUnit>('ALL');

  const filteredOffers = offers.filter((o) => {
    return selectedBU === 'ALL' || o.businessUnit === selectedBU;
  });

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

  return (
    <div className="space-y-4 px-4 py-3.5 pb-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
            {t.nav.offers} & Privileges
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Exclusive group benefits across Retail, Leisure, Travels, and Mobility
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
          {filteredOffers.length} Active
        </span>
      </div>

      {/* BU Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {(['ALL', 'RETAIL', 'LEISURE', 'TRAVELS', 'MOBILITY'] as const).map((bu) => {
          const isSelected = selectedBU === bu;
          return (
            <button
              key={bu}
              onClick={() => setSelectedBU(bu)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {bu === 'ALL' ? 'All Sectors' : bu}
            </button>
          );
        })}
      </div>

      {/* Offers Cards */}
      <div className="space-y-3.5">
        {filteredOffers.map((offer) => {
          const Icon = getBUIcon(offer.businessUnit);
          return (
            <div
              key={offer.id}
              onClick={() => setSelectedPromotion(offer)}
              className="group rounded-3xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col active:scale-99"
            >
              {/* Image Banner */}
              <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase bg-emerald-900/90 text-white px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1 shadow-xs">
                    <Icon className="w-3 h-3" />
                    <span>{offer.businessUnit}</span>
                  </span>
                  {offer.isForYou && (
                    <span className="text-[10px] font-extrabold bg-amber-400 text-amber-950 px-2 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      For You
                    </span>
                  )}
                </div>

                {/* Bottom Value & Expiry on picture */}
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-baseline justify-between text-white">
                  <span className="text-xl font-black text-amber-300 tracking-tight">
                    {offer.discountOrBonus}
                  </span>
                  <span className="text-[11px] text-slate-200 flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md font-medium">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>Until {offer.validUntil}</span>
                  </span>
                </div>
              </div>

              {/* Offer Body */}
              <div className="p-3.5 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors text-sm leading-snug">
                    {offer.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {offer.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">
                    {customer.tier} Tier Privilege
                  </span>
                  <span className="font-bold text-emerald-800 group-hover:text-emerald-700 flex items-center gap-1">
                    <span>View Details & Code</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

