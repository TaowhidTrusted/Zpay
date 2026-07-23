"use client";

import React, { useState } from "react";

interface KYCRequest {
  id: string;
  user: string;
  email: string;
  documentType: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
  docUrl: string;
  facialUrl: string;
}

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "All">("Pending");
  const [selectedUser, setSelectedUser] = useState<KYCRequest | null>(null);

  const [requests, setRequests] = useState<KYCRequest[]>([
    {
      id: "1",
      user: "Mushfiq Taowhid",
      email: "mushfiq@gmail.com",
      documentType: "Passport",
      submittedAt: "2026-07-04 04:15",
      status: "Pending",
      docUrl: "https://via.placeholder.com/400x250?text=Passport+Document",
      facialUrl: "https://via.placeholder.com/300x300?text=Facial+Selfie",
    },
  ]);

  const handleAction = (id: string, newStatus: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
    setSelectedUser(null);
  };

  const filteredRequests = requests.filter((req) => {
    if (activeTab === "Pending") return req.status === "Pending";
    if (activeTab === "Approved") return req.status === "Approved";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 sm:p-8 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Portal</h1>
          <p className="text-gray-400 text-sm">
            Review user identity documents and approve card eligibility.
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-lime-400 text-black font-bold flex items-center justify-center">
          AD
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#161b22] p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Pending KYC</p>
          <p className="text-3xl font-bold text-lime-400">
            {requests.filter((r) => r.status === "Pending").length}
          </p>
        </div>
        <div className="bg-[#161b22] p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Approved Today</p>
          <p className="text-3xl font-bold text-white">
            {requests.filter((r) => r.status === "Approved").length}
          </p>
        </div>
        <div className="bg-[#161b22] p-4 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Active Visa Cards</p>
          <p className="text-3xl font-bold text-white">1,240</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {(["Pending", "Approved", "All"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? "bg-lime-400 text-black"
                : "bg-[#161b22] text-gray-400 hover:text-white"
            }`}
          >
            {tab} {tab === "All" ? "Requests" : ""}
          </button>
        ))}
      </div>

      {/* Scrollable Table Container (Fixes Mobile Slider Cutoff) */}
      <div className="bg-[#161b22] rounded-xl border border-gray-800 overflow-x-auto">
        <table className="w-full text-left min-w-[650px]">
          <thead className="border-b border-gray-800 text-gray-400 text-xs uppercase">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Document</th>
              <th className="p-4">Submitted At</th>
              <th className="p-4">Actions / Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {filteredRequests.map((req) => (
              <tr key={req.id}>
                <td className="p-4">
                  <div className="font-semibold">{req.user}</div>
                  <div className="text-xs text-gray-400">{req.email}</div>
                </td>
                <td className="p-4">{req.documentType}</td>
                <td className="p-4 text-gray-400">{req.submittedAt}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedUser(req)}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs rounded-lg text-white"
                    >
                      View Documents
                    </button>
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAction(req.id, "Approved")}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-xs rounded-lg text-white font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(req.id, "Rejected")}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-xs rounded-lg text-white font-semibold"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Document Inspection Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b22] border border-gray-800 p-6 rounded-2xl max-w-lg w-full space-y-4">
            <h2 className="text-xl font-bold">Document Verification</h2>
            <p className="text-sm text-gray-400">
              {selectedUser.user} ({selectedUser.email})
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-2">Submitted ID</p>
                <img
                  src={selectedUser.docUrl}
                  alt="Document"
                  className="w-full h-32 object-cover rounded-lg border border-gray-700"
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Facial Verification</p>
                <img
                  src={selectedUser.facialUrl}
                  alt="Facial Verification"
                  className="w-full h-32 object-cover rounded-lg border border-gray-700"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm rounded-lg"
              >
                Close
              </button>
              {selectedUser.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleAction(selectedUser.id, "Approved")}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-sm rounded-lg font-semibold"
                  >
                    Approve KYC
                  </button>
                  <button
                    onClick={() => handleAction(selectedUser.id, "Rejected")}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-sm rounded-lg font-semibold"
                  >
                    Reject KYC
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
