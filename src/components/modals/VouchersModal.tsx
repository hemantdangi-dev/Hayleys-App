import React, { useState } from 'react';
import {
  X,
  Ticket,
  Copy,
  Check,
  Palmtree,
  Building2,
  Car,
  Compass,
  Calendar,
  Sparkles,
  QrCode,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Voucher } from '../../types';

export const VouchersModal: React.FC = () => {
  const { vouchers, isVouchersModalOpen, setIsVouchersModalOpen, markVoucherUsed } = useLoyalty();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedVoucherForBarcode, setSelectedVoucherForBarcode] = useState<Voucher | null>(null);
  const [redeemedNotice, setRedeemedNotice] = useState<string | null>(null);

  if (!isVouchersModalOpen) return null;

  const activeVouchers = vouchers.filter((v) => v.status === 'ACTIVE');

  const getBUIcon = (bu: BusinessUnit) => {
    switch (bu) {
      case 'LEISURE':
        return Palmtree;
      case 'RETAIL':
        return Building2;
      case 'MOBILITY':
        return Car;
      case 'TRAVELS':
        return Compass;
      default:
        return Ticket;
    }
  };

  const getBUBadgeColor = (bu: BusinessUnit) => {
    switch (bu) {
      case 'LEISURE':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'RETAIL':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'MOBILITY':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'TRAVELS':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleUseVoucher = (v: Voucher) => {
    markVoucherUsed(v.id);
    setRedeemedNotice(`Voucher "${v.rewardName}" redeemed successfully!`);
    setTimeout(() => {
      setRedeemedNotice(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold tracking-tight">My Active Vouchers</h2>
                <span className="text-[11px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                  {activeVouchers.length} Active
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/90 font-medium">
                Directly redeemable across all 4 Hayleys sectors
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsVouchersModalOpen(false);
              setSelectedVoucherForBarcode(null);
            }}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback Alert */}
        {redeemedNotice && (
          <div className="mx-4 mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{redeemedNotice}</span>
          </div>
        )}

        {/* Content list */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto flex-1">
          {activeVouchers.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <Ticket className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No active vouchers right now</p>
              <p className="text-xs text-slate-500">
                Redeem your loyalty points for hotel dining, retail shopping, or travel privileges.
              </p>
            </div>
          ) : (
            activeVouchers.map((v) => {
              const Icon = getBUIcon(v.businessUnit);
              const isSelected = selectedVoucherForBarcode?.id === v.id;

              return (
                <div
                  key={v.id}
                  className={`rounded-2xl border overflow-hidden transition-all ${
                    isSelected
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/20 shadow-md'
                      : 'border-slate-200 bg-white hover:border-emerald-300 shadow-xs'
                  }`}
                >
                  {/* Photo against voucher */}
                  <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={v.image || '/src/assets/images/hayleys_retail_supermarket_1792998392386.jpg'}
                      alt={v.rewardName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border flex items-center gap-1 shadow-xs ${getBUBadgeColor(
                          v.businessUnit
                        )}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{v.businessUnit}</span>
                      </span>
                      {v.rewardName.includes('1000') || v.rewardName.includes('1,000') ? (
                        <span className="text-[10px] font-bold bg-amber-400 text-amber-950 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-2.5 h-2.5 text-amber-900" />
                          Special Voucher
                        </span>
                      ) : null}
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-[10px] font-bold text-white bg-emerald-600/95 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
                        ACTIVE
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 flex items-baseline justify-between text-white">
                      <span className="font-mono text-xs font-bold bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                        {v.code}
                      </span>
                      <span className="text-[10px] text-slate-200 font-medium">
                        Expires {v.expiryDate}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2.5">
                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                      {v.rewardName}
                    </h3>

                    {/* Outlet Instructions */}
                    <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {v.outletInstructions}
                    </p>

                  {/* Code & Actions Bar */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1.5 rounded-xl border border-slate-200/80">
                      <span className="font-mono text-xs font-bold text-slate-800 select-all">
                        {v.code}
                      </span>
                      <button
                        onClick={() => copyToClipboard(v.code)}
                        className="p-1 text-slate-500 hover:text-emerald-700 transition-colors"
                        title="Copy voucher code"
                      >
                        {copiedCode === v.code ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setSelectedVoucherForBarcode(isSelected ? null : v)
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                        }`}
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>{isSelected ? 'Hide Barcode' : 'Show Barcode'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Barcode & QR Code Drawer */}
                  {isSelected && (
                    <div className="mt-3 p-4 bg-slate-900 text-white rounded-2xl space-y-3 text-center border border-slate-800 animate-fade-in">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Cashier Digital Scan Ready</span>
                      </div>

                      {/* Barcode representation */}
                      <div className="bg-white p-3 rounded-xl inline-block mx-auto">
                        <div className="flex items-center justify-center h-12 gap-[2px] px-2">
                          {[3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 2, 3, 1, 2, 4, 1, 3].map(
                            (width, i) => (
                              <div
                                key={i}
                                className="bg-black h-full"
                                style={{ width: `${width * 1.5}px` }}
                              />
                            )
                          )}
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-800 tracking-wider block mt-1">
                          {v.code}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-300 px-2 pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Expires: {v.expiryDate}</span>
                        </span>
                        <button
                          onClick={() => handleUseVoucher(v)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-colors"
                        >
                          Simulate Redeem
                        </button>
                      </div>
                    </div>
                  )}

                  {!isSelected && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Valid until: {v.expiryDate}</span>
                      </span>
                      <span className="text-slate-400 font-mono">ID: {v.id}</span>
                    </div>
                  )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Points debited upon initial redemption
          </span>
          <button
            onClick={() => {
              setIsVouchersModalOpen(false);
              setSelectedVoucherForBarcode(null);
            }}
            className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
