"use client";

import { useContext } from "react";
import { ClientContext } from "@/app/context/ClientContext";
import ClientModal from "@/app/components/modal/ClientModal";
import { Pencil, Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";


export default function ClientsPage() {
  const { clients, openCreateModal, openEditModal, showModal } =
    useContext(ClientContext);

  const router = useRouter();

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Clients</h1>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
        >
          <Plus className="w-4 h-4" />
          Create Client
        </button>
      </div>

      {/* Table Wrapper */}
      <div className="max-h-[530px] max-w-6xl overflow-scroll rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm  text-secondary-grey-700">
          <thead className="bg-gray-50 text-secondary-grey-900 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 text-left">First Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 whitespace-normal break-words max-w-[150px]">
                  {client.firstName}
                </td>
                <td className="px-4 py-3 whitespace-normal break-words max-w-[150px]">
                  {client.lastName}
                </td>
                <td className="px-4 py-3 whitespace-normal break-words max-w-[200px]">
                  {client.company}
                </td>
                <td className="px-4 py-3 whitespace-normal break-words max-w-[240px]">
                  {client.email}
                </td>
                <td className="px-4 py-3 whitespace-normal break-words max-w-[160px]">
                  {client.phone}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => openEditModal(client)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => router.push(`/adminDashboard/client/${client.id}`)}
                      className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && <ClientModal />}
    </div>
  );
}
