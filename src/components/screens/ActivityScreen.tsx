import React, { useState } from 'react';
import {
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  Building2,
  Palmtree,
  Compass,
  Car,
  Receipt,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Transaction, TransactionType } from '../../types';
import { translations } from '../../translations';

export const ActivityScreen: React.FC = () => {
  const { transactions, language } = useLoyalty();
  const t = translations[language];

  const [typeFilter, setTypeFilter] = useState<'ALL' | TransactionType>('ALL');
  const [buFilter, setBuFilter] = useState<'ALL' | BusinessUnit>('ALL');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

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

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = typeFilter === 'ALL' || tx.type === typeFilter;
    const matchesBU = buFilter === 'ALL' || tx.businessUnit === buFilter;
    return matchesType && matchesBU;
  });

  return (
    <div className="space-y-4 px-4 py-3 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
          {t.nav.activity} & Ledger
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Unified transaction history across all four participating sectors
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-2">
        {/* Type Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {(['ALL', 'EARNED', 'REDEEMED', 'REVERSED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTypeFilter(filter)}
              className={`px-3 py-1.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-colors ${
                typeFilter === filter
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {filter === 'ALL' ? 'All Activity' : filter.charAt(0) + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* BU Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          {(['ALL', 'RETAIL', 'LEISURE', 'TRAVELS', 'MOBILITY'] as const).map((bu) => (
            <button
              key={bu}
              onClick={() => setBuFilter(bu)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                buFilter === bu
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {bu === 'ALL' ? 'All Sectors' : bu}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2.5">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <Receipt className="w-8 h-8 text-slate-300 mx-auto" />
            <span className="font-bold text-xs text-slate-700 block">No matching transactions</span>
            <p className="text-[11px] text-slate-400">
              Try adjusting your activity filters.
            </p>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const Icon = getBUIcon(tx.businessUnit);
            const isEarn = tx.points > 0;

            return (
              <div
                key={tx.id}
                onClick={() => setSelectedTxn(tx)}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isEarn ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {isEarn ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                      <span className="font-bold uppercase text-emerald-800">{tx.businessUnit}</span>
                      <span>·</span>
                      <span>{tx.date}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">
                      {tx.description}
                    </h4>
                    <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                      Ref: {tx.receiptRef}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`font-extrabold text-sm tabular-nums block ${
                      isEarn ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {isEarn ? `+${tx.points}` : tx.points} pts
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Transaction Detail Sheet */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-xs text-slate-900">Transaction Details</h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Sector:</span>
                  <span className="font-bold text-emerald-800 uppercase">{selectedTxn.businessUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Points Movement:</span>
                  <span
                    className={`font-extrabold tabular-nums ${
                      selectedTxn.points > 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {selectedTxn.points > 0 ? `+${selectedTxn.points}` : selectedTxn.points} pts
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-slate-800">{selectedTxn.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-mono text-slate-700">{selectedTxn.date} · {selectedTxn.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reference:</span>
                  <span className="font-mono text-slate-800 font-bold">{selectedTxn.receiptRef}</span>
                </div>
                {selectedTxn.outletName && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Outlet / Desk:</span>
                    <span className="text-slate-800 text-right">{selectedTxn.outletName}</span>
                  </div>
                )}
                {selectedTxn.qualifyingSpendLKR && (
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-500">Qualifying Spend:</span>
                    <span className="font-bold text-slate-900 font-mono">
                      LKR {selectedTxn.qualifyingSpendLKR.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedTxn(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
