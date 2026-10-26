import React, { useState } from 'react';
import {
  Gift,
  Trophy,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Building2,
  Palmtree,
  Compass,
  Car,
  Flame,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit } from '../../types';
import { translations } from '../../translations';

export const RewardsScreen: React.FC = () => {
  const {
    rewards,
    missions,
    wallet,
    language,
    startCrossBusinessRedemption,
    simulateEarn,
    setIsGamificationOpen,
    dailySpinClaimed,
    streakWeeks,
    badges,
  } = useLoyalty();

  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'CATALOG' | 'MISSIONS'>('CATALOG');
  const [selectedBU, setSelectedBU] = useState<'ALL' | BusinessUnit>('ALL');

  const filteredRewards = rewards.filter((r) => {
    return selectedBU === 'ALL' || r.businessUnit === selectedBU;
  });

  const handleSimulateMissionAction = (missionId: string) => {
    if (missionId === 'MIS-02') {
      simulateEarn('RETAIL', 350, 'Simulated Supermarket checkout (+350 pts)', 17500);
    } else if (missionId === 'MIS-01') {
      startCrossBusinessRedemption('LEISURE');
    } else {
      simulateEarn('MOBILITY', 100, 'Simulated Hayleys EV charge (+100 pts)', 2500);
    }
  };

  return (
    <div className="space-y-4 px-4 py-3 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
          {t.nav.rewards} & Milestones
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Redeem rewards across four sectors or complete missions for bonus points
        </p>
      </div>

      {/* Main Switcher: Rewards vs Missions */}
      <div className="grid grid-cols-2 p-1 bg-slate-200/80 rounded-2xl text-xs font-bold text-center">
        <button
          onClick={() => setActiveTab('CATALOG')}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'CATALOG'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Reward Catalogue</span>
        </button>
        <button
          onClick={() => setActiveTab('MISSIONS')}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'MISSIONS'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Missions ({missions.filter((m) => m.status === 'IN_PROGRESS').length})</span>
        </button>
      </div>

      {/* VIEW 1: REWARD CATALOGUE */}
      {activeTab === 'CATALOG' && (
        <div className="space-y-3.5">
          {/* BU Filter Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {(['ALL', 'LEISURE', 'RETAIL', 'TRAVELS', 'MOBILITY'] as const).map((bu) => (
              <button
                key={bu}
                onClick={() => setSelectedBU(bu)}
                className={`px-3 py-1.5 rounded-xl font-semibold text-xs whitespace-nowrap transition-colors ${
                  selectedBU === bu
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {bu === 'ALL' ? 'All Rewards' : bu}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredRewards.map((reward) => {
              const canAfford = wallet.availablePoints >= reward.pointsRequired;
              return (
                <div
                  key={reward.id}
                  onClick={() => startCrossBusinessRedemption(reward.businessUnit)}
                  className="p-3.5 rounded-3xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex gap-3.5 items-center"
                >
                  <img
                    src={reward.image}
                    alt={reward.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 bg-slate-100 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                      <span className="uppercase font-bold text-emerald-800">{reward.businessUnit}</span>
                      <span>·</span>
                      <span>{reward.category}</span>
                    </div>
                    <h3 className="font-bold text-xs text-slate-900 line-clamp-1 mt-0.5">
                      {reward.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {reward.description}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <div>
                        <span className="font-extrabold text-xs text-emerald-700 tabular-nums">
                          {reward.pointsRequired.toLocaleString()} pts
                        </span>
                        <span className="text-[10px] text-slate-400 ml-1.5">
                          (Val: LKR {reward.originalValueLKR.toLocaleString()})
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          canAfford ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {canAfford ? 'Redeem →' : 'Need pts'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: MISSIONS & MILESTONES */}
      {activeTab === 'MISSIONS' && (
        <div className="space-y-3.5">
          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl text-xs text-emerald-950 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Complete cross-business challenges to unlock bonus points credited directly to your shared group wallet!
            </p>
          </div>

          {/* Gamification Hub Quick-Access Card */}
          <div
            onClick={() => setIsGamificationOpen(true)}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-amber-500/15 border border-amber-300/80 shadow-xs cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-xs text-slate-900">
                    Lucky Wheel & Badges
                  </span>
                  <span className="inline-flex items-center gap-0.5 bg-orange-100 text-orange-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-orange-200">
                    <Flame className="w-2.5 h-2.5 fill-orange-500 text-orange-500" />
                    {streakWeeks}W Streak
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {badges.filter((b) => b.status === 'CLAIMABLE').length > 0
                    ? `${badges.filter((b) => b.status === 'CLAIMABLE').length} badge bounty ready to claim!`
                    : dailySpinClaimed
                    ? 'Check badge achievements & tier progression roadmap'
                    : 'Spin daily lucky wheel for up to +150 bonus points!'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-800 font-bold text-xs shrink-0">
              <span>Open</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
            </div>
          </div>

          <div className="space-y-3">
            {missions.map((mission) => {
              const isDone = mission.status === 'COMPLETED' || mission.progress >= mission.total;
              const percent = Math.min(100, Math.round((mission.progress / mission.total) * 100));

              return (
                <div
                  key={mission.id}
                  className={`p-4 rounded-3xl border transition-all ${
                    isDone
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-800">
                        <span>{mission.businessUnit} CHALLENGE</span>
                        {isDone && (
                          <span className="text-emerald-700 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-xs text-slate-900 mt-0.5">
                        {mission.title}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-sm text-emerald-700 block tabular-nums">
                        +{mission.rewardPoints} pts
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {isDone ? 'Earned' : `${mission.expiresInDays}d left`}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    {mission.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-3 space-y-1">
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDone ? 'bg-emerald-600' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                      <span>
                        Progress: {mission.progress} / {mission.total} {mission.unit} ({percent}%)
                      </span>
                      <span>Target: +{mission.rewardPoints} pts</span>
                    </div>
                  </div>

                  {/* Interactive Simulation Button */}
                  {!isDone && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => handleSimulateMissionAction(mission.id)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Simulate Next Step</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
