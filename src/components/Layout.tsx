import HSEHeader from "./HSEHeader";
import HSESidebar from "./HSESidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <HSEHeader />
      <div className="flex">
        <HSESidebar />
        <main className="flex-1 p-4 md:p-6 lg:ml-0">
          <div className="max-w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;