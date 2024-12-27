import { Home, FileText, Play, ClipboardList, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: FileText, label: "Test Cases", path: "/test-cases" },
    { icon: Play, label: "Test Runs", path: "/test-runs" },
    { icon: ClipboardList, label: "Test Plans", path: "/test-plans" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-primary fixed left-0 top-0 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center gap-2 p-4">
        <span className={cn(
          "text-2xl font-bold text-white transition-opacity duration-300",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          MadTest
        </span>
      </div>
      
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-primary rounded-full p-1 text-white hover:bg-primary/90"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <nav>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 p-3 mx-2 rounded-lg mb-2 transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span className={cn(
                "transition-opacity duration-300",
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;