
"use client";

import React from "react";

const DashboardStats = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.id || stat.label || index}
          className="rounded-lg border border-[#333333] bg-[#1c1c1c] p-3 transition-colors hover:border-[#484848]"
        >
          <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-md bg-[#303030] text-gray-200">
            {stat.icon}
          </div>

          <p className="text-[10px] text-gray-400">
            {stat.label}
          </p>

          <h3 className="mt-1 text-sm font-medium text-white">
            {stat.value ?? 0}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;