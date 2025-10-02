import Layout from "@/components/Layout";

const Library = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Library</h1>
        <p className="text-muted-foreground">
          Central place for documents, templates, policies, and references.
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-card text-muted-foreground">
        Library content will be available here.
      </div>
    </Layout>
  );
};

export default Library;
