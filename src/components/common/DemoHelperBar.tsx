import React, { useState } from 'react';
import {
  RotateCcw,
  Smartphone,
  Maximize2,
  ListOrdered,
  PlusCircle,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ScanLine,
  Trophy,
  Flame,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';

interface DemoHelperBarProps {
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean) => void;
}

export const DemoHelperBar: React.FC<DemoHelperBarProps> = ({
  isPhoneFrame,
  setIsPhoneFrame,
}) => {
  const {
    resetDemoData,
    simulateEarn,
    startCrossBusinessRedemption,
    setActiveTab,
    setIsDigitalCardOpen,
    setIsScanQROpen,
    setIsGamificationOpen,
    language,
    setLanguage,
  } = useLoyalty();

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReset = () => {
    resetDemoData();
    showToast('Demo state reset to initial RFP baseline (2,450 pts)');
  };

  const handleSimulateRetailEarn = () => {
    simulateEarn('RETAIL', 350, 'Simulated Supermarket Purchase (+350 pts)', 17500);
    showToast('Simulated +350 pts earned at Hayleys Retail Supermarket!');
  };

  const handleStepJump = (step: number) => {
    switch (step) {
      case 1:
        setActiveTab('home');
        setIsDigitalCardOpen(true);
        break;
      case 2:
        setActiveTab('home');
        setIsDigitalCardOpen(false);
        break;
      case 3:
        setActiveTab('activity');
        break;
      case 4:
      case 5:
      case 6:
        startCrossBusinessRedemption('LEISURE');
        break;
      case 7:
        setActiveTab('offers');
        break;
      case 8:
        setActiveTab('rewards');
        break;
      case 9:
        setActiveTab('profile');
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-slate-900 text-slate-100 border-b border-slate-800 text-xs py-2 px-3 select-none">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Gamification Hub Trigger with Streak indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGamificationOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-amber-500/20 via-emerald-500/15 to-transparent border border-amber-500/40 hover:border-amber-400 rounded-lg text-amber-300 transition-all font-semibold cursor-pointer"
            title="Open Gamification Hub: Daily Lucky Spin, Streak Boost & Quest Badges"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Gamification Hub</span>
            <span className="flex items-center gap-0.5 bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-bold border border-amber-400/30">
              <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
              <span>3W Streak (1.2x)</span>
            </span>
          </button>
        </div>

        {/* Middle / Right: Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Scan Store QR Overlay Trigger */}
          <button
            onClick={() => setIsScanQROpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded-md transition-colors font-medium cursor-pointer"
            title="Open camera viewfinder to scan store QR"
          >
            <ScanLine className="w-3.5 h-3.5 text-emerald-400" />
            <span>Scan Store QR</span>
          </button>

          {/* Quick Earn Trigger */}
          <button
            onClick={handleSimulateRetailEarn}
            className="flex items-center gap-1 px-2.5 py-1 bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 rounded-md transition-colors font-medium cursor-pointer"
            title="Simulate earning +350 pts at Hayleys Supermarket"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+350 pts (Retail)</span>
          </button>

          {/* Quick Cross-Redeem Trigger */}
          <button
            onClick={() => startCrossBusinessRedemption('LEISURE')}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-700/80 hover:bg-amber-600 text-amber-100 rounded-md transition-colors font-medium cursor-pointer"
            title="Open cross-business redemption at Leisure"
          >
            <span>Demo Redeem</span>
          </button>

          {/* 7-Min Demo Guide Toggle */}
          <button
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors cursor-pointer"
          >
            <ListOrdered className="w-3.5 h-3.5 text-emerald-400" />
            <span>7-Min Script</span>
            {isGuideOpen ? (
              <ChevronUp className="w-3 h-3 text-slate-400" />
            ) : (
              <ChevronDown className="w-3 h-3 text-slate-400" />
            )}
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700">
            {(['EN', 'SI', 'TA'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  language === l
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l === 'EN' ? 'EN' : l === 'SI' ? 'සිං' : 'த'}
              </button>
            ))}
          </div>

          {/* Viewport Frame Toggle */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="hidden md:flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors cursor-pointer"
            title={isPhoneFrame ? 'Switch to Fullscreen Responsive' : 'Switch to Phone Mock Frame'}
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Responsive</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Phone Frame</span>
              </>
            )}
          </button>

          {/* Reset State */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-rose-900/50 hover:text-rose-200 text-slate-400 rounded-md transition-colors cursor-pointer"
            title="Reset to initial 2,450 pts state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2 rounded-full shadow-xl border border-emerald-500/30 flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Expandable 7-Minute Pitch Guide Drawer */}
      {isGuideOpen && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-800 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] text-slate-300 bg-slate-950/60 p-3 rounded-lg">
          <div
            onClick={() => handleStepJump(1)}
            className="p-2 rounded bg-slate-900/80 hover:bg-slate-800 cursor-pointer border border-slate-800"
          >
            <span className="font-semibold text-emerald-400 block mb-0.5">
              1. Home & Digital Card
            </span>
            Show unified 2,450 pts balance and tap loyalty card for member QR.
          </div>
          <div
            onClick={() => handleStepJump(2)}
            className="p-2 rounded bg-slate-900/80 hover:bg-slate-800 cursor-pointer border border-slate-800"
          >
            <span className="font-semibold text-emerald-400 block mb-0.5">
              2. 4 Business Units
            </span>
            Highlight Retail, Leisure, Travels, Mobility (Singer RED excluded).
          </div>
          <div
            onClick={() => handleStepJump(3)}
            className="p-2 rounded bg-slate-900/80 hover:bg-slate-800 cursor-pointer border border-slate-800"
          >
            <span className="font-semibold text-emerald-400 block mb-0.5">
              3. View Retail Earns
            </span>
            Show supermarket earns in Activity and segregated LKR Change Money.
          </div>
          <div
            onClick={() => handleStepJump(4)}
            className="p-2 rounded bg-slate-900/80 hover:bg-slate-800 cursor-pointer border border-slate-800"
          >
            <span className="font-semibold text-amber-400 block mb-0.5">
              4. Cross-Redeem Leisure
            </span>
            Tap Redeem Across Hayleys &gt; Leisure &gt; Hotel Dining Voucher (800 pts).
          </div>
        </div>
      )}
    </div>
  );
};
