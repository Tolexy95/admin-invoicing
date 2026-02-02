"use client";

import { useContext, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { ClientContext } from "@/app/context/ClientContext";
import InputText from "../Input/InputText";
import { clientValidationSchema } from "@/app/utils/validation";

export default function ClientModal() {
  const {
    selectedClient,
    setSelectedClient, 
    saveClient,
    showModal,
    setShowModal,
    viewClient,
    setViewClient,
  } = useContext(ClientContext);

  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
        setViewClient(null);      // reset view client
        setSelectedClient(null);  // reset edit client
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShowModal, setViewClient, setSelectedClient]);

  // Don't render if neither modal is open
  if (!showModal && !viewClient && !selectedClient) return null;

  // Decide mode: view if viewClient exists, otherwise normal form
  const isViewMode = !!viewClient;
  const clientData = isViewMode ? viewClient : selectedClient;

  const initialValues = {
    firstName: clientData?.firstName || "",
    lastName: clientData?.lastName || "",
    company: clientData?.company || "",
    email: clientData?.email || "",
    phone: clientData?.phone || "",
    status: clientData?.status || "Active",
    createdAt: clientData?.createdAt || new Date().toISOString(),
  };

  // ---------------- View-Only Card ----------------
  if (isViewMode && clientData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div
          ref={modalRef}
          className="w-full max-w-sm rounded-xl bg-white shadow-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Client Information
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <span className="font-medium">Name: </span>
              {initialValues.firstName} {initialValues.lastName}
            </p>
            <p>
              <span className="font-medium">Company: </span>
              {initialValues.company}
            </p>
            <p>
              <span className="font-medium">Email: </span>
              {initialValues.email}
            </p>
            <p>
              <span className="font-medium">Phone: </span>
              {initialValues.phone}
            </p>
            <p>
              <span className="font-medium">Status: </span>
              <span
                className={`px-2 py-1 rounded-full text-white text-xs ${
                  initialValues.status === "Active"
                    ? "bg-green-500"
                    : "bg-gray-400"
                }`}
              >
                {initialValues.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Date Onboarded: </span>
              {new Date(initialValues.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setViewClient(null);     // reset view client
                setSelectedClient(null); // reset edit client
                setShowModal(false);
              }}
              className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Create/Edit Form ----------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="w-full max-w-sm rounded-xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="border-b px-6 py-3">
          <h2 className="text-lg font-semibold text-gray-900">
            {selectedClient ? "Edit Client" : "Create Client"}
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={clientValidationSchema}
          enableReinitialize
          onSubmit={(values) => {
            saveClient(values);
            setShowModal(false);
            setSelectedClient(null); // reset after submit
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex max-h-[60vh] flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-2">
                <InputText
                  name="firstName"
                  label="First Name"
                  maxLength={20}
                  placeholder="I.e Bukola"
                />
                <InputText
                  name="lastName"
                  label="Last Name"
                  maxLength={20}
                  placeholder="I.e Adebisi"
                />
                <InputText
                  name="company"
                  label="Company"
                  maxLength={100}
                  placeholder="I.e Heirs Holding"
                />
                <InputText
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="I.e bukola.adebisi@heirsholding.com"
                />
                <InputText
                  name="phone"
                  label="Phone"
                  placeholder="I.e 08012345678"
                  type="tel"
                />

                {/* Status editable only on edit */}
                {selectedClient && (
                  <div className="mt-3">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={values.status}
                      onChange={(e) => setFieldValue("status", e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedClient(null); // reset edit client
                  }}
                  className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
