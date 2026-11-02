import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  ZapOff,
  QrCode,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Receipt,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit } from '../../types';

interface DummyStoreReceipt {
  id: string;
  businessUnit: BusinessUnit;
  storeName: string;
  location: string;
  receiptNumber: string;
  spendLKR: number;
  pointsToEarn: number;
  description: string;
}

const DUMMY_STORE_QRS: DummyStoreReceipt[] = [
  {
    id: 'DUMMY-RET',
    businessUnit: 'RETAIL',
    storeName: 'Hayleys Retail Supermarket',
    location: 'Colombo 03',
    receiptNumber: 'POS-RET-94218',
    spendLKR: 12500,
    pointsToEarn: 250,
    description: 'Fresh groceries & Ceylon tea',
  },
  {
    id: 'DUMMY-LEI',
    businessUnit: 'LEISURE',
    storeName: 'The Kingsbury Colombo',
    location: 'The Ocean Restaurant',
    receiptNumber: 'POS-HTL-81920',
    spendLKR: 45000,
    pointsToEarn: 450,
    description: 'Dining experience',
  },
  {
    id: 'DUMMY-TRV',
    businessUnit: 'TRAVELS',
    storeName: 'Hayleys Travels & Tours',
    location: 'Colombo 10',
    receiptNumber: 'POS-TRV-73619',
    spendLKR: 35000,
    pointsToEarn: 350,
    description: 'Scenic Ella tour package',
  },
  {
    id: 'DUMMY-MOB',
    businessUnit: 'MOBILITY',
    storeName: 'Hayleys Advantis Mobility',
    location: 'Airport Desk',
    receiptNumber: 'POS-MOB-62810',
    spendLKR: 18000,
    pointsToEarn: 180,
    description: 'Executive airport transfer',
  },
];

export const ScanQRModal: React.FC = () => {
  const {
    isScanQROpen,
    setIsScanQROpen,
    simulateEarn,
    wallet,
    setActiveTab,
  } = useLoyalty();

  const [torchOn, setTorchOn] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<DummyStoreReceipt | null>(null);
  const [scanState, setScanState] = useState<'VIEWFINDER' | 'SCANNED' | 'SUCCESS'>('VIEWFINDER');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isScanQROpen) {
      setScanState('VIEWFINDER');
      setSelectedReceipt(null);
      setIsProcessing(false);
    }
  }, [isScanQROpen]);

  if (!isScanQROpen) return null;

  const handleSelectStoreQR = (receipt: DummyStoreReceipt) => {
    setSelectedReceipt(receipt);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setScanState('SCANNED');
    }, 450);
  };

  const handleConfirmEarn = () => {
    if (!selectedReceipt) return;

    setIsProcessing(true);
    setTimeout(() => {
      simulateEarn(
        selectedReceipt.businessUnit,
        selectedReceipt.pointsToEarn,
        `${selectedReceipt.storeName} (${selectedReceipt.receiptNumber})`,
        selectedReceipt.spendLKR
      );
      setIsProcessing(false);
      setScanState('SUCCESS');
    }, 350);
  };

  const handleClose = () => {
    setIsScanQROpen(false);
    setTimeout(() => {
      setScanState('VIEWFINDER');
      setSelectedReceipt(null);
      setTorchOn(false);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full max-w-[390px] h-full sm:h-[680px] max-h-[92vh] bg-slate-950 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl sm:rounded-3xl border border-slate-800">
        {/* Top Minimal Bar */}
        <div className="relative z-10 px-5 pt-4 pb-3 flex items-center justify-between border-b border-white/5 bg-slate-950/80">
          <h3 className="font-semibold text-sm text-slate-200">
            Scan QR Code
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTorchOn(!torchOn)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                torchOn
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              title="Toggle Flash"
            >
              {torchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewfinder Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4">
          {scanState === 'VIEWFINDER' && (
            <div className="w-full flex flex-col items-center space-y-4 my-auto">
              {/* Clean Viewfinder Frame */}
              <div
                onClick={() => handleSelectStoreQR(DUMMY_STORE_QRS[0])}
                className="relative w-60 h-60 border border-white/15 rounded-3xl flex items-center justify-center overflow-hidden bg-black/40 shadow-inner cursor-pointer group"
                title="Tap to scan demo receipt"
              >
                {/* 4 Corner Brackets */}
                <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
                <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />

                {/* Animated Laser Scanning Beam */}
                <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#34d399] animate-[bounce_2.5s_infinite]" />

                {/* Center QR Watermark */}
                <QrCode className="w-20 h-20 text-white/15 stroke-[1]" />

                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-950/85 flex flex-col items-center justify-center gap-2 animate-fade-in">
                    <div className="w-7 h-7 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-medium text-emerald-300">
                      Reading QR...
                    </span>
                  </div>
                )}
              </div>

              {/* Single Simple Subtitle */}
              <p className="text-xs text-slate-400 text-center">
                Align checkout or invoice QR code within frame
              </p>
            </div>
          )}

          {/* STATE 2: DETECTED INVOICE CONFIRMATION */}
          {scanState === 'SCANNED' && selectedReceipt && (
            <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 animate-scale-up text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      {selectedReceipt.businessUnit}
                    </span>
                    <h4 className="font-semibold text-xs text-white truncate max-w-[150px]">
                      {selectedReceipt.storeName}
                    </h4>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedReceipt.receiptNumber}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between items-center text-slate-400 text-[11px]">
                    <span>Location:</span>
                    <span className="text-slate-200">{selectedReceipt.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 text-[11px]">
                    <span>Bill Amount:</span>
                    <span className="font-semibold text-white">
                      LKR {selectedReceipt.spendLKR.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-semibold block uppercase">
                      Points to Earn
                    </span>
                    <span className="text-xl font-bold text-emerald-300">
                      +{selectedReceipt.pointsToEarn} pts
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Group Wallet
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setScanState('VIEWFINDER')}
                  className="flex-1 py-2.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmEarn}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Crediting...</span>
                  ) : (
                    <>
                      <span>Credit Points</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: CLEAN SUCCESS STATE */}
          {scanState === 'SUCCESS' && selectedReceipt && (
            <div className="w-full max-w-xs bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-xl text-center space-y-4 animate-scale-up">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-white">
                  Points Credited
                </h3>
                <p className="text-xs text-slate-400">
                  Earned at {selectedReceipt.storeName}
                </p>
              </div>

              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5">
                <div className="text-emerald-400 font-bold text-2xl">
                  +{selectedReceipt.pointsToEarn} pts
                </div>
                <div className="pt-1.5 border-t border-slate-800/80 flex justify-between text-xs text-slate-400">
                  <span>New Balance:</span>
                  <strong className="text-white">
                    {wallet.availablePoints.toLocaleString()} pts
                  </strong>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Updated in Group Wallet Activity</span>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setScanState('VIEWFINDER')}
                  className="flex-1 py-2.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  Scan More
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    setActiveTab('activity');
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl transition-all cursor-pointer"
                >
                  View Activity
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Minimal Sector Bar for Web Demonstration */}
        {scanState === 'VIEWFINDER' && (
          <div className="relative z-10 px-4 py-3.5 border-t border-white/5 bg-slate-950/90 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Simulate Checkout Scan</span>
              <span className="text-[10px] text-slate-500">Tap sector</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {DUMMY_STORE_QRS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectStoreQR(item)}
                  className="py-2 px-1 rounded-xl bg-white/5 hover:bg-emerald-950/40 active:scale-98 border border-white/10 hover:border-emerald-500/40 text-center transition-all cursor-pointer"
                >
                  <span className="block text-[11px] font-medium text-slate-200">
                    {item.businessUnit.charAt(0) + item.businessUnit.slice(1).toLowerCase()}
                  </span>
                  <span className="block text-[10px] font-semibold text-emerald-400">
                    +{item.pointsToEarn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
