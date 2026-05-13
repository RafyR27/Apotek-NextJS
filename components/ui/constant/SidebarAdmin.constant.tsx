import {
  MdDashboard,
  MdReceiptLong,
  MdPayments,
  MdPerson,
} from "react-icons/md";
import { FaPills } from "react-icons/fa";


const SIDEBAR_ADMIN = [
  {
    title: "Main Menu",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: MdDashboard,
      },
      {
        title: "Data Obat",
        url: "/admin/medicines",
        icon: FaPills,
      },
      {
        title: "Laporan",
        url: "/admin/reports",
        icon: MdReceiptLong,
      },
      {
        title: "Pendapatan",
        url: "/admin/income",
        icon: MdPayments,
      },
      {
        title: "Manajemen User",
        url: "/admin/users",
        icon: MdPerson,
      },
    ],
  },
];

export default SIDEBAR_ADMIN