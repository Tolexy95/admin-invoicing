"use client";

import { Formik, Form } from "formik";
import InputText from "@/app/components/Input/InputText";
import { loginValidation } from "@/app/utils/validation";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Submit from "../components/Buttons/Submit";
import toast from "react-hot-toast";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (values) => {
        try {
            login(values);
            toast.success("Login successful!");
            // Optionally, redirect here if login actually succeeds
            // router.push("/adminDashboard/dashboard");
        } catch (err) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const formikAttributes = {
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidation,
        onSubmit: handleSubmit,
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary-grey-300">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-6">
                <h1 className="text-2xl font-semibold text-center">Login</h1>

                <Formik {...formikAttributes}>
                    {(formik) => (
                        <Form className="space-y-4">
                            <InputText
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                            />

                            <InputText
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                            />

                            <div className="flex justify-end text-sm">
                                <button
                                    type="button"
                                    onClick={() => router.push("/forget-password")}
                                    className="text-primary hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="md:w-1/2 m-auto mt-5">
                                <Submit formik={formik} textContent={'Login'} className={`mt-6 w-full`} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
