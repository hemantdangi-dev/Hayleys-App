import React, { useState } from 'react';
import { X, Search, MapPin, Phone, Clock, Navigation, Building2, Palmtree, Compass, Car } from 'lucide-react';
import { STORE_LOCATIONS } from '../../data/mockData';
import { BusinessUnit, StoreLocation } from '../../types';
import { useLoyalty } from '../../context/LoyaltyContext';

export const StoreLocatorModal: React.FC = () => {
  const { isStoreLocatorOpen, setIsStoreLocatorOpen } = useLoyalty();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBU, setSelectedBU] = useState<BusinessUnit | 'ALL'>('ALL');
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  if (!isStoreLocatorOpen) return null;

  const filteredStores = STORE_LOCATIONS.filter((store) => {
    const matchesBU = selectedBU === 'ALL' || store.businessUnit === selectedBU;
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBU && matchesSearch;
  });

  const getBUIcon = (bu: BusinessUnit) => {
    switch (bu) {
      case 'RETAIL':
        return Building2;
      case 'LEISURE':
        return Palmtree;
      case 'TRAVELS':
        return Compass;
      case 'MOBILITY':
        return Car;
    }
  };

  const handleDirections = (store: StoreLocation) => {
    setCopiedNotice(`Directions simulated for ${store.name}`);
    setTimeout(() => setCopiedNotice(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Hayleys Outlets & Desks</h3>
              <p className="text-[11px] text-slate-500">Participating Group Network Locations</p>
            </div>
          </div>
          <button
            onClick={() => setIsStoreLocatorOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & BU Filter */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by city, store name, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 border border-transparent focus:border-emerald-500 focus:bg-white rounded-xl outline-hidden transition-all"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {(['ALL', 'RETAIL', 'LEISURE', 'TRAVELS', 'MOBILITY'] as const).map((bu) => (
              <button
                key={bu}
                onClick={() => setSelectedBU(bu)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium text-[11px] transition-colors ${
                  selectedBU === bu
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {bu === 'ALL' ? 'All Sectors' : bu}
              </button>
            ))}
          </div>
        </div>

        {/* Location List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {copiedNotice && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center font-medium animate-fade-in">
              {copiedNotice}
            </div>
          )}

          {filteredStores.map((store) => {
            const Icon = getBUIcon(store.businessUnit);
            return (
              <div
                key={store.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{store.name}</h4>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                        {store.businessUnit}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
                    {store.distanceKm} km
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 pl-9">{store.address}</p>

                <div className="pl-9 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{store.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{store.phone}</span>
                  </div>
                </div>

                <div className="pl-9 pt-1">
                  <button
                    onClick={() => handleDirections(store)}
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold hover:underline"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
