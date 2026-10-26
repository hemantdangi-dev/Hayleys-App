export type BusinessUnit = 'RETAIL' | 'LEISURE' | 'TRAVELS' | 'MOBILITY';

export type Language = 'EN' | 'SI' | 'TA';

export interface CustomerProfile {
  name: string;
  membershipId: string;
  tier: 'Emerald' | 'Emerald Executive' | 'President\'s Club';
  joinedYear: number;
  phone: string;
  email: string;
  preferredBU: BusinessUnit;
  familyMembersCount: number;
}

export interface WalletState {
  availablePoints: number;
  pendingPoints: number;
  expiringPoints: number;
  expiringDate: string;
  changeMoneyLKR: number;
  earnedByBU: Record<BusinessUnit, number>;
}

export interface ChangeMoneyTransaction {
  id: string;
  date: string;
  time: string;
  type: 'CREDIT_ROUNDUP' | 'DEBIT_REDEMPTION';
  amountLKR: number;
  businessUnit: 'RETAIL';
  store: string;
  receiptRef: string;
  notes: string;
}

export type TransactionType = 'EARNED' | 'REDEEMED' | 'REVERSED';
export type TransactionStatus = 'Completed' | 'Pending' | 'Reversed';

export interface Transaction {
  id: string;
  description: string;
  businessUnit: BusinessUnit;
  date: string;
  time: string;
  receiptRef: string;
  points: number; // positive for earned, negative for redeemed
  type: TransactionType;
  status: TransactionStatus;
  outletName?: string;
  qualifyingSpendLKR?: number;
}

export interface Reward {
  id: string;
  name: string;
  businessUnit: BusinessUnit;
  category: 'Dining' | 'Stays' | 'Grocery' | 'Travel' | 'Mobility' | 'Lifestyle';
  pointsRequired: number;
  originalValueLKR: number;
  image: string;
  description: string;
  terms: string[];
  eligibilityNote: string;
  featured?: boolean;
}

export interface Voucher {
  id: string;
  code: string;
  rewardId: string;
  rewardName: string;
  businessUnit: BusinessUnit;
  pointsSpent: number;
  issuedDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
  qrValue: string;
  outletInstructions: string;
}

export interface Offer {
  id: string;
  title: string;
  businessUnit: BusinessUnit;
  discountOrBonus: string;
  category: string;
  validUntil: string;
  image: string;
  description: string;
  isForYou: boolean;
  isMemberOnly: boolean;
  terms: string[];
  code?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  unit: string;
  rewardPoints: number;
  businessUnit: BusinessUnit | 'GROUP';
  status: 'IN_PROGRESS' | 'COMPLETED';
  expiresInDays: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  pointsBounty: number;
  status: 'LOCKED' | 'CLAIMABLE' | 'CLAIMED';
  progress: number;
  total: number;
  sectorTag: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  businessUnit: BusinessUnit;
  address: string;
  city: string;
  phone: string;
  hours: string;
  distanceKm: number;
}

export interface SupportTicket {
  id: string;
  date: string;
  subject: string;
  category: 'MISSING_POINTS' | 'CHANGE_MONEY' | 'REDEMPTION' | 'CARD_ISSUE' | 'GENERAL';
  transactionRef?: string;
  message: string;
  status: 'RECEIVED' | 'IN_REVIEW' | 'RESOLVED';
}
