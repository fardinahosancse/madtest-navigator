import { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
      <main 
        className={`
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'pl-16' : 'pl-64'} 
          p-8
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;