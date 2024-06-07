import React from "react";

// Admin Imports
import MainDashboard from "./views/admin/default";
import Claims from "./views/admin/claims";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/Agents";
import Customers from "./views/admin/customer";
import Chat from "./views/admin/Chat";
// import RTLDefault from "views/rtl/default";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdOutlineCropLandscape,
} from "react-icons/md";
import Vehicles from "./views/admin/Vehicles";
import Notfications from "./views/admin/Notfications";

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
    path: "claims",
    icon: MdOutlineShoppingCart,
    component: Claims,
    secondary: true,
  },
  {
    name: "Agents",
    layout: "/admin",
    icon: MdBarChart,
    path: "agents",
    component: DataTables,
  },
  {
    name: "Plans",
    layout: "/admin",
    path: "profile",
    icon: MdOutlineCropLandscape,
    component: Profile,
  },
  {
    name: "Customer",
    layout: "/admin",
    path: "customer",
    icon: MdPerson,
    component: Customers,
  },
  {
    name: "Chat",
    layout: "/admin",
    path: "chat",
    icon: MdPerson,
    component: Chat,
  },
  {
    name: "Vehicles",
    layout: "/admin",
    path: "vehicles",
    icon: MdPerson,
    component: Vehicles,
  },
  {
    name: "Notfications",
    layout: "/admin",
    path: "notfication",
    icon: MdPerson,
    component: Notfications,
  },
];
export default routes;
