import React from 'react';

export default function InputField({
    id,
    label,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label}
                <input
                    type="text"
                    id={id}
                    className="form-input"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                />
            </label>
        </div>
    );
}
