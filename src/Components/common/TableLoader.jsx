import React from "react";

const TableLoader = () => {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 animate-pulse">
              <div className="h-4 bg-gray-300 "></div>
            </td>
          </tr>
        </tbody>
      </table>
        
    </div>
  );
};

export default TableLoader;
