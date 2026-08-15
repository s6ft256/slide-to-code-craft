import HSEHeader from "./HSEHeader";
import HSESidebar from "./HSESidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <HSEHeader />
      <HSESidebar />
      <main className="flex-1 p-6">
        <div className="max-w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;