"use client";

import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [viewClient, setViewClient] = useState(null); 

  // Load clients from API on mount
  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        setClients(data); // <-- actually store fetched clients
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    }
    fetchClients();
  }, []);

  // Open modal for creating new client
  const openCreateModal = () => {
    setSelectedClient(null);
    setShowModal(true);
  };

  // Open modal for editing existing client
  const openEditModal = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  // Save client (create or edit)
  const saveClient = async (clientData) => {
    try {
      if (selectedClient) {
        // Editing client
        const res = await fetch("/api/clients", {
          method: "PUT",
          body: JSON.stringify({ ...clientData, id: selectedClient.id }),
          headers: { "Content-Type": "application/json" },
        });
        const updatedClient = await res.json();

        setClients((prev) =>
          prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
        );
        toast.success("Client updated successfully"); // toast on edit success
      } else {
        // Creating new client
        const res = await fetch("/api/clients", {
          method: "POST",
          body: JSON.stringify({ ...clientData }),
          headers: { "Content-Type": "application/json" },
        });
        const newClient = await res.json();

        // Prepend so newest shows first
        setClients((prev) => [newClient, ...prev]);
        toast.success("Client created successfully"); // toast on create success
      }
    } catch (err) {
      console.error("Failed to save client:", err);
       toast.error("Failed to save client"); // toast on error
    } finally {
      setShowModal(false);
    }
  };

  // Delete client
  const deleteClient = async (id) => {
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete client");

      // Remove client locally so UI updates immediately
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete client:", err);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        showModal,
        selectedClient,
        viewClient,        
        setViewClient,  
        setSelectedClient,    
        openCreateModal,
        setClients,
        openEditModal,
        saveClient,
        deleteClient,
        setShowModal,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
