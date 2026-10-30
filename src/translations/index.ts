import { Language } from '../types';

export interface Translations {
  appName: string;
  groupTagline: string;
  scenarioTag: string;
  nav: {
    home: string;
    activity: string;
    offers: string;
    rewards: string;
    profile: string;
  };
  home: {
    greeting: string;
    membershipTier: string;
    availablePoints: string;
    pendingPoints: string;
    expiringPoints: string;
    vouchers: string;
    changeMoney: string;
    redeemAcrossGroup: string;
    viewWallet: string;
    viewActivity: string;
    businessUnitsTitle: string;
    businessUnitsSubtitle: string;
    personalizedOffers: string;
    activeMission: string;
    tapToScan: string;
  };
  bu: {
    RETAIL: string;
    LEISURE: string;
    TRAVELS: string;
    MOBILITY: string;
  };
  buDesc: {
    RETAIL: string;
    LEISURE: string;
    TRAVELS: string;
    MOBILITY: string;
  };
  wallet: {
    title: string;
    sharedWalletSubtitle: string;
    pointsSummary: string;
    changeMoneyNotice: string;
    buEarnBreakdown: string;
    vouchersTitle: string;
    redeemAction: string;
    changeMoneyHistory: string;
  };
  redemption: {
    chooseBusinessUnit: string;
    browseRewards: string;
    pointsRequired: string;
    availableBalance: string;
    projectedBalance: string;
    redeemButton: string;
    confirmTitle: string;
    confirmWarning: string;
    successTitle: string;
    successMessage: string;
    voucherIssued: string;
    referenceCode: string;
    insufficientPoints: string;
  };
  common: {
    viewAll: string;
    explore: string;
    back: string;
    close: string;
    cancel: string;
    confirm: string;
    pts: string;
    lkr: string;
    resetDemo: string;
  };
}

export const translations: Record<Language, Translations> = {
  EN: {
    appName: 'Hayleys Group Loyalty',
    groupTagline: 'One Group-Wide Wallet · Earn Anywhere · Redeem Anywhere',
    scenarioTag: 'Scenario 1 Demo: Shared loyalty across four participating business units',
    nav: {
      home: 'Home',
      activity: 'Activity',
      offers: 'Offers',
      rewards: 'Rewards',
      profile: 'Profile',
    },
    home: {
      greeting: 'Hello Nimal',
      membershipTier: 'Silver Member',
      availablePoints: 'Available Points',
      pendingPoints: 'Pending Points',
      expiringPoints: 'Expiring Soon',
      vouchers: 'Available Vouchers',
      changeMoney: 'Change Money (LKR)',
      redeemAcrossGroup: 'Redeem Across Hayleys',
      viewWallet: 'Unified Wallet',
      viewActivity: 'View All Activity',
      businessUnitsTitle: 'Participating Business Units',
      businessUnitsSubtitle: 'One shared wallet across all four sectors',
      personalizedOffers: 'Offers For You',
      activeMission: 'Active Milestone',
      tapToScan: 'Tap card to show QR code',
    },
    bu: {
      RETAIL: 'Retail',
      LEISURE: 'Leisure',
      TRAVELS: 'Travels',
      MOBILITY: 'Mobility',
    },
    buDesc: {
      RETAIL: 'Supermarkets, FMCG & lifestyle stores',
      LEISURE: 'Luxury hotels, resorts & dining',
      TRAVELS: 'Bespoke tours, holidays & ticketing',
      MOBILITY: 'Executive fleets, transfers & EV charging',
    },
    wallet: {
      title: 'Group Loyalty Wallet',
      sharedWalletSubtitle: 'Unified points wallet across Retail, Leisure, Travels, and Mobility',
      pointsSummary: 'Reward Points Balance',
      changeMoneyNotice: 'Change Money is legal tender customer currency in LKR and remains strictly segregated from promotional reward points.',
      buEarnBreakdown: 'Points Earned by Sector',
      vouchersTitle: 'Active Digital Vouchers',
      redeemAction: 'Redeem Points Across Group',
      changeMoneyHistory: 'Change Money Details',
    },
    redemption: {
      chooseBusinessUnit: '1. Select Business Unit to Redeem',
      browseRewards: '2. Select Eligible Reward',
      pointsRequired: 'Points Required',
      availableBalance: 'Current Available Points',
      projectedBalance: 'Balance After Redemption',
      redeemButton: 'Confirm Redemption',
      confirmTitle: 'Confirm Cross-Business Redemption',
      confirmWarning: 'You are redeeming points earned across the group for this reward.',
      successTitle: 'Redemption Successful!',
      successMessage: 'Your digital voucher is ready and your group wallet has been updated.',
      voucherIssued: 'Voucher Added to Wallet',
      referenceCode: 'Redemption Ref',
      insufficientPoints: 'Insufficient Points Balance',
    },
    common: {
      viewAll: 'View All',
      explore: 'Explore',
      back: 'Back',
      close: 'Close',
      cancel: 'Cancel',
      confirm: 'Confirm',
      pts: 'pts',
      lkr: 'LKR',
      resetDemo: 'Reset Demo State',
    },
  },
  SI: {
    appName: 'හේලීස් සමූහ ලෝයල්ටි',
    groupTagline: 'එක් පොදු මුදල් පසුම්බියක් · ඕනෑම තැනක උපයන්න · ඕනෑම තැනක මුදාහරින්න',
    scenarioTag: 'පළමු අවස්ථා නිරූපණය: ව්‍යාපාර අංශ 4ක් හරහා හවුල් ලෝයල්ටි පද්ධතිය',
    nav: {
      home: 'මුල් පිටුව',
      activity: 'ක්‍රියාකාරකම්',
      offers: 'දීමනා',
      rewards: 'ප්‍රතිලාභ',
      profile: 'පැතිකඩ',
    },
    home: {
      greeting: 'හෙලෝ නිමල්',
      membershipTier: 'රිදී සාමාජික (Silver)',
      availablePoints: 'ලබාගත හැකි ලකුණු',
      pendingPoints: 'පොරොත්තු ලකුණු',
      expiringPoints: 'කල් ඉකුත්වන ලකුණු',
      vouchers: 'ක්‍රියාකාරී වවුචර්',
      changeMoney: 'ඉතිරි මුදල් (LKR)',
      redeemAcrossGroup: 'හේලීස් ජාලය පුරා මුදාගන්න',
      viewWallet: 'පොදු මුදල් පසුම්බිය',
      viewActivity: 'සියලු ක්‍රියාකාරකම්',
      businessUnitsTitle: 'සහභාගී වන ව්‍යාපාර අංශ',
      businessUnitsSubtitle: 'අංශ 4 පුරාම එකම පසුම්බියකින් ප්‍රතිලාභ',
      personalizedOffers: 'ඔබ වෙනුවෙන්ම විශේෂ දීමනා',
      activeMission: 'සක්‍රීය ඉලක්කය',
      tapToScan: 'QR කේතය බැලීමට ස්පර්ශ කරන්න',
    },
    bu: {
      RETAIL: 'සිල්ලර වෙළඳාම',
      LEISURE: 'සංචාරක සහ හෝටල්',
      TRAVELS: 'ගුවන් සහ චාරිකා',
      MOBILITY: 'ප්‍රවාහන සේවා',
    },
    buDesc: {
      RETAIL: 'සුපිරි වෙළඳසැල් සහ භාණ්ඩ',
      LEISURE: 'සුඛෝපභෝගී හෝටල් සහ භෝජනාගාර',
      TRAVELS: 'දේශීය සහ විදේශීය චාරිකා',
      MOBILITY: 'විධායක රථ සහ ආරෝපණ සේවා',
    },
    wallet: {
      title: 'සමූහ ලෝයල්ටි පසුම්බිය',
      sharedWalletSubtitle: 'ව්‍යාපාර අංශ 4 සඳහාම පොදු ලකුණු පසුම්බිය',
      pointsSummary: 'ප්‍රතිලාභ ලකුණු ශේෂය',
      changeMoneyNotice: 'ඉතිරි මුදල් (Change Money) රුපියල් මුදලක් වන අතර ප්‍රවර්ධන ලකුණු සමඟ මුසු නොවේ.',
      buEarnBreakdown: 'අංශය අනුව උපයාගත් ලකුණු',
      vouchersTitle: 'ඩිජිටල් වවුචර්',
      redeemAction: 'ලකුණු මුදාගන්න',
      changeMoneyHistory: 'ඉතිරි මුදල් විස්තර',
    },
    redemption: {
      chooseBusinessUnit: '1. මුදාගැනීමට ව්‍යාපාර අංශය තෝරන්න',
      browseRewards: '2. ප්‍රතිලාභය තෝරන්න',
      pointsRequired: 'අවශ්‍ය ලකුණු',
      availableBalance: 'පවතින ලකුණු',
      projectedBalance: 'ඉතිරිවන ලකුණු',
      redeemButton: 'මුදාගැනීම තහවුරු කරන්න',
      confirmTitle: 'ව්‍යාපාර හරස් මුදාගැනීම තහවුරු කිරීම',
      confirmWarning: 'ඔබ සමූහය පුරා උපයාගත් ලකුණු මෙම ප්‍රතිලාභය සඳහා යොදවයි.',
      successTitle: 'සාර්ථකයි!',
      successMessage: 'ඔබගේ ඩිජිටල් වවුචරය සූදානම්.',
      voucherIssued: 'වවුචරය එක්විය',
      referenceCode: 'යොමු අංකය',
      insufficientPoints: 'ප්‍රමාණවත් ලකුණු නොමැත',
    },
    common: {
      viewAll: 'සියල්ල බලන්න',
      explore: 'තොරතුරු',
      back: 'ආපසු',
      close: 'වසන්න',
      cancel: 'අවලංගු කරන්න',
      confirm: 'තහවුරු කරන්න',
      pts: 'ලකුණු',
      lkr: 'රු.',
      resetDemo: 'නිරූපණය යළි පිහිටුවන්න',
    },
  },
  TA: {
    appName: 'ஹெய்லீஸ் குழும விசுவாச செயலி',
    groupTagline: 'ஒரே குழு பணப்பை · எங்கும் சம்பாதிக்கலாம் · எங்கும் மீட்டெடுக்கலாம்',
    scenarioTag: 'காட்சி 1 செயல்விளக்கம்: நான்கு வணிகப் பிரிவுகளுக்கான பகிரப்பட்ட விசுவாச திட்டம்',
    nav: {
      home: 'முகப்பு',
      activity: 'செயற்பாடுகள்',
      offers: 'சலுகைகள்',
      rewards: 'வெகுமதிகள்',
      profile: 'சுயவிவரம்',
    },
    home: {
      greeting: 'ஹலோ நிமால்',
      membershipTier: 'வெள்ளி உறுப்பினர் (Silver)',
      availablePoints: 'கிடைக்கக்கூடிய புள்ளிகள்',
      pendingPoints: 'நிலுவையில் உள்ள புள்ளிகள்',
      expiringPoints: 'விரைவில் காலாவதியாகும்',
      vouchers: 'செயலில் உள்ள கூப்பன்கள்',
      changeMoney: 'சில்லறை பணம் (LKR)',
      redeemAcrossGroup: 'குழுமத்தில் மீட்டெடுக்கவும்',
      viewWallet: 'ஒருங்கிணைந்த பணப்பை',
      viewActivity: 'அனைத்து செயல்பாடுகள்',
      businessUnitsTitle: 'பங்கேற்கும் வணிகப் பிரிவுகள்',
      businessUnitsSubtitle: 'நான்கு துறைகளுக்கும் ஒரே பகிர்வு பணப்பை',
      personalizedOffers: 'உங்களுக்கான சலுகைகள்',
      activeMission: 'நடப்பு மைல்கல்',
      tapToScan: 'QR குறியீட்டைக் பார்க்க தொடவும்',
    },
    bu: {
      RETAIL: 'சில்லறை விற்பனை',
      LEISURE: 'சுற்றுலா மற்றும் விருந்தோம்பல்',
      TRAVELS: 'பயணங்கள்',
      MOBILITY: 'போக்குவரத்து சேவைகள்',
    },
    buDesc: {
      RETAIL: 'பல்பொருள் அங்காடிகள் மற்றும் சில்லறை',
      LEISURE: 'சொகுசு ஹோட்டல்கள் மற்றும் உணவகங்கள்',
      TRAVELS: 'தனிப்பயன் பயணங்கள் மற்றும் சுற்றுலா',
      MOBILITY: 'சொகுசு வாகனங்கள் மற்றும் மின்சார சார்ஜிங்',
    },
    wallet: {
      title: 'குழும விசுவாச பணப்பை',
      sharedWalletSubtitle: 'நான்கு வணிகப் பிரிவுகளுக்கான பொதுவான பணப்பை',
      pointsSummary: 'வெகுமதி புள்ளிகள் இருப்பு',
      changeMoneyNotice: 'சில்லறை பணம் (Change Money) என்பது வாடிக்கையாளர் இலங்கை ரூபாய் பணமாகும், இது வெகுமதி புள்ளிகளிலிருந்து தனித்து வைக்கப்பட்டுள்ளது.',
      buEarnBreakdown: 'துறை வாரியாக ஈட்டிய புள்ளிகள்',
      vouchersTitle: 'டிஜிட்டல் கூப்பன்கள்',
      redeemAction: 'புள்ளிகளை மீட்டெடுங்கள்',
      changeMoneyHistory: 'சில்லறை பண விவரங்கள்',
    },
    redemption: {
      chooseBusinessUnit: '1. மீட்டெடுக்க வணிகப் பிரிவைத் தேர்ந்தெடுக்கவும்',
      browseRewards: '2. தகுதியான வெகுமதியைத் தேர்ந்தெடுக்கவும்',
      pointsRequired: 'தேவையான புள்ளிகள்',
      availableBalance: 'தற்போதைய புள்ளிகள்',
      projectedBalance: 'மீதமுள்ள புள்ளிகள்',
      redeemButton: 'மீட்பை உறுதிப்படுத்தவும்',
      confirmTitle: 'குறுக்கு-வணிக மீட்பை உறுதிப்படுத்தவும்',
      confirmWarning: 'குழுமம் முழுவதும் ஈட்டிய புள்ளிகளை இந்த வெகுமதிக்காக பயன்படுத்துகிறீர்கள்.',
      successTitle: 'வெற்றி பெற்றது!',
      successMessage: 'உங்கள் டிஜிட்டல் கூப்பன் தயாராக உள்ளது.',
      voucherIssued: 'கூப்பன் சேர்க்கப்பட்டது',
      referenceCode: 'குறிப்பு எண்',
      insufficientPoints: 'போதிய புள்ளிகள் இல்லை',
    },
    common: {
      viewAll: 'அனைத்தும்',
      explore: 'ஆராய்க',
      back: 'பின்செல்',
      close: 'மூடுக',
      cancel: 'ரத்து செய்',
      confirm: 'உறுதிப்படுத்து',
      pts: 'புள்ளிகள்',
      lkr: 'ரூ.',
      resetDemo: 'மீட்டமைக்கவும்',
    },
  },
};
