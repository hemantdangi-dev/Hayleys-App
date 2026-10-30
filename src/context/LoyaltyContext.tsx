import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  BusinessUnit,
  CustomerProfile,
  WalletState,
  Transaction,
  ChangeMoneyTransaction,
  Reward,
  Voucher,
  Offer,
  Mission,
  AchievementBadge,
  SupportTicket,
  Language,
} from '../types';
import {
  INITIAL_CUSTOMER,
  INITIAL_WALLET,
  INITIAL_CHANGE_MONEY_LEDGER,
  INITIAL_TRANSACTIONS,
  INITIAL_VOUCHERS,
  ALL_REWARDS,
  ALL_OFFERS,
  INITIAL_MISSIONS,
  INITIAL_BADGES,
  INITIAL_SUPPORT_TICKETS,
} from '../data/mockData';

interface LoyaltyContextType {
  customer: CustomerProfile;
  wallet: WalletState;
  transactions: Transaction[];
  changeMoneyLedger: ChangeMoneyTransaction[];
  vouchers: Voucher[];
  rewards: Reward[];
  offers: Offer[];
  missions: Mission[];
  supportTickets: SupportTicket[];
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  activeTab: 'home' | 'wallet' | 'activity' | 'offers' | 'rewards' | 'profile';
  setActiveTab: (tab: 'home' | 'wallet' | 'activity' | 'offers' | 'rewards' | 'profile') => void;
  
  // Modal states
  isDigitalCardOpen: boolean;
  setIsDigitalCardOpen: (open: boolean) => void;
  isVouchersModalOpen: boolean;
  setIsVouchersModalOpen: (open: boolean) => void;
  selectedPromotion: Offer | null;
  setSelectedPromotion: (offer: Offer | null) => void;
  isRedemptionModalOpen: boolean;
  setIsRedemptionModalOpen: (open: boolean) => void;
  redemptionTargetBU: BusinessUnit | null;
  setRedemptionTargetBU: (bu: BusinessUnit | null) => void;
  isChangeMoneyModalOpen: boolean;
  setIsChangeMoneyModalOpen: (open: boolean) => void;
  isStoreLocatorOpen: boolean;
  setIsStoreLocatorOpen: (open: boolean) => void;
  isSupportModalOpen: boolean;
  setIsSupportModalOpen: (open: boolean) => void;
  supportModalTab: 'CREATE' | 'TRACK' | 'FAQ';
  setSupportModalTab: (tab: 'CREATE' | 'TRACK' | 'FAQ') => void;
  openSupportModal: (tab?: 'CREATE' | 'TRACK' | 'FAQ') => void;
  isFamilyModalOpen: boolean;
  setIsFamilyModalOpen: (open: boolean) => void;
  isScanQROpen: boolean;
  setIsScanQROpen: (open: boolean) => void;
  isGamificationOpen: boolean;
  setIsGamificationOpen: (open: boolean) => void;

  // Gamification state
  streakWeeks: number;
  dailySpinClaimed: boolean;
  badges: AchievementBadge[];
  spinLuckyWheel: (points: number, label: string) => void;
  claimBadgeBounty: (badgeId: string) => void;

  // Actions
  redeemReward: (reward: Reward) => { success: boolean; error?: string; voucher?: Voucher; newBalance?: number };
  simulateEarn: (bu: BusinessUnit, points: number, desc: string, qualifyingSpend?: number) => void;
  markVoucherUsed: (voucherId: string) => void;
  submitSupportTicket: (
    category: SupportTicket['category'],
    subject: string,
    message: string,
    transactionRef?: string,
    priority?: 'NORMAL' | 'URGENT',
    attachmentName?: string
  ) => string;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status'], resolutionNotes?: string) => void;
  resetDemoData: () => void;
  startCrossBusinessRedemption: (preferredBU?: BusinessUnit) => void;
}

const STORAGE_KEY = 'hayleys_loyalty_state_v7';

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved state or use initial mock data with strict Silver tier enforcement
  const [customer, setCustomer] = useState<CustomerProfile>(() => {
    try {
      const saved =
        localStorage.getItem(`${STORAGE_KEY}_customer`) ||
        localStorage.getItem('hayleys_loyalty_state_v6_customer') ||
        localStorage.getItem('hayleys_loyalty_state_v5_customer') ||
        localStorage.getItem('hayleys_loyalty_state_v4_customer') ||
        localStorage.getItem('hayleys_loyalty_state_v3_customer') ||
        localStorage.getItem('hayleys_loyalty_state_v2_customer') ||
        localStorage.getItem('hayleys_loyalty_state_v1_customer');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CUSTOMER,
          ...parsed,
          tier: 'Silver' as const,
        };
      }
      return INITIAL_CUSTOMER;
    } catch {
      return INITIAL_CUSTOMER;
    }
  });

  const [wallet, setWallet] = useState<WalletState>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_wallet`);
      return saved ? JSON.parse(saved) : INITIAL_WALLET;
    } catch {
      return INITIAL_WALLET;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [changeMoneyLedger, setChangeMoneyLedger] = useState<ChangeMoneyTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_change_money`);
      return saved ? JSON.parse(saved) : INITIAL_CHANGE_MONEY_LEDGER;
    } catch {
      return INITIAL_CHANGE_MONEY_LEDGER;
    }
  });

  const [vouchers, setVouchers] = useState<Voucher[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_vouchers`);
      if (saved) {
        const parsed: Voucher[] = JSON.parse(saved);
        // Ensure image is attached to vouchers
        return parsed.map((v) => {
          const matchingInit = INITIAL_VOUCHERS.find((iv) => iv.id === v.id || iv.code === v.code);
          return {
            ...v,
            image: v.image || matchingInit?.image,
          };
        });
      }
      return INITIAL_VOUCHERS;
    } catch {
      return INITIAL_VOUCHERS;
    }
  });

  const [rewards] = useState<Reward[]>(ALL_REWARDS);
  const [offers] = useState<Offer[]>(ALL_OFFERS);

  const [missions, setMissions] = useState<Mission[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_missions`);
      return saved ? JSON.parse(saved) : INITIAL_MISSIONS;
    } catch {
      return INITIAL_MISSIONS;
    }
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_support_tickets`);
      return saved ? JSON.parse(saved) : INITIAL_SUPPORT_TICKETS;
    } catch {
      return INITIAL_SUPPORT_TICKETS;
    }
  });
  const [supportModalTab, setSupportModalTab] = useState<'CREATE' | 'TRACK' | 'FAQ'>('CREATE');
  const [language, setLanguageState] = useState<Language>('EN');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'home' | 'wallet' | 'activity' | 'offers' | 'rewards' | 'profile'>('home');

  // Modals
  const [isDigitalCardOpen, setIsDigitalCardOpen] = useState(false);
  const [isVouchersModalOpen, setIsVouchersModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Offer | null>(null);
  const [isRedemptionModalOpen, setIsRedemptionModalOpen] = useState(false);
  const [redemptionTargetBU, setRedemptionTargetBU] = useState<BusinessUnit | null>(null);
  const [isChangeMoneyModalOpen, setIsChangeMoneyModalOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [isScanQROpen, setIsScanQROpen] = useState(false);
  const [isGamificationOpen, setIsGamificationOpen] = useState(false);
  const [streakWeeks] = useState(3);
  const [dailySpinClaimed, setDailySpinClaimed] = useState(false);
  const [badges, setBadges] = useState<AchievementBadge[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_badges`);
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  // Clean up legacy localStorage keys and enforce Silver tier on mount
  useEffect(() => {
    try {
      [
        'hayleys_loyalty_state_v1_customer',
        'hayleys_loyalty_state_v1_wallet',
        'hayleys_loyalty_state_v1_transactions',
        'hayleys_loyalty_state_v1_change_money',
        'hayleys_loyalty_state_v1_vouchers',
        'hayleys_loyalty_state_v1_missions',
        'hayleys_loyalty_state_v1_badges',
        'hayleys_loyalty_state_v1_support_tickets',
        'hayleys_loyalty_state_v2_customer',
        'hayleys_loyalty_state_v2_wallet',
        'hayleys_loyalty_state_v2_transactions',
        'hayleys_loyalty_state_v3_customer',
        'hayleys_loyalty_state_v3_transactions',
        'hayleys_loyalty_state_v4_customer',
        'hayleys_customer',
      ].forEach((key) => localStorage.removeItem(key));
    } catch {
      // ignore
    }

    if (customer.tier !== 'Silver') {
      setCustomer((prev) => ({ ...prev, tier: 'Silver' }));
    }
  }, []);

  // Sync to local storage for persistence across turns
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_customer`, JSON.stringify(customer));
      localStorage.setItem(`${STORAGE_KEY}_wallet`, JSON.stringify(wallet));
      localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
      localStorage.setItem(`${STORAGE_KEY}_change_money`, JSON.stringify(changeMoneyLedger));
      localStorage.setItem(`${STORAGE_KEY}_vouchers`, JSON.stringify(vouchers));
      localStorage.setItem(`${STORAGE_KEY}_missions`, JSON.stringify(missions));
      localStorage.setItem(`${STORAGE_KEY}_support_tickets`, JSON.stringify(supportTickets));
    } catch {
      // Local storage might be disabled in sandboxed environments
    }
  }, [customer, wallet, transactions, changeMoneyLedger, vouchers, missions, supportTickets]);

  const openSupportModal = (tab?: 'CREATE' | 'TRACK' | 'FAQ') => {
    if (tab) setSupportModalTab(tab);
    setIsSupportModalOpen(true);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const startCrossBusinessRedemption = (preferredBU?: BusinessUnit) => {
    setRedemptionTargetBU(preferredBU || 'LEISURE'); // Default to Leisure as per primary demo flow!
    setIsRedemptionModalOpen(true);
  };

  const redeemReward = (reward: Reward): { success: boolean; error?: string; voucher?: Voucher; newBalance?: number } => {
    if (wallet.availablePoints < reward.pointsRequired) {
      return {
        success: false,
        error: `Insufficient points. You need ${reward.pointsRequired} pts but only have ${wallet.availablePoints} pts in your shared wallet.`,
      };
    }

    const newBalance = wallet.availablePoints - reward.pointsRequired;
    const refCode = `HLR-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    // Expiry date 90 days ahead
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 90);
    const expiryStr = expiryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    // 1. Create digital voucher
    const newVoucher: Voucher = {
      id: `VCH-${Date.now().toString().slice(-4)}`,
      code: `HLY-${reward.businessUnit.slice(0, 3)}-${refCode}`,
      rewardId: reward.id,
      rewardName: reward.name,
      businessUnit: reward.businessUnit,
      pointsSpent: reward.pointsRequired,
      issuedDate: dateStr,
      expiryDate: expiryStr,
      status: 'ACTIVE',
      qrValue: `VCH-${refCode}-AUTHENTIC-HAYLEYS`,
      outletInstructions: `Present this QR code or voucher ref ${refCode} at any participating ${reward.businessUnit} counter upon billing.`,
    };

    // 2. Create ledger transaction
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      description: `Redeemed ${reward.name}`,
      businessUnit: reward.businessUnit,
      date: dateStr,
      time: timeStr,
      receiptRef: refCode,
      points: -reward.pointsRequired,
      type: 'REDEEMED',
      status: 'Completed',
      outletName: `Hayleys ${reward.businessUnit} Redemptions Desk`,
    };

    // 3. Update wallet state
    setWallet((prev) => ({
      ...prev,
      availablePoints: newBalance,
      // If expiring points existed, offset them first
      expiringPoints: Math.max(0, prev.expiringPoints - reward.pointsRequired),
    }));

    // 4. Update transactions list
    setTransactions((prev) => [newTxn, ...prev]);

    // 5. Update vouchers list
    setVouchers((prev) => [newVoucher, ...prev]);

    // 6. Update cross-group mission if applicable
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === 'MIS-01' && m.progress < m.total) {
          return { ...m, progress: 2, status: 'COMPLETED' };
        }
        return m;
      })
    );

    return {
      success: true,
      voucher: newVoucher,
      newBalance,
    };
  };

  const simulateEarn = (bu: BusinessUnit, points: number, desc: string, qualifyingSpend?: number) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const refCode = `REC-${bu.slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTxn: Transaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      description: desc.includes('Silver') ? desc : `${desc} (Silver Member)`,
      businessUnit: bu,
      date: dateStr,
      time: timeStr,
      receiptRef: refCode,
      points,
      type: 'EARNED',
      status: 'Completed',
      outletName: `Hayleys ${bu} Outlet`,
      qualifyingSpendLKR: qualifyingSpend,
    };

    setWallet((prev) => ({
      ...prev,
      availablePoints: prev.availablePoints + points,
      earnedByBU: {
        ...prev.earnedByBU,
        [bu]: (prev.earnedByBU[bu] || 0) + points,
      },
    }));

    setTransactions((prev) => [newTxn, ...prev]);

    // Also update mission progress if Retail
    if (bu === 'RETAIL') {
      setMissions((prev) =>
        prev.map((m) => {
          if (m.id === 'MIS-02' && m.progress < m.total) {
            const nextProgress = m.progress + 1;
            return {
              ...m,
              progress: nextProgress,
              status: nextProgress >= m.total ? 'COMPLETED' : 'IN_PROGRESS',
            };
          }
          return m;
        })
      );
    }
  };

  const markVoucherUsed = (voucherId: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === voucherId ? { ...v, status: 'USED' as const } : v))
    );
  };

  const submitSupportTicket = (
    category: SupportTicket['category'],
    subject: string,
    message: string,
    transactionRef?: string,
    priority?: 'NORMAL' | 'URGENT',
    attachmentName?: string
  ): string => {
    const ticketId = `CAS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newTicket: SupportTicket = {
      id: ticketId,
      date: now,
      subject,
      category,
      transactionRef,
      message,
      status: 'RECEIVED',
      priority: priority || 'NORMAL',
      attachmentName,
      resolutionNotes: 'Case acknowledged by Hayleys Member Support. A ticket officer is assigned.',
      updatedAt: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    return ticketId;
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status'], resolutionNotes?: string) => {
    setSupportTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            status,
            resolutionNotes: resolutionNotes || t.resolutionNotes,
            updatedAt: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          };
        }
        return t;
      })
    );
  };

  const spinLuckyWheel = (points: number, label: string) => {
    setDailySpinClaimed(true);
    simulateEarn('LEISURE', points, `Gamification Daily Lucky Wheel (+${points} pts · ${label})`);
  };

  const claimBadgeBounty = (badgeId: string) => {
    const badge = badges.find((b) => b.id === badgeId);
    if (!badge || badge.status !== 'CLAIMABLE') return;

    setBadges((prev) =>
      prev.map((b) => (b.id === badgeId ? { ...b, status: 'CLAIMED' as const } : b))
    );

    simulateEarn(
      badge.sectorTag === 'GROUP' ? 'RETAIL' : (badge.sectorTag as BusinessUnit),
      badge.pointsBounty,
      `Achievement Badge Unlocked: ${badge.title} (+${badge.pointsBounty} pts)`
    );
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem(`${STORAGE_KEY}_customer`);
      localStorage.removeItem(`${STORAGE_KEY}_wallet`);
      localStorage.removeItem(`${STORAGE_KEY}_transactions`);
      localStorage.removeItem(`${STORAGE_KEY}_change_money`);
      localStorage.removeItem(`${STORAGE_KEY}_vouchers`);
      localStorage.removeItem(`${STORAGE_KEY}_missions`);
      localStorage.removeItem(`${STORAGE_KEY}_support_tickets`);
    } catch {
      // ignore
    }
    setCustomer(INITIAL_CUSTOMER);
    setWallet(INITIAL_WALLET);
    setTransactions(INITIAL_TRANSACTIONS);
    setChangeMoneyLedger(INITIAL_CHANGE_MONEY_LEDGER);
    setVouchers(INITIAL_VOUCHERS);
    setMissions(INITIAL_MISSIONS);
    setBadges(INITIAL_BADGES);
    setDailySpinClaimed(false);
    setSupportTickets(INITIAL_SUPPORT_TICKETS);
    setSupportModalTab('CREATE');
    setRedemptionTargetBU(null);
    setIsRedemptionModalOpen(false);
    setIsDigitalCardOpen(false);
    setIsChangeMoneyModalOpen(false);
    setIsStoreLocatorOpen(false);
    setIsSupportModalOpen(false);
    setIsFamilyModalOpen(false);
    setIsScanQROpen(false);
    setIsGamificationOpen(false);
    setActiveTab('home');
  };

  return (
    <LoyaltyContext.Provider
      value={{
        customer,
        wallet,
        transactions,
        changeMoneyLedger,
        vouchers,
        rewards,
        offers,
        missions,
        supportTickets,
        language,
        setLanguage,
        isLoggedIn,
        setIsLoggedIn,
        activeTab,
        setActiveTab,
        isDigitalCardOpen,
        setIsDigitalCardOpen,
        isVouchersModalOpen,
        setIsVouchersModalOpen,
        selectedPromotion,
        setSelectedPromotion,
        isRedemptionModalOpen,
        setIsRedemptionModalOpen,
        redemptionTargetBU,
        setRedemptionTargetBU,
        isChangeMoneyModalOpen,
        setIsChangeMoneyModalOpen,
        isStoreLocatorOpen,
        setIsStoreLocatorOpen,
        isSupportModalOpen,
        setIsSupportModalOpen,
        supportModalTab,
        setSupportModalTab,
        openSupportModal,
        isFamilyModalOpen,
        setIsFamilyModalOpen,
        isScanQROpen,
        setIsScanQROpen,
        isGamificationOpen,
        setIsGamificationOpen,
        streakWeeks,
        dailySpinClaimed,
        badges,
        spinLuckyWheel,
        claimBadgeBounty,
        redeemReward,
        simulateEarn,
        markVoucherUsed,
        submitSupportTicket,
        updateTicketStatus,
        resetDemoData,
        startCrossBusinessRedemption,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};
