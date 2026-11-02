import React, { useState } from 'react';
import {
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
  Filter,
  Sparkles,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Transaction, TransactionType } from '../../types';
import { translations } from '../../translations';

export const ActivityScreen: React.FC = () => {
  const { transactions, language, customer, wallet } = useLoyalty();
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

  // Calculate summary metrics
  const totalEarned = transactions
    .filter((tx) => tx.type === 'EARNED')
    .reduce((acc, curr) => acc + curr.points, 0);
  const totalRedeemed = transactions
    .filter((tx) => tx.type === 'REDEEMED')
    .reduce((acc, curr) => acc + Math.abs(curr.points), 0);

  return (
    <div className="space-y-4 px-4 py-3 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {t.nav.activity} & History
        </h1>
        <p className="text-[11px] text-slate-500 font-medium">
          Unified transaction history across all 4 group sectors
        </p>
      </div>

      {/* Overview Metrics Strip */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs text-center text-xs">
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-500 block uppercase font-medium">Earned</span>
          <span className="font-extrabold text-emerald-700 text-sm tabular-nums">
            +{totalEarned.toLocaleString()}
          </span>
        </div>
        <div className="space-y-0.5 border-x border-slate-100">
          <span className="text-[10px] text-slate-500 block uppercase font-medium">Redeemed</span>
          <span className="font-extrabold text-slate-800 text-sm tabular-nums">
            -{totalRedeemed.toLocaleString()}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-slate-500 block uppercase font-medium">Balance</span>
          <span className="font-extrabold text-slate-900 text-sm tabular-nums">
            {wallet.availablePoints.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Streamlined Filter Controls */}
      <div className="space-y-2">
        {/* Type Filter */}
        <div className="grid grid-cols-4 p-1 bg-slate-200/80 rounded-2xl text-xs font-bold text-center">
          {(['ALL', 'EARNED', 'REDEEMED', 'REVERSED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTypeFilter(filter)}
              className={`py-1.5 rounded-xl transition-all ${
                typeFilter === filter
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter === 'ALL'
                ? 'All'
                : filter.charAt(0) + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* BU Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          {(['ALL', 'RETAIL', 'LEISURE', 'TRAVELS', 'MOBILITY'] as const).map((bu) => (
            <button
              key={bu}
              onClick={() => setBuFilter(bu)}
              className={`px-3 py-1 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                buFilter === bu
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {bu === 'ALL' ? 'All Sectors' : bu}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <Receipt className="w-8 h-8 text-slate-300 mx-auto" />
            <span className="font-bold text-xs text-slate-700 block">No matching transactions</span>
            <p className="text-[11px] text-slate-400">
              Try adjusting your activity or sector filters.
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
                className="p-3 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isEarn ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {isEarn ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-extrabold uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {tx.businessUnit}
                      </span>
                      <span className="text-[10px] text-slate-400">·</span>
                      <span className="text-[10px] text-slate-500">{tx.date}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">
                      {tx.description}
                    </h4>
                    <span className="font-mono text-[9px] text-slate-400 block">
                      Ref: {tx.receiptRef}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-xs sm:text-sm font-extrabold tabular-nums block ${
                      isEarn ? 'text-emerald-800' : 'text-slate-800'
                    }`}
                  >
                    {isEarn ? `+${tx.points}` : tx.points} pts
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium block">
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Transaction Details Modal / Digital Receipt */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="w-full max-w-[370px] bg-white rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-800" />
                <span className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">
                  Transaction Receipt
                </span>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center space-y-1">
              <span
                className={`text-2xl font-black tabular-nums block ${
                  selectedTxn.points > 0 ? 'text-emerald-800' : 'text-slate-800'
                }`}
              >
                {selectedTxn.points > 0 ? `+${selectedTxn.points}` : selectedTxn.points} pts
              </span>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 inline-block">
                {selectedTxn.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Business Sector</span>
                <span className="font-bold text-slate-800 uppercase">{selectedTxn.businessUnit}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Date & Time</span>
                <span className="font-bold text-slate-800">{selectedTxn.date} · {selectedTxn.time}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Receipt Reference</span>
                <span className="font-mono font-bold text-slate-800">{selectedTxn.receiptRef}</span>
              </div>
              {selectedTxn.outletName && (
                <div className="flex justify-between text-slate-500">
                  <span>Outlet</span>
                  <span className="font-bold text-slate-800 text-right max-w-[180px] truncate">{selectedTxn.outletName}</span>
                </div>
              )}
              {selectedTxn.qualifyingSpendLKR && (
                <div className="flex justify-between text-slate-500">
                  <span>Qualifying Spend</span>
                  <span className="font-bold text-slate-800">LKR {selectedTxn.qualifyingSpendLKR.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-200/80">
                <span>Member Tier</span>
                <span className="font-bold text-slate-800">{customer.tier} Member</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              Points are authorized across Hayleys group loyalty network and redeemable in Retail, Leisure, Travels, and Mobility.
            </p>

            <button
              onClick={() => setSelectedTxn(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
