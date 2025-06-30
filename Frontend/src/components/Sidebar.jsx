import React, { useEffect, useState } from "react";
import LinksForAdmin from "./LinksForAdmin";
import LinksForUser from "./LinksForUser";


export default function Sidebar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem("token") || null;
      if (token) {
        setIsLogged(true);
      }
    },[])


  return (
    <div className="w-xs bg-zinc-100 h-dvh pt-40 gap-4 flex flex-col items-start justify-start">
      {isLogged ? < LinksForAdmin/> : < LinksForUser/>}
    </div>
  );
}
