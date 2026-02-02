"use client";

import { useContext, useState, useMemo } from "react";
import { ClientContext } from "@/app/context/ClientContext";
import Confirm from "@/app/components/modal/Confirm";
import ClientModal from "@/app/components/modal/ClientModal";
import toast from "react-hot-toast"; // toast

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function ClientsTable() {
  const {
    clients,
    openEditModal,
    openCreateModal,
    setSelectedClient,
    setViewClient,
    setShowModal,
  } = useContext(ClientContext);

  const [deleteClientId, setDeleteClientId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // Active / Inactive
  const [dateSort, setDateSort] = useState(""); // asc / desc

  // Delete client handler
  const { deleteClient } = useContext(ClientContext);
  const handleDelete = async () => {
    try {
      await deleteClient(deleteClientId);

      toast.success("Client deleted successfully"); // toast on success

      setDeleteClientId(null);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error("Failed to delete client:", err);
      toast.error("Failed to delete client"); // toast on error
    }
  };

  // Columns definition
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      },
      { header: "Company Name", accessorKey: "company" },
      { header: "Email", accessorKey: "email" },
      { header: "Phone Number", accessorKey: "phone" },
      {
        header: "Status",
        id: "status",
        accessorKey: "status",
        filterFn: (row, columnId, filterValue) => {
          return row.getValue(columnId) === filterValue;
        },
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-white text-xs ${
              info.getValue() === "Active" ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {info.getValue()}
          </span>
        ),
      },
      {
        header: "Date Onboarded",
        id: "createdAt",
        accessorFn: (row) => new Date(row.createdAt),
        cell: (info) =>
          info.getValue().toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
      },
      {
        header: "Actions",
        accessorKey: "id",
        cell: (info) => {
          const row = info.row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setViewClient(null);
                  openEditModal(row);

                  toast("Editing client...", { icon: "✏️" }); // toast on edit click
                }}
                className="text-blue-500 hover:underline text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setSelectedClient(null); // clear edit mode
                  setViewClient(row); // set view client
                  setShowModal(true); // ensure modal opens

                  toast("Viewing client", { icon: "👁️" }); // toast on view click
                }}
                className="text-green-500 hover:underline text-sm"
              >
                View
              </button>

              <button
                onClick={() => {
                  setDeleteClientId(row.id);
                  setShowDeleteConfirm(true);
                }}
                className="text-red-500 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    [openEditModal, setViewClient, setSelectedClient, setShowModal]
  );

  // Memoize filters & sorting so table does not freeze
  const columnFilters = useMemo(() => {
    return statusFilter ? [{ id: "status", value: statusFilter }] : [];
  }, [statusFilter]);

  const sorting = useMemo(() => {
    return dateSort ? [{ id: "createdAt", desc: dateSort === "desc" }] : [];
  }, [dateSort]);

  
  const table = useReactTable({
    data: clients,
    columns,

   
    state: {
      globalFilter,
      columnFilters,
      sorting,
    },

    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // Global search
    globalFilterFn: (row, columnId, filterValue) =>
      Object.values(row.original)
        .join(" ")
        .toLowerCase()
        .includes(filterValue.toLowerCase()),

    initialState: {
      pagination: {
        pageSize: 6,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="">
      <h1 className="text-xl font-semibold text-secondary-grey-900 mb-4">
        Clients
      </h1>

      {/* Header: Filter, Search, Add */}
      <div className="flex flex-col lg:flex-row md:justify-between lg:items-center mb-4 gap-2 overflow-scroll lg:overflow-x-auto lg:w-auto">
        <div className="flex flex-col sm:flex-row lg:items-center gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Date Sort */}
          <select
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm"
          >
            <option value="">Sort by Date</option>
            <option value="asc">Oldest → Newest</option>
            <option value="desc">Newest → Oldest</option>
          </select>
        </div>

        {/* Search + Add */}
        <div className="flex gap-2 justify-between flex-wrap">
          <input
            type="text"
            placeholder="Search clients..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border px-3 py-1 rounded-md text-sm"
          />
          <button
            onClick={() => {
              openCreateModal();
            }}
            className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            Add Client
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="lg:overflow-x-auto lg:w-auto border rounded-lg overflow-scroll sm:w-[432px] w-[245px]">
        <table className="divide-y divide-gray-200 w-44 lg:w-auto">
          <thead className="bg-gray-50 w-44">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 w-44">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm text-gray-700">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-7 gap-2 flex-wrap lg:overflow-x-auto lg:w-auto">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <span className="text-sm text-gray-700">
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          {table.getPageCount()}
        </span>
      </div>

      {/* Modals */}
      <ClientModal />
      {showDeleteConfirm && (
        <Confirm
          title="Delete Client"
          message="Are you sure you want to delete this client? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
