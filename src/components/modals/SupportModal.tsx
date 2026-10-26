import React, { useState } from 'react';
import {
  X,
  HelpCircle,
  FileQuestion,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { SupportTicket } from '../../types';

export const SupportModal: React.FC = () => {
  const { isSupportModalOpen, setIsSupportModalOpen, transactions, submitSupportTicket } = useLoyalty();

  const [activeTab, setActiveTab] = useState<'FAQ' | 'CLAIM' | 'CONTACT'>('FAQ');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Missing points form state
  const [selectedTxnRef, setSelectedTxnRef] = useState('');
  const [claimSubject, setClaimSubject] = useState('');
  const [claimMessage, setClaimMessage] = useState('');
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  if (!isSupportModalOpen) return null;

  const faqs = [
    {
      q: 'How does the unified Hayleys wallet work across different business units?',
      a: 'Under Scenario 1 of the Hayleys Loyalty Programme, you have a single shared group wallet. Every qualifying purchase at Retail, Leisure, Travels, or Mobility earns reward points into this same wallet. You can then redeem your accumulated points for rewards in any of the participating four business units without needing separate accounts.',
    },
    {
      q: 'Why is Singer RED not included in this loyalty wallet?',
      a: 'Under the defined RFP Scenario 1 architecture, Singer RED operates on a separate commercial structure and remains strictly outside the shared Hayleys Group loyalty wallet.',
    },
    {
      q: 'What is Change Money and how does it differ from points?',
      a: 'Change Money is legal tender customer currency in Sri Lankan Rupees (LKR) generated when you opt for cash change round-ups at Hayleys Retail checkout counters. It is real customer money, never expires, and is strictly segregated from promotional reward points.',
    },
    {
      q: 'Do reward points expire?',
      a: 'Promotional loyalty points carry a rolling 12-month validity period. The app displays upcoming expiring points well in advance so you can redeem them before the deadline.',
    },
  ];

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimSubject.trim()) return;

    const ticketId = submitSupportTicket(
      'MISSING_POINTS',
      claimSubject,
      claimMessage,
      selectedTxnRef || undefined
    );
    setSubmittedTicketId(ticketId);
  };

  const handleClose = () => {
    setIsSupportModalOpen(false);
    setTimeout(() => {
      setSubmittedTicketId(null);
      setClaimSubject('');
      setClaimMessage('');
      setSelectedTxnRef('');
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Help & Member Support</h3>
              <p className="text-[11px] text-slate-500">Hayleys Loyalty Member Services</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-3 p-1 bg-slate-100 text-xs font-semibold text-center border-b border-slate-200">
          <button
            onClick={() => setActiveTab('FAQ')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'FAQ' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('CLAIM')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'CLAIM' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
            }`}
          >
            Missing Points
          </button>
          <button
            onClick={() => setActiveTab('CONTACT')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'CONTACT' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
            }`}
          >
            Contact Desk
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'FAQ' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Frequently Asked Questions</span>
              <div className="space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all text-xs"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full p-3.5 text-left font-bold text-slate-800 flex items-center justify-between gap-2 hover:bg-slate-50"
                      >
                        <span className="leading-snug">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-emerald-700 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-3.5 pt-0 text-slate-600 bg-slate-50/50 text-[11px] leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'CLAIM' && (
            <div>
              {submittedTicketId ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Request Submitted</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Your claim for missing loyalty points has been logged. Our loyalty team will verify your receipt with the outlet.
                  </p>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl inline-block font-mono text-xs text-emerald-800 font-bold">
                    Ticket Ref: {submittedTicketId}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmittedTicketId(null)}
                      className="text-xs text-emerald-700 font-semibold hover:underline"
                    >
                      Submit another claim
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleClaimSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Related Transaction (Optional)
                    </label>
                    <select
                      value={selectedTxnRef}
                      onChange={(e) => setSelectedTxnRef(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-emerald-500"
                    >
                      <option value="">-- Select past transaction --</option>
                      {transactions.map((tx) => (
                        <option key={tx.id} value={tx.receiptRef}>
                          {tx.businessUnit}: {tx.description} ({tx.receiptRef})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Claim Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Points not credited for Colombo Supermarket bill"
                      value={claimSubject}
                      onChange={(e) => setClaimSubject(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-emerald-500"
                    >
                    </input>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Receipt Details / Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Enter bill number, store location, spend amount in LKR, or details..."
                      value={claimMessage}
                      onChange={(e) => setClaimMessage(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-emerald-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Submit Missing Points Request
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'CONTACT' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-950 space-y-2">
                <span className="font-bold block text-emerald-900">
                  Hayleys Loyalty Concierge
                </span>
                <p className="text-[11px] leading-relaxed">
                  Dedicated assistance for Emerald and President’s Club members across Sri Lanka.
                </p>
                <div className="pt-2 text-[11px] space-y-1 font-medium">
                  <div>Hotline: +94 11 268 7000 (Mon - Sun, 8:00 - 20:00)</div>
                  <div>Email: loyalty@hayleys.com</div>
                  <div>Head Office: 400 Deans Road, Colombo 10, Sri Lanka</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
