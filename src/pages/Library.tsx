import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Library = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("iso");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  return (
    <Layout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-screen">
        <TabsList className="mb-4 gap-2">
          <TabsTrigger value="iso">ISO</TabsTrigger>
          <TabsTrigger value="uae">UAE</TabsTrigger>
          <TabsTrigger value="sops">SOPs</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="iso" className="h-full">
          <div className="h-full">
            <iframe
              src="/slide-to-code-craft/ISO.pdf"
              width="100%"
              height="100%"
              title="ISO Documents"
              className="border-0"
            />
          </div>
        </TabsContent>

        <TabsContent value="uae" className="h-full">
          <div className="p-6 h-full flex items-center justify-center bg-card">
            <p className="text-muted-foreground">UAE documents will be available here.</p>
          </div>
        </TabsContent>

        <TabsContent value="sops" className="h-full">
          <div className="p-6 h-full flex items-center justify-center bg-card">
            <p className="text-muted-foreground">SOPs will be available here.</p>
          </div>
        </TabsContent>

        <TabsContent value="policy" className="h-full">
          <div className="p-6 h-full flex items-center justify-center bg-card">
            <p className="text-muted-foreground">Policies will be available here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Library;
