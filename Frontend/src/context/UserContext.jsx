import React, { createContext, useState } from "react";

export const UserDataContext = createContext(null);

export default function UserContext({ children }) {
  const [ user, setUser ] = useState({
    empNo:'',
    password:''
})
  return (
    <div>
      <UserDataContext.Provider value={{ user, setUser }}>{children}</UserDataContext.Provider>
    </div>
  );
}
