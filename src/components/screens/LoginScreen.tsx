import React, { useState } from 'react';
import { ArrowRight, Smartphone, Mail, Lock, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { HayleysLogo } from '../common/HayleysLogo';
import { useLoyalty } from '../../context/LoyaltyContext';

export const LoginScreen: React.FC = () => {
  const { setIsLoggedIn } = useLoyalty();

  const [authMethod, setAuthMethod] = useState<'MOBILE' | 'EMAIL'>('MOBILE');
  const [mobileNumber, setMobileNumber] = useState('77 234 4821');
  const [emailAddress, setEmailAddress] = useState('nimal.perera@example.lk');
  const [otp, setOtp] = useState('4821');
  const [step, setStep] = useState<'INPUT' | 'OTP'>('INPUT');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
    }, 300);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 300);
  };

  return (
    <div className="min-h-full bg-white flex flex-col justify-between p-6 text-slate-900 animate-fade-in">
      {/* Top Header */}
      <div className="pt-2 flex items-center justify-between">
        {step === 'OTP' ? (
          <button
            onClick={() => setStep('INPUT')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Center Content Form */}
      <div className="my-auto py-6 space-y-6 max-w-sm mx-auto w-full">
        {/* Brand Logo & Greeting */}
        <div className="text-center space-y-2.5">
          <div className="flex justify-center mb-1">
            <HayleysLogo variant="green" size="md" showSubtitle={true} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {step === 'INPUT' ? 'Sign In' : 'Verify Code'}
          </h1>
          <p className="text-xs text-slate-500">
            {step === 'INPUT'
              ? 'Enter your registered credentials to access your account'
              : authMethod === 'MOBILE'
              ? `Enter the 4-digit code sent to +94 ${mobileNumber}`
              : `Enter the 4-digit code sent to ${emailAddress}`}
          </p>
        </div>

        {/* Step 1: Input (Mobile vs Email Switcher) */}
        {step === 'INPUT' ? (
          <div className="space-y-4">
            {/* Segmented Auth Selector */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMethod('MOBILE')}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMethod === 'MOBILE'
                    ? 'bg-white text-emerald-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Number</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('EMAIL')}
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMethod === 'EMAIL'
                    ? 'bg-white text-emerald-900 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Address</span>
              </button>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              {authMethod === 'MOBILE' ? (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Mobile Number
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-xs font-semibold text-slate-600 flex items-center gap-1.5 border-r border-slate-200 pr-2.5">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-800" />
                      <span>+94</span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="77 234 4821"
                      className="w-full pl-20 pr-3.5 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-emerald-700 rounded-xl text-sm font-medium text-slate-900 outline-hidden transition-all shadow-2xs focus:ring-2 focus:ring-emerald-700/10"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-emerald-800 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="nimal.perera@example.lk"
                      className="w-full pl-10 pr-3.5 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-emerald-700 rounded-xl text-sm font-medium text-slate-900 outline-hidden transition-all shadow-2xs focus:ring-2 focus:ring-emerald-700/10"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isLoading ||
                  (authMethod === 'MOBILE' && !mobileNumber.trim()) ||
                  (authMethod === 'EMAIL' && !emailAddress.trim())
                }
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Verification Code
                </label>
                <button
                  type="button"
                  onClick={() => setStep('INPUT')}
                  className="text-xs font-medium text-emerald-800 hover:underline"
                >
                  Change {authMethod === 'MOBILE' ? 'number' : 'email'}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="4821"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 focus:bg-white border border-slate-200 focus:border-emerald-700 rounded-xl text-sm font-mono font-bold tracking-widest text-slate-900 text-center outline-hidden transition-all shadow-2xs focus:ring-2 focus:ring-emerald-700/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 4}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify & Sign In</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Subtle, Professional Footer */}
      <div className="pb-2 text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-800/80" />
          <span>Secured by Hayleys Identity Service</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Need help? Contact Member Support at 1919
        </p>
      </div>
    </div>
  );
};
