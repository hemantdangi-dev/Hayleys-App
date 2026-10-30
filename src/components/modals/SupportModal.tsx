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
  Clock,
  ShieldCheck,
  Send,
  Paperclip,
  Check,
  RefreshCw,
  Search,
  Filter,
  Tag,
  Coins,
  Ticket,
  CreditCard,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { SupportTicket } from '../../types';

export const SupportModal: React.FC = () => {
  const {
    isSupportModalOpen,
    setIsSupportModalOpen,
    supportModalTab,
    setSupportModalTab,
    transactions,
    supportTickets,
    submitSupportTicket,
    updateTicketStatus,
    customer,
  } = useLoyalty();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [ticketFilter, setTicketFilter] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ALL');

  // New Case form state
  const [category, setCategory] = useState<SupportTicket['category']>('MISSING_POINTS');
  const [priority, setPriority] = useState<'NORMAL' | 'URGENT'>('NORMAL');
  const [selectedTxnRef, setSelectedTxnRef] = useState('');
  const [claimSubject, setClaimSubject] = useState('');
  const [claimMessage, setClaimMessage] = useState('');
  const [hasAttachment, setHasAttachment] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  if (!isSupportModalOpen) return null;

  const categories: {
    id: SupportTicket['category'];
    label: string;
    desc: string;
    icon: React.FC<{ className?: string }>;
    color: string;
  }[] = [
    {
      id: 'MISSING_POINTS',
      label: 'Missing Points',
      desc: 'Bill points not credited',
      icon: Sparkles,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'CHANGE_MONEY',
      label: 'Change Money',
      desc: 'Cash round-up ledger check',
      icon: Coins,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      id: 'REDEMPTION',
      label: 'Voucher & Redeem',
      desc: 'Outlet discount redemption',
      icon: Ticket,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      id: 'CARD_ISSUE',
      label: `${customer.tier} Tier & Pass`,
      desc: 'Card QR & tier privileges',
      icon: CreditCard,
      color: 'text-purple-700 bg-purple-50 border-purple-200',
    },
    {
      id: 'GENERAL',
      label: 'General Concierge',
      desc: 'Group inquiry or feedback',
      icon: Building2,
      color: 'text-slate-700 bg-slate-50 border-slate-200',
    },
  ];

  const quickSubjects = [
    { text: 'Points missing from Retail Supermarket grocery bill', cat: 'MISSING_POINTS' as const },
    { text: 'Change Money cash round-up not credited at checkout', cat: 'CHANGE_MONEY' as const },
    { text: 'Kingsbury restaurant voucher verification inquiry', cat: 'REDEMPTION' as const },
    { text: `${customer.tier} tier upgrade progress clarification`, cat: 'CARD_ISSUE' as const },
  ];

  const faqs = [
    {
      q: 'How are support cases and missing point claims resolved?',
      a: 'When you submit a case with your receipt reference or store outlet details, our centralized Hayleys Member Services desk cross-references the transaction with the respective subsidiary POS ledger (Retail, Leisure, Travels, or Mobility). Points or balance corrections are usually applied within 2 to 24 hours.',
    },
    {
      q: 'How does the unified Hayleys wallet work across different business units?',
      a: 'Under Scenario 1 of the Hayleys Loyalty Programme, you have a single shared group wallet. Every qualifying purchase at Retail, Leisure, Travels, or Mobility earns reward points into this same wallet. You can then redeem your accumulated points for rewards in any of the participating four business units without needing separate accounts.',
    },
    {
      q: 'What is Change Money and how does it differ from points?',
      a: 'Change Money is legal tender customer currency in Sri Lankan Rupees (LKR) generated when you opt for cash change round-ups at Hayleys Retail checkout counters. It is real customer money, never expires, and is strictly segregated from promotional reward points.',
    },
    {
      q: 'Why is Singer RED not included in this loyalty wallet?',
      a: 'Under the defined RFP Scenario 1 architecture, Singer RED operates on a separate commercial structure and remains strictly outside the shared Hayleys Group loyalty wallet.',
    },
    {
      q: 'What privileges do I receive as a Silver Tier member?',
      a: 'Silver members receive 1x base points on all purchases, 15% dining savings at The Kingsbury and Amaya Resorts, access to digital pass scanning, and governed household pooling.',
    },
  ];

  const handleCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimSubject.trim()) return;

    const attachmentName = hasAttachment ? `receipt_${Date.now().toString().slice(-4)}.jpg` : undefined;

    const ticketId = submitSupportTicket(
      category,
      claimSubject.trim(),
      claimMessage.trim() || 'No additional notes provided by member.',
      selectedTxnRef || undefined,
      priority,
      attachmentName
    );

    setSubmittedTicketId(ticketId);
  };

  const handleCycleDemoStatus = (ticket: SupportTicket) => {
    if (ticket.status === 'RECEIVED') {
      updateTicketStatus(
        ticket.id,
        'IN_REVIEW',
        `Assigned to Hayleys ${ticket.category === 'CHANGE_MONEY' ? 'Retail POS Officer' : 'Member Services Officer'}. Verification underway with outlet system.`
      );
    } else if (ticket.status === 'IN_REVIEW') {
      updateTicketStatus(
        ticket.id,
        'RESOLVED',
        `Case verified and approved. Relevant adjustment synchronized with ${customer.name}'s account.`
      );
    } else {
      updateTicketStatus(
        ticket.id,
        'RECEIVED',
        'Case reopened for demonstration cycle.'
      );
    }
  };

  const handleClose = () => {
    setIsSupportModalOpen(false);
    setTimeout(() => {
      setSubmittedTicketId(null);
      setClaimSubject('');
      setClaimMessage('');
      setSelectedTxnRef('');
      setHasAttachment(false);
    }, 200);
  };

  const filteredTickets = supportTickets.filter((t) => {
    if (ticketFilter === 'ACTIVE') return t.status === 'RECEIVED' || t.status === 'IN_REVIEW';
    if (ticketFilter === 'RESOLVED') return t.status === 'RESOLVED';
    return true;
  });

  const activeTicketsCount = supportTickets.filter((t) => t.status !== 'RESOLVED').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FileQuestion className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-white">Member Support & Cases</h3>
                {activeTicketsCount > 0 && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                    {activeTicketsCount} Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Hayleys Group Centralized Case Desk · Omnichannel Resolution
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-3 p-1.5 bg-slate-100 text-xs font-semibold text-center border-b border-slate-200">
          <button
            onClick={() => {
              setSupportModalTab('CREATE');
              setSubmittedTicketId(null);
            }}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              supportModalTab === 'CREATE'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Open New Case
          </button>
          <button
            onClick={() => setSupportModalTab('TRACK')}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              supportModalTab === 'TRACK'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Track Cases</span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-bold">
              {supportTickets.length}
            </span>
          </button>
          <button
            onClick={() => setSupportModalTab('FAQ')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              supportModalTab === 'FAQ'
                ? 'bg-white text-slate-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FAQs & Concierge
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: CREATE NEW CASE */}
          {supportModalTab === 'CREATE' && (
            <div>
              {submittedTicketId ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900">
                      Support Case Created!
                    </h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                      Your ticket has been logged with the Hayleys Group Member Care desk. A notification has been sent.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl max-w-xs mx-auto text-left space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Case Reference:</span>
                      <span className="font-mono font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {submittedTicketId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Status:</span>
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[10px]">
                        RECEIVED
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Member:</span>
                      <span className="font-medium text-slate-700">{customer.name} ({customer.tier})</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => setSupportModalTab('TRACK')}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      View in Case Tracker →
                    </button>
                    <button
                      onClick={() => {
                        setSubmittedTicketId(null);
                        setClaimSubject('');
                        setClaimMessage('');
                        setSelectedTxnRef('');
                        setHasAttachment(false);
                      }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Create Another Case
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCaseSubmit} className="space-y-4 text-xs">
                  {/* Category Selection */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 block">
                      Case Category *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = category === cat.id;
                        return (
                          <button
                            type="button"
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            </div>
                            <div className="mt-2">
                              <span className="font-bold block text-[11px] leading-tight truncate">
                                {cat.label}
                              </span>
                              <span
                                className={`text-[9px] block truncate ${
                                  isSelected ? 'text-slate-300' : 'text-slate-400'
                                }`}
                              >
                                {cat.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Priority and Related Transaction Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Priority Level
                      </label>
                      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setPriority('NORMAL')}
                          className={`py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                            priority === 'NORMAL'
                              ? 'bg-white text-slate-800 shadow-xs'
                              : 'text-slate-500'
                          }`}
                        >
                          Normal
                        </button>
                        <button
                          type="button"
                          onClick={() => setPriority('URGENT')}
                          className={`py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                            priority === 'URGENT'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-slate-500'
                          }`}
                        >
                          Urgent / High
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Link Transaction (Optional)
                      </label>
                      <select
                        value={selectedTxnRef}
                        onChange={(e) => setSelectedTxnRef(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-slate-800 text-xs font-medium"
                      >
                        <option value="">-- No specific transaction --</option>
                        {transactions.slice(0, 6).map((tx) => (
                          <option key={tx.id} value={tx.receiptRef}>
                            {tx.businessUnit}: {tx.description.slice(0, 24)}... ({tx.receiptRef})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quick Suggestion Chips */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">
                      Quick Suggestions (Tap to prefill)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickSubjects.map((qs, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => {
                            setClaimSubject(qs.text);
                            setCategory(qs.cat);
                          }}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] rounded-lg transition-colors cursor-pointer truncate max-w-full text-left"
                        >
                          + {qs.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Case Subject */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Case Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Points not credited for Colombo 03 Supermarket bill"
                      value={claimSubject}
                      onChange={(e) => setClaimSubject(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-slate-800 text-xs"
                    />
                  </div>

                  {/* Case Details / Message */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Details / Invoice Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Provide store location, cashier receipt number, invoice total, or details to expedite resolution..."
                      value={claimMessage}
                      onChange={(e) => setClaimMessage(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-slate-800 text-xs"
                    />
                  </div>

                  {/* Simulated Receipt Attachment */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-slate-500" />
                      <div className="text-left">
                        <span className="font-bold text-slate-800 block text-[11px]">
                          {hasAttachment ? 'Receipt attached: POS_BILL_9021.jpg' : 'Attach Store Receipt or Photo'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {hasAttachment ? '1.2 MB · Verified image format' : 'Supports JPG, PNG, PDF up to 5MB'}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHasAttachment(!hasAttachment)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                        hasAttachment
                          ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      {hasAttachment ? 'Remove' : '+ Attach Receipt'}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>Submit Support Case</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: TRACK CASES */}
          {supportModalTab === 'TRACK' && (
            <div className="space-y-3.5">
              {/* Header and Filter */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Logged Support Cases ({filteredTickets.length})
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Track case review, agent updates & points adjustment
                  </span>
                </div>

                {/* Filter pills */}
                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                  {(['ALL', 'ACTIVE', 'RESOLVED'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTicketFilter(filter)}
                      className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                        ticketFilter === filter
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {filteredTickets.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">No support cases found</p>
                  <p className="text-[11px] text-slate-500">
                    {ticketFilter !== 'ALL'
                      ? 'No cases match the selected filter.'
                      : 'You have not submitted any cases yet.'}
                  </p>
                  <button
                    onClick={() => setSupportModalTab('CREATE')}
                    className="mt-2 px-3 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    + Open New Case
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTickets.map((ticket) => {
                    const isResolved = ticket.status === 'RESOLVED';
                    const isInReview = ticket.status === 'IN_REVIEW';

                    return (
                      <div
                        key={ticket.id}
                        className="p-4 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl shadow-xs space-y-2.5 transition-all"
                      >
                        {/* Top Row: Case ID, Category, Priority, and Status */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-mono font-extrabold text-xs text-slate-900">
                                {ticket.id}
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                {ticket.category.replace('_', ' ')}
                              </span>
                              {ticket.priority === 'URGENT' && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                                  URGENT
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              Submitted: {ticket.date}
                            </span>
                          </div>

                          {/* Status Pill */}
                          <div>
                            {isResolved ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                                RESOLVED
                              </span>
                            ) : isInReview ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                                <Clock className="w-3 h-3 text-blue-700 animate-pulse" />
                                IN REVIEW
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                <Clock className="w-3 h-3 text-amber-700" />
                                RECEIVED
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Subject & Description */}
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 leading-snug">
                            {ticket.subject}
                          </h4>
                          {ticket.message && (
                            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                              {ticket.message}
                            </p>
                          )}
                          {ticket.transactionRef && (
                            <div className="mt-1 text-[10px] text-slate-500 font-mono">
                              Invoice / Txn Ref: <strong className="text-slate-700">{ticket.transactionRef}</strong>
                            </div>
                          )}
                          {ticket.attachmentName && (
                            <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                              <Paperclip className="w-3 h-3" />
                              <span>Attached: {ticket.attachmentName}</span>
                            </div>
                          )}
                        </div>

                        {/* Resolution / Agent Notes */}
                        {ticket.resolutionNotes && (
                          <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] space-y-0.5">
                            <span className="font-bold text-slate-700 block text-[10px] uppercase tracking-wide">
                              Officer Resolution Notes:
                            </span>
                            <p className="text-slate-600 leading-relaxed">
                              {ticket.resolutionNotes}
                            </p>
                            {ticket.updatedAt && (
                              <span className="text-[9px] text-slate-400 block pt-0.5">
                                Last updated at {ticket.updatedAt}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Demo Action: Cycle status */}
                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 italic">
                            Client demo status progression:
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCycleDemoStatus(ticket)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                            title="Cycle status for client demonstration"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>
                              Simulate: {isResolved ? 'Re-open' : isInReview ? 'Mark Resolved' : 'Mark In-Review'}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FAQ & CONCIERGE */}
          {supportModalTab === 'FAQ' && (
            <div className="space-y-4">
              {/* Concierge Banner */}
              <div className="p-4 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="font-extrabold text-xs text-white">
                    Hayleys Group Member Concierge
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Dedicated customer service desk for {customer.tier} loyalty members across Retail, Leisure, Travels, and Mobility.
                </p>
                <div className="pt-2 text-[11px] text-emerald-300 space-y-1 font-mono">
                  <div>Hotline: +94 11 268 7000 (Mon - Sun, 8:00 - 20:00)</div>
                  <div>Email: loyalty@hayleys.com</div>
                  <div>Head Office: 400 Deans Road, Colombo 10, Sri Lanka</div>
                </div>
              </div>

              {/* FAQs */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Frequently Asked Questions:
                </span>
                {faqs.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div
                      key={index}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all text-xs"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full p-3.5 text-left font-bold text-slate-800 flex items-center justify-between gap-2 hover:bg-slate-50 cursor-pointer"
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
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">
            {customer.tier} Tier · {customer.name} ({customer.membershipId})
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
