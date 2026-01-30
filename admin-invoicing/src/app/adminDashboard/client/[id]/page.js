"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ClientContext } from "@/app/context/ClientContext";
import { ArrowLeft, Mail, Phone, Building } from "lucide-react";

export default function ViewClientPage() {
  const { clients } = useContext(ClientContext);
  const { id } = useParams();
  const router = useRouter();

  const [client, setClient] = useState(null);

  useEffect(() => {
    const found = clients.find((c) => String(c.id) === id);
    setClient(found || null);
  }, [clients, id]);

  if (!client) {
    return <p className="p-6 text-gray-500">Client not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {client.firstName} {client.lastName}
          </h1>
          <p className="text-gray-500">{client.company}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4" />
            {client.email}
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4" />
            {client.phone}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 uppercase">
            Contact Information
          </h2>

          {client.address && (
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-gray-900">{client.address}</p>
            </div>
          )}
        </div>

        {/* Work Info */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800 uppercase">
            Work Information
          </h2>

          {client.occupation && (
            <div>
              <p className="text-xs text-gray-500">Occupation</p>
              <p className="text-gray-900">{client.occupation}</p>
            </div>
          )}

          {client.membershipStatus && (
            <div>
              <p className="text-xs text-gray-500">Membership Status</p>
              <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {client.membershipStatus}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {client.notes && (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-sm font-semibold text-gray-800 uppercase mb-2">
            Notes
          </h2>
          <p className="text-gray-900 whitespace-pre-line">
            {client.notes}
          </p>
        </div>
      )}
    </div>
  );
}
