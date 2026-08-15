import { createContext, useContext } from "react";

const SidebarContext = createContext(null);

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export { useSidebar, SidebarContext };