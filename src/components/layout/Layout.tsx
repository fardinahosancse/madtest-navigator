import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="transition-all duration-300 pl-16 md:pl-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;