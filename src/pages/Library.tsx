import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileText, Globe, Clipboard, Shield } from "lucide-react";

const libraryTabs = [
  { id: "iso", label: "ISO", icon: Shield, description: "International Organization for Standardization documents" },
  { id: "uae", label: "UAE", icon: Globe, description: "United Arab Emirates regulations and guidelines" },
  { id: "sops", label: "SOPs", icon: Clipboard, description: "Standard Operating Procedures" },
  { id: "policy", label: "Policy", icon: FileText, description: "Company policies and governance documents" },
];

const Library = () => {
  const [activeTab, setActiveTab] = useState("iso");

  const renderTabContent = () => {
    switch (activeTab) {
      case "iso":
        return (
          <div className="h-full">
            <iframe
              src="/slide-to-code-craft/ISO.pdf"
              width="100%"
              height="600px"
              title="ISO Documents"
              className="border rounded-lg"
            />
          </div>
        );
      case "uae":
        return (
          <div className="p-8 text-center">
            <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">UAE Regulations</h3>
            <p className="text-muted-foreground">UAE regulatory documents will be available here.</p>
          </div>
        );
      case "sops":
        return (
          <div className="p-8 text-center">
            <Clipboard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Standard Operating Procedures</h3>
            <p className="text-muted-foreground">SOPs and procedural documents will be available here.</p>
          </div>
        );
      case "policy":
        return (
          <div className="p-8 text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Company Policies</h3>
            <p className="text-muted-foreground">Policy documents and governance materials will be available here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex gap-6 h-[calc(100vh-140px)]">
        {/* Side Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-card border rounded-lg p-4 h-full">
            <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wide">
              Categories
            </h3>
            <nav className="space-y-2">
              {libraryTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full justify-start gap-3 h-auto p-3 text-left",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <tab.icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{tab.label}</div>
                    <div className={cn(
                      "text-xs mt-1",
                      activeTab === tab.id
                        ? "text-primary-foreground opacity-80"
                        : "text-muted-foreground"
                    )}>
                      {tab.description}
                    </div>
                  </div>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-card border rounded-lg overflow-hidden">
          {renderTabContent()}
        </div>
      </div>
    </Layout>
  );
};

export default Library;
