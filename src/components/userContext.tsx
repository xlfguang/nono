import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const localAddress = localStorage.getItem("address");

  // 获取钱包链接状态
  const [address, setAddress] = useState(localAddress || "");
  return (
    <UserContext.Provider
      value={{
        address,
        setAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
