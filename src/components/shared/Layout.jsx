import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-row bg-slate-100 overflow-hidden h-screen bg-scroll">
      <Sidebar  className="h-full"/>
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 flex-1">{<Outlet />}</div>
      </div>
    </div>
  );
}
