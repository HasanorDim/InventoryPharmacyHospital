import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { Switch } from "@headlessui/react";

const Setting = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState("light");

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaCog className="mr-2 text-blue-500" /> Settings
        </h3>
      </div>

      {/* Profile Info */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Display Name
        </label>
        <input
          type="text"
          defaultValue="John Doe"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notifications */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-700">Enable Notifications</span>
        <Switch
          checked={notificationsEnabled}
          onChange={setNotificationsEnabled}
          className={`${
            notificationsEnabled ? "bg-blue-600" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        >
          <span
            className={`${
              notificationsEnabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>

      {/* Theme */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Theme
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Setting;
