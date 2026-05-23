import React from 'react';

export default function TextArea({ label, placeholder, value, onChange, name, rows = 5 }) {
    return (
        <div className="flex flex-col gap-2 w-full mb-4">
            {label && <label className="text-right font-bold text-gray-700">{label}</label>}
            <textarea
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                className="border border-gray-300 rounded-md p-3 text-right focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm resize-y"
                dir="rtl"
            />
        </div>
    );
}