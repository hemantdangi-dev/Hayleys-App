import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Building2,
  Palmtree,
  Compass,
  Car,
  QrCode,
  ExternalLink,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Reward, Voucher } from '../../types';
import { translations } from '../../translations';

export const RedemptionModal: React.FC = () => {
  const {
    wallet,
    rewards,
    isRedemptionModalOpen,
    setIsRedemptionModalOpen,
    redemptionTargetBU,
    setRedemptionTargetBU,
    redeemReward,
    setActiveTab,
    language,
  } = useLoyalty();

  const t = translations[language];

  // Steps: 'CATALOG' | 'DETAIL' | 'CONFIRM' | 'SUCCESS'
  const [currentStep, setCurrentStep] = useState<'CATALOG' | 'DETAIL' | 'CONFIRM' | 'SUCCESS'>('CATALOG');
  const [selectedBU, setSelectedBU] = useState<BusinessUnit>('LEISURE');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [issuedVoucher, setIssuedVoucher] = useState<Voucher | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initial BU from context
  useEffect(() => {
    if (redemptionTargetBU) {
      setSelectedBU(redemptionTargetBU);
    }
  }, [redemptionTargetBU]);

  // When modal closes, reset step
  const handleClose = () => {
    setIsRedemptionModalOpen(false);
    setTimeout(() => {
      setCurrentStep('CATALOG');
      setSelectedReward(null);
      setIssuedVoucher(null);
      setErrorMessage(null);
      setIsSubmitting(false);
    }, 200);
  };

  if (!isRedemptionModalOpen) return null;

  const buTabs: { id: BusinessUnit; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'LEISURE', label: t.bu.LEISURE, icon: Palmtree },
    { id: 'RETAIL', label: t.bu.RETAIL, icon: Building2 },
    { id: 'TRAVELS', label: t.bu.TRAVELS, icon: Compass },
    { id: 'MOBILITY', label: t.bu.MOBILITY, icon: Car },
  ];

  const filteredRewards = rewards.filter((r) => r.businessUnit === selectedBU);

  const handleSelectReward = (reward: Reward) => {
    setSelectedReward(reward);
    setErrorMessage(null);
    setCurrentStep('DETAIL');
  };

  const handleProceedToConfirm = () => {
    if (!selectedReward) return;
    if (wallet.availablePoints < selectedReward.pointsRequired) {
      setErrorMessage(
        `Insufficient points: You have ${wallet.availablePoints} pts, but this reward requires ${selectedReward.pointsRequired} pts.`
      );
      return;
    }
    setErrorMessage(null);
    setCurrentStep('CONFIRM');
  };

  const handleExecuteRedemption = () => {
    if (!selectedReward || isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    // Simulated short network settling
    setTimeout(() => {
      const result = redeemReward(selectedReward);
      setIsSubmitting(false);

      if (result.success && result.voucher) {
        setIssuedVoucher(result.voucher);
        setCurrentStep('SUCCESS');
      } else {
        setErrorMessage(result.error || 'Failed to complete redemption.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            {currentStep !== 'CATALOG' && currentStep !== 'SUCCESS' && (
              <button
                onClick={() => {
                  if (currentStep === 'CONFIRM') setCurrentStep('DETAIL');
                  else if (currentStep === 'DETAIL') setCurrentStep('CATALOG');
                }}
                className="p-1 -ml-1 text-slate-500 hover:text-slate-900 rounded-full"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>{t.home.redeemAcrossGroup}</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Shared Wallet Balance:{' '}
                <strong className="text-emerald-700 tabular-nums">
                  {wallet.availablePoints.toLocaleString()} pts
                </strong>
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* STEP A & B: CHOOSE BU & REWARDS CATALOG */}
          {currentStep === 'CATALOG' && (
            <div className="space-y-4">
              {/* Scenario 1 Callout */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <span className="font-bold block text-emerald-800">
                    Earn Anywhere → Redeem Anywhere
                  </span>
                  Points earned from supermarket shopping (Retail) can be redeemed for hotel dining (Leisure), travels, or mobility.
                </div>
              </div>

              {/* Step A: Choose Business Unit Tabs */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-2">
                  {t.redemption.chooseBusinessUnit}
                </span>
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
                  {buTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = selectedBU === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setSelectedBU(tab.id);
                          setRedemptionTargetBU(tab.id);
                        }}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all text-xs ${
                          isActive
                            ? 'bg-white text-emerald-800 font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 font-medium'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 mb-1 ${
                            isActive ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        />
                        <span className="truncate max-w-[65px] text-[11px]">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step B: Rewards List */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Available {selectedBU} Rewards ({filteredRewards.length})</span>
                  <span>Filtered by Category</span>
                </div>

                <div className="space-y-3">
                  {filteredRewards.map((reward) => {
                    const canAfford = wallet.availablePoints >= reward.pointsRequired;
                    return (
                      <div
                        key={reward.id}
                        onClick={() => handleSelectReward(reward)}
                        className={`group p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                          canAfford
                            ? 'border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md'
                            : 'border-slate-200 bg-slate-50/70 opacity-80'
                        }`}
                      >
                        <img
                          src={reward.image}
                          alt={reward.name}
                          referrerPolicy="no-referrer"
                          className="w-18 h-18 rounded-xl object-cover shrink-0 bg-slate-100 border border-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium mb-0.5">
                            <span className="uppercase text-emerald-700 font-bold">{reward.businessUnit}</span>
                            <span>·</span>
                            <span>{reward.category}</span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                            {reward.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {reward.description}
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                            <span className="font-extrabold text-xs text-emerald-700 tabular-nums">
                              {reward.pointsRequired.toLocaleString()} pts
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                canAfford
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-600'
                              }`}
                            >
                              {canAfford ? 'Eligible' : 'Need more pts'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP C: REWARD DETAIL VIEW */}
          {currentStep === 'DETAIL' && selectedReward && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100">
                <img
                  src={selectedReward.image}
                  alt={selectedReward.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-800/90 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-md backdrop-blur-xs">
                  {selectedReward.businessUnit} REWARD
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedReward.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedReward.description}
                </p>
              </div>

              {/* Point Ledger Math Box */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Current Shared Balance:</span>
                  <span className="font-bold tabular-nums text-slate-800">
                    {wallet.availablePoints.toLocaleString()} pts
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Points Required:</span>
                  <span className="font-bold tabular-nums text-rose-600">
                    - {selectedReward.pointsRequired.toLocaleString()} pts
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center font-bold">
                  <span className="text-slate-900">Projected Balance:</span>
                  <span
                    className={`tabular-nums ${
                      wallet.availablePoints >= selectedReward.pointsRequired
                        ? 'text-emerald-700 text-sm'
                        : 'text-rose-600'
                    }`}
                  >
                    {(wallet.availablePoints - selectedReward.pointsRequired).toLocaleString()} pts
                  </span>
                </div>
              </div>

              {/* Eligibility & Cross-Business Rule */}
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Cross-Business Eligibility Confirmed</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-normal">
                  {selectedReward.eligibilityNote}
                </p>
              </div>

              {/* Key Terms */}
              <div className="space-y-1 text-xs text-slate-600">
                <span className="font-semibold text-slate-900 block text-[11px]">Terms & Conditions:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-500">
                  {selectedReward.terms.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP D: EXPLICIT CONFIRMATION */}
          {currentStep === 'CONFIRM' && selectedReward && (
            <div className="space-y-4 py-2 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {t.redemption.confirmTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  {t.redemption.confirmWarning}
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Selected Reward:</span>
                  <span className="font-bold text-slate-900 text-right max-w-[200px] truncate">
                    {selectedReward.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Redeeming Sector:</span>
                  <span className="font-bold text-emerald-700">{selectedReward.businessUnit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Points Deducted:</span>
                  <span className="font-bold text-rose-600 tabular-nums">
                    - {selectedReward.pointsRequired.toLocaleString()} pts
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-800">Remaining Wallet Balance:</span>
                  <span className="text-emerald-800 tabular-nums">
                    {(wallet.availablePoints - selectedReward.pointsRequired).toLocaleString()} pts
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                A digital QR voucher will be instantly generated and added to your wallet inventory.
              </div>
            </div>
          )}

          {/* STEP E: SUCCESS SCREEN */}
          {currentStep === 'SUCCESS' && issuedVoucher && selectedReward && (
            <div className="space-y-4 py-2 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto animate-bounce-short">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {t.redemption.successTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  {t.redemption.successMessage}
                </p>
              </div>

              {/* Digital Voucher Presentation */}
              <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-emerald-500/80 shadow-md text-left space-y-3 relative overflow-hidden">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                      {issuedVoucher.businessUnit} VOUCHER
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{issuedVoucher.rewardName}</h4>
                  </div>
                  <QrCode className="w-8 h-8 text-slate-800 shrink-0" />
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Voucher Code:</span>
                  <span className="font-bold text-emerald-800 tracking-wider">
                    {issuedVoucher.code}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>Valid until: {issuedVoucher.expiryDate}</span>
                  <span className="font-semibold text-emerald-700">Status: ACTIVE</span>
                </div>
              </div>

              {/* Updated Wallet Proof Strip */}
              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                <span>New Wallet Balance:</span>
                <span className="font-bold text-sm tabular-nums text-emerald-800">
                  {wallet.availablePoints.toLocaleString()} pts
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white">
          {currentStep === 'CATALOG' && (
            <p className="text-[11px] text-center text-slate-400">
              Select any reward to test cross-business point redemption
            </p>
          )}

          {currentStep === 'DETAIL' && selectedReward && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep('CATALOG')}
                className="flex-1 py-3 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToConfirm}
                disabled={wallet.availablePoints < selectedReward.pointsRequired}
                className={`flex-2 py-3 text-xs font-bold rounded-xl transition-all ${
                  wallet.availablePoints >= selectedReward.pointsRequired
                    ? 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {wallet.availablePoints >= selectedReward.pointsRequired
                  ? 'Redeem This Reward'
                  : 'Insufficient Points'}
              </button>
            </div>
          )}

          {currentStep === 'CONFIRM' && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep('DETAIL')}
                disabled={isSubmitting}
                className="flex-1 py-3 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Review
              </button>
              <button
                onClick={handleExecuteRedemption}
                disabled={isSubmitting}
                className="flex-2 py-3 text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <span>Confirm & Deduct Points</span>
                )}
              </button>
            </div>
          )}

          {currentStep === 'SUCCESS' && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleClose();
                  setActiveTab('home');
                }}
                className="flex-1 py-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  handleClose();
                  setActiveTab('activity');
                }}
                className="flex-1 py-3 text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl transition-colors shadow-sm"
              >
                View Activity
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
