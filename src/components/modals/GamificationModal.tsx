import React, { useState } from 'react';
import {
  X,
  Trophy,
  Flame,
  Sparkles,
  Gift,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ShoppingBag,
  Utensils,
  Train,
  Zap,
  Compass,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';

interface WheelSector {
  id: number;
  label: string;
  points: number;
  color: string;
  textColor: string;
}

const WHEEL_SECTORS: WheelSector[] = [
  { id: 0, label: '+50 Pts', points: 50, color: '#006837', textColor: '#ffffff' },
  { id: 1, label: '2x Booster', points: 75, color: '#047857', textColor: '#ffffff' },
  { id: 2, label: '+100 Pts', points: 100, color: '#065f46', textColor: '#ffffff' },
  { id: 3, label: 'LKR 500 Gift', points: 50, color: '#006837', textColor: '#ffffff' },
  { id: 4, label: '+25 Pts', points: 25, color: '#059669', textColor: '#ffffff' },
  { id: 5, label: 'Tea Perk', points: 30, color: '#047857', textColor: '#ffffff' },
  { id: 6, label: '+150 Pts', points: 150, color: '#006837', textColor: '#ffffff' },
  { id: 7, label: 'Streak Bonus', points: 80, color: '#10b981', textColor: '#0f172a' },
];

export const GamificationModal: React.FC = () => {
  const {
    isGamificationOpen,
    setIsGamificationOpen,
    badges,
    claimBadgeBounty,
    dailySpinClaimed,
    spinLuckyWheel,
    wallet,
    customer,
  } = useLoyalty();

  const [activeTab, setActiveTab] = useState<'WHEEL' | 'BADGES' | 'TIER'>('WHEEL');
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<WheelSector | null>(null);

  if (!isGamificationOpen) return null;

  const handleSpin = () => {
    if (isSpinning || dailySpinClaimed) return;

    setIsSpinning(true);
    setWonPrize(null);

    // Pick target prize (e.g. index 2: +100 pts, or index 6: +150 pts, or random)
    const winningIndex = Math.floor(Math.random() * WHEEL_SECTORS.length);
    const selectedSector = WHEEL_SECTORS[winningIndex];

    // Calculate rotation: 5 full 360 rotations + offset to land on winningIndex
    // 8 sectors = 45 degrees per sector
    const sectorAngle = 360 / WHEEL_SECTORS.length;
    // Target angle from top pointer (pointer is at 0 degrees, top)
    const targetSectorCenter = winningIndex * sectorAngle + sectorAngle / 2;
    // To land under top pointer, rotate by (360 - targetSectorCenter)
    const extraTurns = 360 * 5;
    const finalRotation = rotationDegrees + extraTurns + (360 - (rotationDegrees % 360)) + (360 - targetSectorCenter);

    setRotationDegrees(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedSector);
      spinLuckyWheel(selectedSector.points, selectedSector.label);
    }, 3800);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag':
        return ShoppingBag;
      case 'Utensils':
        return Utensils;
      case 'Train':
        return Train;
      case 'Zap':
        return Zap;
      default:
        return Compass;
    }
  };

  // Tier progression math: Silver -> Gold (3,000 pts target)
  const nextTierTarget = 3000;
  const currentPoints = wallet.availablePoints;
  const tierProgressPercent = Math.min(100, Math.round((currentPoints / nextTierTarget) * 100));
  const pointsRemaining = Math.max(0, nextTierTarget - currentPoints);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Loyalty Gamification Hub</h3>
              <p className="text-[10px] text-emerald-300">Earn bonus rewards through streaks & quests</p>
            </div>
          </div>
          <button
            onClick={() => setIsGamificationOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gamification Sub-Navigation Tabs */}
        <div className="grid grid-cols-3 p-1 bg-slate-100 text-xs font-bold text-center border-b border-slate-200">
          <button
            onClick={() => setActiveTab('WHEEL')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'WHEEL'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Spin & Win</span>
          </button>
          <button
            onClick={() => setActiveTab('BADGES')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'BADGES'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Badges ({badges.filter((b) => b.status === 'CLAIMABLE').length} Ready)</span>
          </button>
          <button
            onClick={() => setActiveTab('TIER')}
            className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'TIER'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
            <span>Tier Quest</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: DAILY LUCKY SPIN WHEEL */}
          {activeTab === 'WHEEL' && (
            <div className="space-y-4 text-center">
              {/* Member Streak Multiplier Banner */}
              <div className="p-3 bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50 border border-amber-200/80 rounded-2xl flex items-center justify-between text-xs text-amber-950">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-600 flex items-center justify-center">
                    <Flame className="w-4.5 h-4.5 fill-orange-500" />
                  </div>
                  <div className="text-left">
                    <span className="font-extrabold text-xs block text-slate-900">3-Week Shopping Streak</span>
                    <span className="text-[10px] text-slate-600">Active 1.2x Points Multiplier Boost!</span>
                  </div>
                </div>
                <span className="bg-amber-400 text-amber-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                  Active
                </span>
              </div>

              {/* The Lucky Wheel Interactive Graphic */}
              <div className="relative w-64 h-64 mx-auto my-2 flex items-center justify-center">
                {/* Pointer at the top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-md">
                  <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-amber-400" />
                </div>

                {/* Outer Ring Gold Glow */}
                <div className="absolute inset-0 rounded-full border-4 border-amber-400/80 shadow-xl pointer-events-none z-20" />

                {/* Rotating SVG Wheel */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full rounded-full transition-transform duration-[3800ms]"
                  style={{
                    transform: `rotate(${rotationDegrees}deg)`,
                    transitionTimingFunction: 'cubic-bezier(0.15, 0.85, 0.25, 1)',
                  }}
                >
                  {WHEEL_SECTORS.map((sector, i) => {
                    const angle = 360 / WHEEL_SECTORS.length;
                    const startAngle = i * angle;
                    const endAngle = startAngle + angle;
                    const startRad = ((startAngle - 90) * Math.PI) / 180;
                    const endRad = ((endAngle - 90) * Math.PI) / 180;
                    const x1 = 100 + 100 * Math.cos(startRad);
                    const y1 = 100 + 100 * Math.sin(startRad);
                    const x2 = 100 + 100 * Math.cos(endRad);
                    const y2 = 100 + 100 * Math.sin(endRad);
                    const midAngle = startAngle + angle / 2;
                    const midRad = ((midAngle - 90) * Math.PI) / 180;
                    const textX = 100 + 64 * Math.cos(midRad);
                    const textY = 100 + 64 * Math.sin(midRad);

                    return (
                      <g key={sector.id}>
                        <path
                          d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                          fill={sector.color}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill={sector.textColor}
                          fontSize="7"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                        >
                          {sector.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Center Spin Action Knob */}
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || dailySpinClaimed}
                  className={`absolute z-30 w-16 h-16 rounded-full flex flex-col items-center justify-center font-extrabold text-[11px] shadow-xl border-4 border-white transition-all cursor-pointer ${
                    dailySpinClaimed
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : isSpinning
                      ? 'bg-amber-400 text-amber-950 scale-95'
                      : 'bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white hover:shadow-emerald-900/40'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mb-0.5 text-amber-300" />
                  <span>{dailySpinClaimed ? 'DONE' : isSpinning ? 'SPINNING' : 'SPIN'}</span>
                </button>
              </div>

              {/* Prize Claimed Success Callout */}
              {wonPrize && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl animate-scale-up space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                    Congratulations! You Won
                  </span>
                  <div className="text-xl font-extrabold text-emerald-900">
                    +{wonPrize.points} Loyalty Points!
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Credited directly to your shared group wallet ({wallet.availablePoints} pts total).
                  </p>
                </div>
              )}

              {dailySpinClaimed && !wonPrize && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span>Daily lucky spin completed. Come back tomorrow for another spin!</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACHIEVEMENTS & QUEST BADGES */}
          {activeTab === 'BADGES' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Hayleys Quest Badges</span>
                  <span className="text-[11px] text-slate-500">Claim instant point bounties for completed actions</span>
                </div>
                <span className="font-bold text-emerald-700">
                  {badges.filter((b) => b.status === 'CLAIMED').length}/{badges.length} Unlocked
                </span>
              </div>

              <div className="space-y-2.5">
                {badges.map((badge) => {
                  const Icon = getBadgeIcon(badge.iconName);
                  const isClaimable = badge.status === 'CLAIMABLE';
                  const isClaimed = badge.status === 'CLAIMED';

                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                        isClaimable
                          ? 'bg-amber-50/60 border-amber-300 shadow-xs'
                          : isClaimed
                          ? 'bg-emerald-50/40 border-emerald-200'
                          : 'bg-white border-slate-200 opacity-80'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isClaimable
                              ? 'bg-amber-400 text-amber-950 font-bold'
                              : isClaimed
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-xs text-slate-900">{badge.title}</h4>
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                              {badge.sectorTag}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {badge.description}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            Progress: {badge.progress} / {badge.total}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        {isClaimable ? (
                          <button
                            onClick={() => claimBadgeBounty(badge.id)}
                            className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-[10px] shadow-sm transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Claim +{badge.pointsBounty} pts</span>
                          </button>
                        ) : isClaimed ? (
                          <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Claimed</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            <span>+{badge.pointsBounty} pts</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: TIER JOURNEY & ROADMAP */}
          {activeTab === 'TIER' && (
            <div className="space-y-4">
              {/* Current Tier Status Card */}
              <div className="p-4 bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-950 text-white rounded-2xl border border-slate-700/60 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">
                      Current Membership Tier
                    </span>
                    <h3 className="text-lg font-extrabold text-white">{customer.tier} Member</h3>
                  </div>
                  <span className="text-xs bg-slate-700 text-slate-200 px-2 py-1 rounded-md font-bold border border-slate-600">
                    Silver · Active
                  </span>
                </div>

                {/* Progress bar to Gold Tier */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Next: <strong>Gold Tier</strong></span>
                    <span className="font-mono font-bold">{currentPoints} / {nextTierTarget} pts</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-700/60">
                    <div
                      className="bg-gradient-to-r from-slate-400 via-emerald-400 to-amber-300 h-full rounded-full transition-all duration-500"
                      style={{ width: `${tierProgressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{pointsRemaining} pts needed to upgrade to Gold</span>
                    <span>{tierProgressPercent}% unlocked</span>
                  </div>
                </div>
              </div>

              {/* Tier Privilege Roadmap */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">Upcoming Tier Privileges:</span>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Gold Tier (At 3,000 pts)</span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {pointsRemaining} pts away
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 pl-4 list-disc">
                    <li>1.5x points earning rate on all Hayleys Retail Supermarket purchases</li>
                    <li>Complimentary Kingsbury hotel dining upgrades & priority reservations</li>
                    <li>Free airport executive fleet lounge passes via Advantis Mobility</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 opacity-70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Platinum Tier (At 6,000 pts)</span>
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-1 pl-4 list-disc">
                    <li>2.0x points multiplier across all 4 group sectors</li>
                    <li>Annual complimentary resort weekend stay at Amaya Resorts</li>
                    <li>Dedicated 24/7 personal loyalty concierge desk</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Points earned from gamification are automatically credited to your shared wallet</span>
          </div>
          <button
            onClick={() => setIsGamificationOpen(false)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
