import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Sparkles, Smartphone, Lock } from 'lucide-react';
import { HayleysLogo } from '../common/HayleysLogo';
import { useLoyalty } from '../../context/LoyaltyContext';
import { translations } from '../../translations';

export const LoginScreen: React.FC = () => {
  const { setIsLoggedIn, language, setLanguage } = useLoyalty();
  const t = translations[language];

  const [mobileNumber, setMobileNumber] = useState('77 234 4821');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
      setOtp('4821'); // Pre-fill mock OTP for quick demo entry
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 400);
  };

  const handleBypassDemo = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white flex flex-col justify-between p-6">
      {/* Top Bar with Language selector */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-900/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
          Hayleys Group Loyalty
        </span>
        <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
          {(['EN', 'SI', 'TA'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                language === l
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {l === 'EN' ? 'EN' : l === 'SI' ? 'සිං' : 'த'}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Brand Section */}
      <div className="my-auto py-8 text-center space-y-4 max-w-sm mx-auto">
        <div className="flex justify-center mb-2">
          <HayleysLogo variant="white" size="lg" />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
          One Group-Wide Wallet.
        </h1>
        <p className="text-xs text-emerald-200/90 leading-relaxed max-w-xs mx-auto">
          Earn points anywhere across Retail, Leisure, Travels, and Mobility — and redeem anywhere.
        </p>

        {/* Demo Fast-Track Bypass Card */}
        <div className="pt-2">
          <button
            onClick={handleBypassDemo}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/30"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Explore Demo (Instant Access)</span>
            <ArrowRight className="w-4 h-4 text-emerald-200" />
          </button>
          <span className="text-[10px] text-white/50 block mt-1.5">
            Pre-loaded with Nimal Perera (2,450 pts)
          </span>
        </div>

        {/* Traditional Simulated Mobile Login */}
        <div className="pt-6 border-t border-white/10 text-left">
          <span className="text-[11px] font-semibold text-white/70 block mb-2 text-center uppercase tracking-wider">
            Or Sign In with Mobile
          </span>

          {step === 'PHONE' ? (
            <form onSubmit={handleSendOtp} className="space-y-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-white/70 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+94</span>
                </div>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="77 123 4567"
                  className="w-full pl-16 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-white/40 outline-hidden focus:border-emerald-400 focus:bg-white/15"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-white/15 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? 'Sending SMS...' : 'Request Verification Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-3">
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 4-digit OTP"
                  className="w-full pl-9 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white text-center tracking-widest font-mono text-sm outline-hidden focus:border-emerald-400 focus:bg-white/15"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('PHONE')}
                  className="w-1/3 py-2.5 bg-white/10 hover:bg-white/15 text-white/80 rounded-xl text-xs transition-colors"
                >
                  Change No.
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Enter'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer / Governance Notice */}
      <div className="text-center text-[11px] text-white/50 space-y-1 pb-2">
        <p>Participating: Retail · Leisure · Travels · Mobility</p>
        <p className="text-[10px] text-white/40">
          Client Evaluation Prototype · Hayleys Group Sri Lanka
        </p>
      </div>
    </div>
  );
};
