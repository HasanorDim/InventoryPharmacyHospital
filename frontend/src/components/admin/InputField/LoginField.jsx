import React, { memo } from "react";
import { Link } from "react-router-dom";

const LoginFieldComponent = ({
  icon: Icon,
  value,
  onChange,
  forgot = false,
  placeholder,
  required,
  label,
  type,
}) => {
  console.log("LoginFieldComponent");
  return (
    <div className="space-y-1">
      {forgot ? (
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-sm font-medium text-gray-700">{label}</label>
          )}
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            Forgot?
          </Link>
        </div>
      ) : (
        label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )
      )}

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm transition"
        />
      </div>
    </div>
  );
};

// Use memo *after* defining the component
const LoginField = memo(LoginFieldComponent);

export default LoginField;
