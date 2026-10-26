/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LoyaltyProvider, useLoyalty } from './context/LoyaltyContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DemoHelperBar } from './components/common/DemoHelperBar';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { ActivityScreen } from './components/screens/ActivityScreen';
import { OffersScreen } from './components/screens/OffersScreen';
import { RewardsScreen } from './components/screens/RewardsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

// Modals
import { DigitalCardModal } from './components/modals/DigitalCardModal';
import { RedemptionModal } from './components/modals/RedemptionModal';
import { ChangeMoneyModal } from './components/modals/ChangeMoneyModal';
import { StoreLocatorModal } from './components/modals/StoreLocatorModal';
import { SupportModal } from './components/modals/SupportModal';
import { FamilyAccountModal } from './components/modals/FamilyAccountModal';
import { ScanQRModal } from './components/modals/ScanQRModal';
import { GamificationModal } from './components/modals/GamificationModal';

const AppContent: React.FC = () => {
  const { isLoggedIn, activeTab } = useLoyalty();
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'wallet':
        return <WalletScreen />;
      case 'activity':
        return <ActivityScreen />;
      case 'offers':
        return <OffersScreen />;
      case 'rewards':
        return <RewardsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      {/* Presentation Helper Bar at top for stakeholder demos */}
      <DemoHelperBar isPhoneFrame={isPhoneFrame} setIsPhoneFrame={setIsPhoneFrame} />

      {/* Main Viewport Container */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-4">
        <main
          className={`w-full bg-slate-50 flex flex-col relative transition-all duration-300 ${
            isPhoneFrame
              ? 'max-w-[400px] h-[844px] md:h-[820px] rounded-none md:rounded-[40px] shadow-2xl md:border-[10px] md:border-slate-800 overflow-hidden'
              : 'max-w-2xl min-h-[90vh] rounded-none md:rounded-3xl shadow-xl overflow-hidden'
          }`}
        >
          {/* Top Sticky App Header */}
          <Header />

          {/* Dynamic Scrollable Screen Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {renderActiveScreen()}
          </div>

          {/* Persistent Bottom Tab Navigation */}
          <BottomNav />
        </main>
      </div>

      {/* Global Interactive Modals */}
      <DigitalCardModal />
      <RedemptionModal />
      <ChangeMoneyModal />
      <StoreLocatorModal />
      <SupportModal />
      <FamilyAccountModal />
      <ScanQRModal />
      <GamificationModal />
    </div>
  );
};

export default function App() {
  return (
    <LoyaltyProvider>
      <AppContent />
    </LoyaltyProvider>
  );
}
