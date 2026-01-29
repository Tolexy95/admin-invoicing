"use client";

import { useContext } from "react";
import { ClientContext } from "@/app/context/ClientContext";
import ClientModal from "@/app/components/modal/ClientModal";
import { Pencil, Eye, Plus } from "lucide-react";


export default function ClientsPage() {
  const { clients, openCreateModal, openEditModal, showModal } = useContext(ClientContext);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
        >
          <Plus className="w-4 h-4" /> Create Client
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">First Name</th>
            <th className="px-4 py-2 border">Last Name</th>
            <th className="px-4 py-2 border">Company</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{client.firstName}</td>
              <td className="px-4 py-2 border">{client.lastName}</td>
              <td className="px-4 py-2 border">{client.company}</td>
              <td className="px-4 py-2 border">{client.email}</td>
              <td className="px-4 py-2 border">{client.phone}</td>
              <td className="px-4 py-2 border flex gap-2">
                <button
                  onClick={() => openEditModal(client)}
                  className="flex items-center gap-1 text-blue-500 hover:underline"
                >
                  <Pencil className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center gap-1 text-green-500 hover:underline">
                  <Eye className="w-4 h-4" /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && <ClientModal />}
    </div>
  );
}
