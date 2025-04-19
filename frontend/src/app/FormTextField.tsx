"use client";

import React from "react";

interface FormTextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "number";
    className?: string;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
    className = "",
}) => {
    return (
        <div className="form-group">
            <label className="block text-gray-200 font-medium mb-2">
                {label}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full mt-1 px-4 py-2 bg-gray-700 border border-gray-600 focus:border-blue-500 rounded-lg focus:outline-none focus:border-blue-500 text-gray-200 ${className}`}
                />
            </label>
        </div>
    );
};
