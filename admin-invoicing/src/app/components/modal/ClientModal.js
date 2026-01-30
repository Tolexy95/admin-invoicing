"use client";

import { useContext, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { ClientContext } from "@/app/context/ClientContext";
import InputText from "../Input/InputText";
import { clientValidationSchema } from "@/app/utils/validation";

export default function ClientModal() {
  const { selectedClient, saveClient, setShowModal } =
    useContext(ClientContext);

  const modalRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setShowModal]);

  const initialValues = {
    firstName: selectedClient?.firstName || "",
    lastName: selectedClient?.lastName || "",
    company: selectedClient?.company || "",
    email: selectedClient?.email || "",
    phone: selectedClient?.phone || "",
  };

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
          }}
        >
          <Form className="flex max-h-[60vh] flex-col overflow-hidden">
            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <InputText name="firstName" label="First Name" maxLength={20} placeholder={"I.e Bukola"} />
              <InputText name="lastName" label="Last Name" maxLength={20} placeholder="I.e Adebisi" />
              <InputText name="company" label="Company" maxLength={100} placeholder="I.e Heirs Holding"/>
              <InputText name="email" label="Email" type="email" placeholder="I.e bukola.adebisi@heirsholding.com" />
              <InputText
                name="phone"
                label="Phone"
                placeholder="I.e 08012345678"
                type="tel"/>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-3 border-t">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Sumbit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
