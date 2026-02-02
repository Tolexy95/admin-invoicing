"use client";

import { Formik, Form } from "formik";
import InputText from "@/app/components/Input/InputText";
import { passwordResetValidation } from "../utils/validation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Forgot Password
        </h1>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={passwordResetValidation}
          onSubmit={(values) => {

            // Since there is no API yet, I am simulating a successful password reset request
            toast.success(`Password reset link sent to ${values.email}`);

            // Redirecting back to login after showing success message
            setTimeout(() => {
              router.push("/login");
            }, 1500);
          }}

        >
          <Form className="space-y-4">
            <InputText
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md"
            >
              Send Reset Link
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
