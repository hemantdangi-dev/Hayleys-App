import React from 'react';
import { X, Coins, ShieldAlert, ArrowDownLeft, Building2, Info } from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';

export const ChangeMoneyModal: React.FC = () => {
  const { wallet, changeMoneyLedger, isChangeMoneyModalOpen, setIsChangeMoneyModalOpen } = useLoyalty();

  if (!isChangeMoneyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-emerald-900 text-white">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-sm">Change Money Account</h3>
              <p className="text-[11px] text-emerald-200">Legal Tender Customer Currency</p>
            </div>
          </div>
          <button
            onClick={() => setIsChangeMoneyModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Display */}
        <div className="p-5 bg-gradient-to-b from-emerald-50 to-white border-b border-slate-100 text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Current Balance (Legal Tender)
          </span>
          <div className="text-3xl font-extrabold text-emerald-900 tabular-nums">
            LKR {wallet.changeMoneyLKR.toFixed(2)}
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-emerald-700 font-medium">
            <Building2 className="w-3.5 h-3.5" />
            <span>Retail Supermarket Checkout Round-ups</span>
          </div>
        </div>

        {/* Regulatory & Segregation Rules Callout */}
        <div className="p-4 bg-amber-50/70 border-b border-amber-200/60 mx-4 my-3 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-[11px] leading-relaxed">
            <strong className="block font-bold text-amber-950">
              Strict Currency Segregation Rules:
            </strong>
            <p>
              • <strong>Customer Money:</strong> Represents real monetary cash change returned from retail store transactions.
            </p>
            <p>
              • <strong>No Expiry:</strong> As legal tender, Change Money never expires unlike promotional points.
            </p>
            <p>
              • <strong>Segregated from Points:</strong> Cannot be converted into reward points or used for cross-business leisure/travel redemptions.
            </p>
          </div>
        </div>

        {/* Ledger Transactions */}
        <div className="flex-1 overflow-y-auto px-5 py-2 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Transaction Activity</span>
            <span>Retail Ledger</span>
          </div>

          <div className="space-y-2.5">
            {changeMoneyLedger.map((tx) => (
              <div
                key={tx.id}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{tx.store}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{tx.notes}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                      <span>{tx.date} · {tx.time}</span>
                      <span>·</span>
                      <span>{tx.receiptRef}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-extrabold text-emerald-700 text-sm tabular-nums block">
                    + LKR {tx.amountLKR.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">
                    Round-up
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Use at any Hayleys Retail Supermarket POS counter</span>
          </div>
          <button
            onClick={() => setIsChangeMoneyModalOpen(false)}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
