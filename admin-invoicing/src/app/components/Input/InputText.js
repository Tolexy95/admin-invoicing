"use client";

import { Field } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputText({
    label,
    className,
    readonly,
    maxLength,
    placeholder,
    min,
    max,
    readOnly = false,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false)
    function passwordToggle() {
        setShowPassword(!showPassword)
    }

    return (
        <Field name={props.name}>
            {({ field, meta }) => (
                <div className="flex flex-col gap-1">
                    {label && (
                        <label className="text-sm font-medium text-gray-700">
                            {label}
                        </label>
                    )}

                    <div className={`relative w-full rounded-md ${className}`}>
                        <input
                            type={props.type === 'password' && showPassword === true ? 'text' : props.type}
                            className={`w-full px-3 py-2 placeholder:text-xs  border rounded-md focus:outline-none focus:ring-2 focus:ring-primary
                ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}`}
                            readOnly={readonly}
                            placeholder={placeholder}
                            maxLength={maxLength}
                            min={min}
                            max={max}
                            onChange={(e) => {
                                field.onChange(e);
                                if (props.onChange) {
                                    props.onChange(e);
                                }
                            }}


                            {...field}

                        />

                        {
                            props.type === 'password' &&
                            meta.value !== '' && (
                                <label className="swap swap-rotate absolute p-2 right-2 top-1/2 -translate-y-1/2">
                                    {/* this hidden checkbox controls the state */}
                                    <input type="checkbox" onChange={passwordToggle} disabled={meta.value === ''} />

                                    {/* password hidden */}
                                    <EyeOff className="swap-on text-xl" />

                                    {/* password showing */}
                                    <Eye className="swap-off text-xl" />
                                </label>
                            )
                        }
                    </div>

                    {meta.touched && meta.error && (
                        <span className="text-xs text-red-500">{meta.error}</span>
                    )}
                </div>
            )}
        </Field>
    );
}




