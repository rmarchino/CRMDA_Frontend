import { FaUserCog, FaUsers } from "react-icons/fa";
import {
  HiOutlineAnnotation,
  HiOutlineCog,
  HiOutlineCube,
  HiOutlineQuestionMarkCircle,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { IoMdBusiness } from "react-icons/io";

export const DASHBOARD_SIDEBAR_LINKS = [
  { 
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: HiOutlineViewGrid
  },
  { 
    key: "clientes",
    label: "Clientes",
    path: "/clientes",
    icon: FaUsers
  },
  {
    key: "servicios",
    label: "Servicios",
    path: "/servicios",
    icon: HiOutlineCube,
  },
  {
    key: "experiencias",
    label: "Experiencias",
    path: "/experiencias",
    icon: IoMdBusiness,
  },
  { 
    key: "usuarios",
    label: "Usuarios",
    path: "/usuarios",
    icon: FaUserCog
  },
  {
    key: "messages",
    label: "Messages",
    path: "/messages",
    icon: HiOutlineAnnotation,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  { 
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: HiOutlineCog
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: HiOutlineQuestionMarkCircle,
  },
];
