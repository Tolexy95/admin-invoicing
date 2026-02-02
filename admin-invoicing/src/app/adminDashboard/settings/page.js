"use client";

import { Formik, Form } from "formik";
import InputText from "@/app/components/Input/InputText";
import toast from "react-hot-toast";

export default function SettingsPage() {
  // I am using localStorage for now because signup is not implemented yet
  // Once signup is ready, this will come from the auth context / API
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")) || null
      : null;

  //These fields should not be editable because they come from signup
  // Only phone and company can be updated for now
  const formikAttributes = {
    enableReinitialize: true, // This allows Formik to pick up values when user becomes available
    initialValues: {
      firstName: user?.firstName || "Oluwatoyin",
      lastName: user?.lastName || "Olubayo",
      company: user?.company || "Heirs Technologies",
      email: user?.email || "toyin95.olubayo@gmail.com",
      phone: user?.phone || "08124568912",
    },
    onSubmit: (values) => {
      console.log("Profile settings submitted:", values);

      // I am saving to localStorage for now because there is no backend yet
      localStorage.setItem("user", JSON.stringify(values));

      toast.success("Profile updated successfully");
    },
  };
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-medium">Profile Information</h2>

        <Formik {...formikAttributes}>
          {() => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputText
                name="firstName"
                label="First Name"
                readonly={true}
              />

              <InputText
                name="lastName"
                label="Last Name"
                readonly={true}
              />

              <InputText
                name="email"
                label="Email Address"
                type="email"
                readonly={true}
              />

              <InputText
                name="phone"
                label="Phone"
                type="tel"
              />

              <InputText
                name="company"
                label="Company"
                maxLength={100}
              />

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-medium">Security</h2>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            console.log("Security settings submitted:", values);
            toast.success("Password updated successfully");
          }}
        >
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputText
              name="currentPassword"
              label="Current Password"
              type="password"
              placeholder="Enter current password"
            />

            <InputText
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter new password"
            />

            <InputText
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
            />

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Update Password
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-medium">Preferences</h2>

        <Formik
          initialValues={{
            notifications: true,
            darkMode: false,
          }}
          onSubmit={(values) => {
            console.log("Preferences submitted:", values);
            toast.success("Preferences saved");
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive updates and important alerts via email
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={values.notifications}
                  onChange={(e) =>
                    setFieldValue("notifications", e.target.checked)
                  }
                  className="h-5 w-5"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-500">
                    Toggle between light and dark theme
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={values.darkMode}
                  onChange={(e) =>
                    setFieldValue("darkMode", e.target.checked)
                  }
                  className="h-5 w-5"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-md"
                >
                  Save Preferences
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
