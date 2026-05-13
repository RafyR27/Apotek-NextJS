"use client";

import { FaCashRegister, FaPills } from "react-icons/fa";
import { MdInventory, MdPayments } from "react-icons/md";

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    initials: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    initials: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    initials: "SD",
  },
];

const stats = [
  {
    label: "Total Penjualan Hari ini",
    value: "Rp. 2.000.000",
    change: "+2% dari hari kemarin",
    icon: MdPayments,
  },
  {
    label: "Total Transaksi",
    value: "23 Transaksi",
    change: "+5 transaksi dari bulan lalu",
    icon: FaCashRegister,
  },
  {
    label: "Stok Obat Hampir Habis",
    value: "2 Item",
    icon: MdInventory,
  },
  {
    label: "Pendapan Bulan Ini",
    value: "Rp. 20.000.000",
    change: "+2% dari bulan lalu",
    icon: FaPills,
  },
];

const avatarColors = [
  "bg-slate-700",
  "bg-slate-600",
  "bg-slate-500",
  "bg-slate-400",
  "bg-slate-300",
];

const AdminDashboard = () => {
  return (
    <div className="w-full min-h-screen py-7 bg-background">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <div className="pt-5 font-sans">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </span>
                  <Icon size={16} className="text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400">{stat.change}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* Overview Chart */}
          <div className="xl:col-span-3 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 mb-1">
              Grafik Penjualan
            </h2>
            <div className="h-64 mt-4">
                {/* chart */}
            </div>
          </div>

          {/* Recent Sales */}
          <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              Transaksi Terbaru
            </h2>
            <div className="space-y-4">
              {recentSales.map((sale, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0 ${avatarColors[i]}`}
                  >
                    {sale.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {sale.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {sale.email}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 shrink-0">
                    {sale.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
