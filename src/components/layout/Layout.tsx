import HSEHeader from "./HSEHeader";
import HSESidebar from "./HSESidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <HSEHeader />
      <HSESidebar />
      <main className="transition-all duration-300 ease-out ml-0 md:ml-0 pt-20 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;