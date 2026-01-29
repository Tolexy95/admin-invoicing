"use client";

import { createContext, useState, useEffect } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Fetch clients from server on mount
  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch("/api/clients");
        const data = await res.json();
        setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    }
    fetchClients();
  }, []);

  const openCreateModal = () => {
    setSelectedClient(null);
    setShowModal(true);
  };

  const openEditModal = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  // Save client (create or edit)
  const saveClient = async (clientData) => {
    try {
      if (selectedClient) {
        // Edit
        const res = await fetch("/api/clients", {
          method: "PUT",
          body: JSON.stringify({ ...clientData, id: selectedClient.id }),
          headers: { "Content-Type": "application/json" },
        });
        const updatedClient = await res.json();
        setClients((prev) =>
          prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
        );
      } else {
        // Create
        const res = await fetch("/api/clients", {
          method: "POST",
          body: JSON.stringify(clientData),
          headers: { "Content-Type": "application/json" },
        });
        const newClient = await res.json();
        setClients((prev) => [...prev, newClient]);
      }
    } catch (err) {
      console.error("Failed to save client:", err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        showModal,
        selectedClient,
        openCreateModal,
        openEditModal,
        saveClient,
        setShowModal,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
