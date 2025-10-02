import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Library = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Library</h1>
        <p className="text-muted-foreground">
          Central place for documents, templates, policies, and references.
        </p>
      </div>

      <Tabs defaultValue="iso" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="iso">ISO</TabsTrigger>
          <TabsTrigger value="uae">UAE</TabsTrigger>
          <TabsTrigger value="sops">SOPs</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="iso">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-lg font-semibold mb-2">ISO Documents</h2>
            <p className="text-muted-foreground">Add ISO standards, procedures, and references here.</p>
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
    </Layout>
  );
};

export default Library;
