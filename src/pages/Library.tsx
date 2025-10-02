import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Library = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Layout>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-foreground">Library</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 h-8 w-8"
          >
            {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <Tabs defaultValue="iso" className="w-full mb-4">
        <TabsList className="mb-4 gap-2">
          <TabsTrigger value="iso">ISO</TabsTrigger>
          <TabsTrigger value="uae">UAE</TabsTrigger>
          <TabsTrigger value="sops">SOPs</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>

          <TabsContent value="iso" className="mt-0">
            <div className="border rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
              <iframe
                src="/slide-to-code-craft/ISO.pdf"
                width="100%"
                height="100%"
                title="ISO Documents"
                className="border-0"
              />
            </div>
          </TabsContent>

        <TabsContent value="uae">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-lg font-semibold mb-2">UAE Regulations</h2>
            <p className="text-muted-foreground">Include local regulations, authority guidelines, and compliance notes.</p>
          </div>
        </TabsContent>

        <TabsContent value="sops">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-lg font-semibold mb-2">Standard Operating Procedures (SOPs)</h2>
            <p className="text-muted-foreground">List and manage SOPs across departments and activities.</p>
          </div>
        </TabsContent>

        <TabsContent value="policy">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-lg font-semibold mb-2">Policies</h2>
            <p className="text-muted-foreground">Company policies, HSE policies, and related governance documents.</p>
          </div>
        </TabsContent>
        </Tabs>
      )}

      {!isExpanded && (
        <div className="border rounded-lg overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
          <iframe
            src="/slide-to-code-craft/ISO.pdf"
            width="100%"
            height="100%"
            title="ISO Documents"
            className="border-0"
          />
        </div>
      )}
    </Layout>
  );
};

export default Library;
