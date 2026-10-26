import React, { useState, useEffect } from 'react';
import {
  X,
  Zap,
  ZapOff,
  RefreshCw,
  QrCode,
  Building2,
  Palmtree,
  Compass,
  Car,
  CheckCircle2,
  Sparkles,
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
  qrPattern: string;
}

const DUMMY_STORE_QRS: DummyStoreReceipt[] = [
  {
    id: 'DUMMY-RET',
    businessUnit: 'RETAIL',
    storeName: 'Hayleys Retail Supermarket',
    location: 'Flagship Store - Colombo 03',
    receiptNumber: 'POS-RET-94218',
    spendLKR: 12500,
    pointsToEarn: 250,
    description: 'Weekly grocery, Ceylon tea & fresh produce',
    qrPattern: 'HLY-RETAIL-POS-94218-LKR12500',
  },
  {
    id: 'DUMMY-LEI',
    businessUnit: 'LEISURE',
    storeName: 'The Kingsbury Colombo',
    location: 'The Ocean Seafood & Grill',
    receiptNumber: 'POS-HTL-81920',
    spendLKR: 45000,
    pointsToEarn: 450,
    description: 'Dinner dining experience at The Kingsbury',
    qrPattern: 'HLY-LEISURE-HTL-81920-LKR45000',
  },
  {
    id: 'DUMMY-TRV',
    businessUnit: 'TRAVELS',
    storeName: 'Hayleys Travels & Tours',
    location: 'Experience Centre - Colombo 10',
    receiptNumber: 'POS-TRV-73619',
    spendLKR: 35000,
    pointsToEarn: 350,
    description: 'Scenic Ella mountain rail excursion package',
    qrPattern: 'HLY-TRAVELS-TRV-73619-LKR35000',
  },
  {
    id: 'DUMMY-MOB',
    businessUnit: 'MOBILITY',
    storeName: 'Hayleys Advantis Mobility',
    location: 'BIA Airport Desk - Katunayake',
    receiptNumber: 'POS-MOB-62810',
    spendLKR: 18000,
    pointsToEarn: 180,
    description: 'VIP Executive airport transfer booking',
    qrPattern: 'HLY-MOBILITY-MOB-62810-LKR18000',
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
  const [cameraFacing, setCameraFacing] = useState<'back' | 'front'>('back');
  const [selectedReceipt, setSelectedReceipt] = useState<DummyStoreReceipt | null>(null);
  const [scanState, setScanState] = useState<'VIEWFINDER' | 'SCANNED' | 'SUCCESS'>('VIEWFINDER');
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-reset when opened
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

    // Simulate scanning beam locking onto QR code
    setTimeout(() => {
      setIsProcessing(false);
      setScanState('SCANNED');
    }, 600);
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
    }, 400);
  };

  const handleClose = () => {
    setIsScanQROpen(false);
    setTimeout(() => {
      setScanState('VIEWFINDER');
      setSelectedReceipt(null);
      setTorchOn(false);
    }, 200);
  };

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

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-fade-in">
      <div className="w-full md:max-w-md h-full md:h-[820px] bg-slate-950 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl md:rounded-[40px] border border-slate-800">
        {/* Camera simulated background grain */}
        <div
          className={`absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none transition-all duration-300 ${
            torchOn ? 'filter brightness-150 contrast-125' : ''
          }`}
          style={{
            backgroundImage:
              'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)',
          }}
        />

        {/* Top Controls Bar */}
        <div className="relative z-10 px-5 pt-5 pb-3 flex items-center justify-between border-b border-white/10 bg-slate-950/70 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-xs tracking-wider uppercase text-emerald-300">
              Hayleys Store Scanner
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Torch toggle */}
            <button
              onClick={() => setTorchOn(!torchOn)}
              className={`p-2 rounded-full text-xs transition-colors cursor-pointer ${
                torchOn
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/50'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              title="Toggle Flashlight"
            >
              {torchOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
            </button>

            {/* Camera facing switch */}
            <button
              onClick={() => setCameraFacing(cameraFacing === 'back' ? 'front' : 'back')}
              className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 text-xs transition-colors cursor-pointer"
              title="Switch Camera"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Viewfinder / Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-4">
          {scanState === 'VIEWFINDER' && (
            <div className="w-full flex flex-col items-center space-y-4 my-auto">
              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-base text-white tracking-tight">
                  Point Camera at Checkout QR
                </h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Scan the dynamic invoice QR code printed on your receipt or POS counter screen.
                </p>
              </div>

              {/* Viewfinder Frame */}
              <div className="relative w-64 h-64 border-2 border-white/20 rounded-3xl flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-2xs shadow-inner">
                {/* 4 Viewfinder Target Corner Brackets */}
                <div className="absolute top-2 left-2 w-7 h-7 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
                <div className="absolute top-2 right-2 w-7 h-7 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
                <div className="absolute bottom-2 left-2 w-7 h-7 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
                <div className="absolute bottom-2 right-2 w-7 h-7 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />

                {/* Animated Laser Scanning Beam */}
                <div className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-[bounce_2s_infinite]" />

                {/* Faint Center Reticle */}
                <div className="text-white/20">
                  <QrCode className="w-24 h-24 stroke-[1]" />
                </div>

                {isProcessing && (
                  <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 animate-fade-in">
                    <div className="w-8 h-8 border-3 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-bold text-emerald-300">
                      Reading Invoice QR...
                    </span>
                  </div>
                )}
              </div>

              {/* Instructional Note */}
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/80 font-medium bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-800/40">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tap any dummy store QR below to test live earn</span>
              </div>
            </div>
          )}

          {/* STATE 2: DETECTED INVOICE CONFIRMATION */}
          {scanState === 'SCANNED' && selectedReceipt && (
            <div className="w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl space-y-4 animate-scale-up text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-900/60 text-emerald-400 flex items-center justify-center font-bold">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      {selectedReceipt.businessUnit} INVOICE VERIFIED
                    </span>
                    <h4 className="font-bold text-sm text-white">
                      {selectedReceipt.storeName}
                    </h4>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {selectedReceipt.receiptNumber}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Outlet Location:</span>
                    <span className="text-slate-200 font-medium">{selectedReceipt.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Purchase Summary:</span>
                    <span className="text-slate-200 font-medium text-right max-w-[180px] truncate">
                      {selectedReceipt.description}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-slate-800">
                    <span>Total Qualifying Spend:</span>
                    <span className="font-extrabold text-sm text-white font-mono">
                      LKR {selectedReceipt.spendLKR.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Points to Credit Callout */}
                <div className="p-3.5 bg-gradient-to-r from-emerald-900/40 via-emerald-800/30 to-slate-900 rounded-2xl border border-emerald-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-300 font-bold uppercase block">
                      Reward Points Earned
                    </span>
                    <span className="text-2xl font-extrabold text-emerald-300 tabular-nums">
                      +{selectedReceipt.pointsToEarn} pts
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <span>Credited into</span>
                    <strong className="block text-slate-200">Shared Group Wallet</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setScanState('VIEWFINDER')}
                  className="flex-1 py-3 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  Rescan
                </button>
                <button
                  onClick={handleConfirmEarn}
                  disabled={isProcessing}
                  className="flex-2 py-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Crediting Points...</span>
                  ) : (
                    <>
                      <span>Accept & Credit Points</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: CELEBRATORY SUCCESS STATE */}
          {scanState === 'SUCCESS' && selectedReceipt && (
            <div className="w-full max-w-sm bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-2xl text-center space-y-4 animate-scale-up">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">
                  Points Credited Successfully!
                </h3>
                <p className="text-xs text-slate-400">
                  Earned at <strong className="text-slate-200">{selectedReceipt.storeName}</strong> ({selectedReceipt.businessUnit}).
                </p>
              </div>

              <div className="p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl space-y-2">
                <div className="flex items-center justify-center gap-1 text-emerald-400 font-extrabold text-3xl tabular-nums">
                  <span>+{selectedReceipt.pointsToEarn}</span>
                  <span className="text-sm uppercase font-bold text-emerald-300">pts</span>
                </div>
                <div className="pt-2 border-t border-emerald-800/40 flex justify-between text-xs text-emerald-200">
                  <span>Updated Shared Wallet:</span>
                  <strong className="text-white tabular-nums font-bold">
                    {wallet.availablePoints.toLocaleString()} pts
                  </strong>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Added to Transaction Activity & Group Ledger</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setScanState('VIEWFINDER')}
                  className="flex-1 py-3 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  Scan Another
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    setActiveTab('activity');
                  }}
                  className="flex-1 py-3 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md transition-all cursor-pointer"
                >
                  View Activity
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section: Dummy Store QR Quick Triggers */}
        {scanState === 'VIEWFINDER' && (
          <div className="relative z-10 p-4 border-t border-white/10 bg-slate-950/90 backdrop-blur-md space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>Simulated Counter QR Codes:</span>
              </span>
              <span className="text-[10px] text-slate-500">Tap to test earn</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DUMMY_STORE_QRS.map((item) => {
                const Icon = getBUIcon(item.businessUnit);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectStoreQR(item)}
                    className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 text-left transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] uppercase font-bold text-emerald-300">
                          {item.businessUnit}
                        </span>
                      </div>
                      <span className="font-extrabold text-[11px] text-emerald-400 tabular-nums">
                        +{item.pointsToEarn} pts
                      </span>
                    </div>

                    <h5 className="font-bold text-xs text-white truncate mt-1 group-hover:text-emerald-300 transition-colors">
                      {item.storeName}
                    </h5>

                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Bill: LKR {item.spendLKR.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
