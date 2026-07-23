'use client';

import { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Search,
  Bell
} from 'lucide-react';

interface KYCRequest {
  id: string;
  name: string;
  email: string;
  docType: 'Passport' | 'Driving License' | 'National ID';
  docUrl: string;
  selfieUrl: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  cardStatus: 'not_requested' | 'virtual_created' | 'physical_shipped';
}

const INITIAL_REQUESTS: KYCRequest[] = [
  {
    id: 'USR-8921',
    name: 'Mushfiq Taowhid',
    email: 'mushfiq@gmail.com',
    docType: 'Passport',
    docUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',
    selfieUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    submittedAt: '2026-07-24 04:15',
    status: 'pending',
    cardStatus: 'not_requested'
  },
  {
    id: 'USR-4012',
    name: 'Sarah Connor',
    email: 'sarah.c@gmail.com',
    docType: 'National ID',
    docUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',
    selfieUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    submittedAt: '2026-07-24 03:30',
    status: 'approved',
    cardStatus: 'physical_shipped'
  }
];

export default function AdminDashboard() {
  const [requests, setRequests] = useState<KYCRequest[]>(INITIAL_REQUESTS);
  const [selectedKyc, setSelectedKyc] = useState<KYCRequest | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setSelectedKyc(null);
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    setSelectedKyc(null);
  };

  const filteredRequests = requests.filter(r => filter === 'all' || r.status === filter);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#222B3E] p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#70E000] text-black font-bold text-xl rounded-xl flex items-center justify-center">
              Z
            </div>
            <span className="text-xl font-bold tracking-wide">ZPay Admin</span>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#141A29] text-[#70E000] rounded-xl font-medium text-sm">
              <ShieldCheck size={18} /> KYC Management
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-[#141A29] rounded-xl font-medium text-sm transition">
              <Users size={18} /> User Accounts
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-[#141A29] rounded-xl font-medium text-sm transition">
              <CreditCard size={18} /> Visa Issuance
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-[#141A29] rounded-xl font-medium text-sm transition">
              <Truck size={18} /> DHL Shipments
            </button>
          </nav>
        </div>

        <div className="text-xs text-gray-500 border-t border-[#222B3E] pt-4">
          ZPay Backend Control v1.0
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">KYC Verification Portal</h1>
            <p className="text-sm text-gray-400">Review user identity documents and approve card eligibility.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-[#141A29] rounded-lg border border-[#222B3E] text-gray-400 hover:text-white">
              <Bell size={18} />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#70E000] text-black font-bold flex items-center justify-center text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#141A29] border border-[#222B3E] p-5 rounded-2xl">
            <span className="text-sm text-gray-400">Pending KYC</span>
            <p className="text-2xl font-bold mt-1 text-[#70E000]">
              {requests.filter(r => r.status === 'pending').length}
            </p>
          </div>
          <div className="bg-[#141A29] border border-[#222B3E] p-5 rounded-2xl">
            <span className="text-sm text-gray-400">Approved Today</span>
            <p className="text-2xl font-bold mt-1 text-white">
              {requests.filter(r => r.status === 'approved').length}
            </p>
          </div>
          <div className="bg-[#141A29] border border-[#222B3E] p-5 rounded-2xl">
            <span className="text-sm text-gray-400">Active Visa Cards</span>
            <p className="text-2xl font-bold mt-1 text-white">1,240</p>
          </div>
        </div>

        {/* Table & Controls */}
        <div className="bg-[#141A29] border border-[#222B3E] rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-[#222B3E] flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold ${filter === 'pending' ? 'bg-[#70E000] text-black' : 'bg-[#0A0E1A] text-gray-400'}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold ${filter === 'approved' ? 'bg-[#70E000] text-black' : 'bg-[#0A0E1A] text-gray-400'}`}
              >
                Approved
              </button>
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold ${filter === 'all' ? 'bg-[#70E000] text-black' : 'bg-[#0A0E1A] text-gray-400'}`}
              >
                All Requests
              </button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search user or ID..." 
                className="w-full bg-[#0A0E1A] border border-[#222B3E] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#70E000]"
              />
            </div>
          </div>

          {/* User Requests Table */}
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#0A0E1A] text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Document</th>
                <th className="p-4">Submitted At</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222B3E]">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-[#1A2234]">
                  <td className="p-4">
                    <div className="font-semibold text-white">{req.name}</div>
                    <div className="text-gray-500">{req.email}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-300">{req.docType}</td>
                  <td className="p-4 text-gray-400">{req.submittedAt}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      req.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                      req.status === 'approved' ? 'bg-green-500/10 text-[#70E000]' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedKyc(req)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#222B3E] text-white hover:bg-[#70E000] hover:text-black rounded-lg font-medium transition"
                    >
                      <Eye size={14} /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Review Document Modal */}
      {selectedKyc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#141A29] border border-[#222B3E] rounded-2xl w-full max-w-2xl p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-[#222B3E] pb-4">
              <div>
                <h3 className="text-lg font-bold">Review Verification: {selectedKyc.name}</h3>
                <p className="text-xs text-gray-400">Doc ID: {selectedKyc.id} • {selectedKyc.docType}</p>
              </div>
              <button 
                onClick={() => setSelectedKyc(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Document Side-by-Side View */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 mb-2 block">Document Front</label>
                <img src={selectedKyc.docUrl} alt="Doc" className="w-full h-40 object-cover rounded-xl border border-[#222B3E]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 mb-2 block">Live Facial Liveness Selfie</label>
                <img src={selectedKyc.selfieUrl} alt="Selfie" className="w-full h-40 object-cover rounded-xl border border-[#222B3E]" />
              </div>
            </div>

            {/* Approval Controls */}
            <div className="flex justify-end gap-3 border-t border-[#222B3E] pt-4">
              <button 
                onClick={() => handleReject(selectedKyc.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl text-xs font-bold transition"
              >
                <XCircle size={16} /> Reject Request
              </button>
              <button 
                onClick={() => handleApprove(selectedKyc.id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#70E000] text-black hover:bg-[#60c000] rounded-xl text-xs font-bold transition"
              >
                <CheckCircle2 size={16} /> Approve & Grant Visa Card Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
