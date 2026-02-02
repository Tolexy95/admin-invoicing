"use client";

import { Formik, Form } from "formik";
import InputText from "@/app/components/Input/InputText";
import { loginValidation } from "@/app/utils/validation";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Submit from "../components/Buttons/Submit";
import toast from "react-hot-toast";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth(); // get login function from context
  const router = useRouter();
  const [remember, setRemember] = useState(false); // state for "remember me" checkbox
  const [loading, setLoading] = useState(false); // show loading while logging in

  // Function that runs when form is submitted
  const handleSubmit = async (values) => {
    setLoading(true); // start loading
    try {
      await login({ ...values, remember }); // pass email, password, and remember
      toast.success("Login successful!"); // show success message
      router.push("/adminDashboard/dashboard"); // navigate to dashboard
    } catch (err) {
      toast.error(err.message || "Login failed. Please check your credentials."); // show error message
    } finally {
      setLoading(false); // stop loading
    }
  };

  const formikAttributes = {
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation, // use Yup validation schema
    onSubmit: handleSubmit, // handle submit
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-grey-300">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <Formik {...formikAttributes}>
          {(formik) => (
            <Form className="space-y-4">
              {/* Email input */}
              <InputText
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
              />

              {/* Password input */}
              <InputText
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              {/* Remember me and forgot password */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => router.push("/forget-password")}
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <div className="md:w-1/2 m-auto mt-5">
                <Submit
                  formik={formik}
                  textContent={loading ? "Logging in..." : "Login"} // show loading text
                  className={`mt-6 w-full`}
                  disabled={loading} // disable button while logging in
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
