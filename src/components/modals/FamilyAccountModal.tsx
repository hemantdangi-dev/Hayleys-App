import React, { useState } from 'react';
import { X, Users, ShieldCheck, ArrowRightLeft, AlertTriangle, Plus, Check } from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';

export const FamilyAccountModal: React.FC = () => {
  const { customer, isFamilyModalOpen, setIsFamilyModalOpen, wallet } = useLoyalty();
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedMember, setSelectedMember] = useState('Anoma Perera (Spouse)');
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [ruleWarning, setRuleWarning] = useState<string | null>(null);

  if (!isFamilyModalOpen) return null;

  const familyMembers = [
    { name: 'Anoma Perera', relation: 'Spouse', id: 'HLY-FAM-819', status: 'Active Pool' },
    { name: 'Kavinda Perera', relation: 'Child (19)', id: 'HLY-FAM-932', status: 'Active Pool' },
  ];

  const handleSimulateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const pts = parseInt(transferAmount, 10);
    if (isNaN(pts) || pts <= 0) return;

    // RFP Rule: Monthly cap 500 pts, minimum 100 pts
    if (pts < 100) {
      setRuleWarning('Governance Rule: Minimum family transfer is 100 points.');
      return;
    }
    if (pts > 500) {
      setRuleWarning('Governance Rule: Maximum family transfer cap is 500 points per calendar month.');
      return;
    }
    if (pts > wallet.availablePoints) {
      setRuleWarning('Insufficient wallet points balance.');
      return;
    }

    setRuleWarning(null);
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setTransferAmount('');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Family & Household Account</h3>
              <p className="text-[11px] text-slate-500">Governed Point Pooling & Sharing</p>
            </div>
          </div>
          <button
            onClick={() => setIsFamilyModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Governance Notice */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200/70 rounded-2xl flex items-start gap-2.5 text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="block font-bold text-amber-900">Configured Governance Rules:</strong>
              Household transfers are restricted to approved members with a maximum cap of 500 pts/month to protect account security. Unrestricted or commercial transfers are strictly prohibited.
            </div>
          </div>

          {/* Household Members List */}
          <div>
            <span className="font-bold text-slate-700 block mb-2">Registered Household Members</span>
            <div className="space-y-2">
              {familyMembers.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-900">{m.name}</h4>
                    <p className="text-[11px] text-slate-500">
                      {m.relation} · ID: {m.id}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Governed Share Form */}
          <div className="pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-800 block mb-2">
              Transfer Points to Household Member
            </span>

            {transferSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-1">
                <Check className="w-6 h-6 mx-auto text-emerald-700" />
                <h5 className="font-bold text-xs">Transfer Completed</h5>
                <p className="text-[11px] text-emerald-700">
                  Points transferred to {selectedMember} under household pool quota.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulateTransfer} className="space-y-3">
                <div>
                  <label className="text-slate-600 block mb-1">Select Beneficiary</label>
                  <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden text-xs"
                  >
                    <option value="Anoma Perera (Spouse)">Anoma Perera (Spouse)</option>
                    <option value="Kavinda Perera (Child)">Kavinda Perera (Child)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-600">Points to Transfer (Max 500)</label>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Balance: {wallet.availablePoints} pts
                    </span>
                  </div>
                  <input
                    type="number"
                    min="100"
                    max="500"
                    placeholder="Enter points (100 - 500)"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-hidden text-xs"
                  />
                </div>

                {ruleWarning && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] rounded-xl flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{ruleWarning}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
                >
                  Submit Governed Transfer
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
