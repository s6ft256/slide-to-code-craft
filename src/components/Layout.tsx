import HSEHeader from "./HSEHeader";
import HSESidebar from "./HSESidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HSEHeader />
      <div className="flex flex-1">
        <HSESidebar />
        <main className="flex-1 p-6 pt-5 ml-64">
          <div className="max-w-full mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;