import { Children } from "react";


export default function SideBar({chlidren}){
  return(
    <div className="
      fixed top-0 left-0
      h-screen 
      w-[340px]
      border-l border-slate-200
      bg-slate-50
      overflow-hidden
      bg-blue-100
      z-1
    ">
      {Children}
    </div>
  );
} 