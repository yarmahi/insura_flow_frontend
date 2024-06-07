import AgentDashboard from "./views/agent/default";
import AgentClaims from "./views/agent/claims";
import AgentProfile from "./views/agent/profile";

import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdOutlineCropLandscape,
} from "react-icons/md";

const agentRoutes = [
  {
    name: "Agent Dashboard",
    layout: "/agent",
    path: "default",
    icon: MdHome,
    component: AgentDashboard,
  },
  {
    name: "Agent Claims",
    layout: "/agent",
    path: "claims",
    icon: MdOutlineShoppingCart,
    component: AgentClaims,
  },

  {
    name: "Agent Profile",
    layout: "/agent",
    path: "profile",
    icon: MdOutlineCropLandscape,
    component: AgentProfile,
  },
];
export default agentRoutes;
