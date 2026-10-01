'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  Plus,
  MessageSquare,
  Phone,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  X,
  RefreshCw,
} from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // New Lead Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    serviceType: 'DOORSTEP_RELEASE',
    bankName: 'SBI Kadapa Main Branch',
    estimatedGrams: 30,
    pledgeAmount: 150000,
    location: 'Kadapa Town',
    notes: 'Walk-in / Phone inquiry',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadForm),
      });
      const data = await res.json();
      if (res.ok && data.lead) {
        setLeads((prev) => [data.lead, ...prev]);
        setShowAddModal(false);
        setNewLeadForm({
          name: '',
          phone: '',
          serviceType: 'DOORSTEP_RELEASE',
          bankName: 'SBI Kadapa Main Branch',
          estimatedGrams: 30,
          pledgeAmount: 150000,
          location: 'Kadapa Town',
          notes: '',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Filter & Search
  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filterStatus === 'ALL' || lead.status === filterStatus;
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !cleanSearch ||
      lead.name.toLowerCase().includes(cleanSearch) ||
      lead.phone.includes(cleanSearch) ||
      lead.trackingCode.toLowerCase().includes(cleanSearch) ||
      lead.bankName.toLowerCase().includes(cleanSearch);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-gold-700 uppercase tracking-widest block">
            DOORSTEP DISPATCH &amp; PIPELINE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy-950">Customer Inquiries &amp; Leads</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage customer requests, schedule bank branch visits, and send automated WhatsApp updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-navy-950 shadow-xs cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 text-navy-950 font-black text-xs shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manual Phone / Walk-in Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['ALL', 'NEW', 'BANK_VISIT_SCHEDULED', 'RELEASE_COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-navy-950 text-gold-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, code..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-navy-950 focus:ring-2 focus:ring-gold-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Tracking Code</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Service Type</th>
                <th className="py-3.5 px-4">Bank / Branch</th>
                <th className="py-3.5 px-4">Est. Grams</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">WhatsApp Direct</th>
                <th className="py-3.5 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => {
                const waTemplate = encodeURIComponent(
                  `Namaste ${lead.name} garu! This is VR GOLD Kadapa desk.\nRegarding your request (${lead.trackingCode}) for ${lead.bankName}:\nOur executive has been assigned. Please keep your bank pledge slip ready. We will arrive with the required clearance funds.`
                );

                return (
                  <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-950">
                      <Link href={`/track?ref=${lead.trackingCode}`} className="hover:underline text-gold-700">
                        {lead.trackingCode}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-navy-950">{lead.name}</p>
                      <a href={`tel:${lead.phone}`} className="text-gray-500 hover:underline">
                        +91 {lead.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-700">
                      {lead.serviceType.replace(/_/g, ' ')}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-navy-950">{lead.bankName}</p>
                      <span className="text-[10px] text-gray-500">{lead.location}</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-navy-950">{lead.estimatedGrams}g</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          lead.status === 'NEW'
                            ? 'bg-red-100 text-red-800 border border-red-300'
                            : lead.status === 'BANK_VISIT_SCHEDULED'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {lead.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={`https://wa.me/91${lead.phone}?text=${waTemplate}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Send WhatsApp</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                        className="text-[11px] font-bold p-1.5 rounded-lg border border-gray-300 bg-white cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="BANK_VISIT_SCHEDULED">BANK VISIT SCHEDULED</option>
                        <option value="RELEASE_COMPLETED">RELEASE COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Lead Creation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gold-300 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-5 right-5 p-1 text-gray-400 hover:text-navy-950"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-navy-950 mb-1">Add Phone / Walk-in Lead</h3>
            <p className="text-xs text-gray-500 mb-6">
              Record a phone caller or office walk-in customer into the dispatch pipeline.
            </p>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Phone (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Bank / Branch *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.bankName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, bankName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Est. Grams *
                  </label>
                  <input
                    type="number"
                    required
                    value={newLeadForm.estimatedGrams}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, estimatedGrams: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Location in Kadapa
                </label>
                <input
                  type="text"
                  value={newLeadForm.location}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-navy-950 font-black text-xs shadow-md cursor-pointer disabled:opacity-70"
              >
                {submitting ? 'Adding...' : 'Add Lead to Dispatch Pipeline'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
