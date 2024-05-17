import React from "react";

// Admin Imports
import MainDashboard from "./views/admin/default";
import Claims from "./views/admin/claims";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/tabels";
// import RTLDefault from "views/rtl/default";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: MdHome,
    component: MainDashboard,
  },
  {
    name: "Claims",
    layout: "/admin",
    path: "nft-marketplace",
    icon: MdOutlineShoppingCart,
    component: Claims,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: MdBarChart,
    path: "data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: MdPerson,
    component: Profile,
  },
];
export default routes;
