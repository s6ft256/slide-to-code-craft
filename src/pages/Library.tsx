import Layout from "@/components/Layout";
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

// Policy content extracted from Trojan QHSE pages
const policyData = [
  {
    id: "qhse-policy",
    title: "QHSE Policy",
    subtitle: "Health, Safety & Environmental Protection",
    content: [
      "Trojan General Contracting is committed to achieve the highest practical standards of health, safety, and environmental protection, in all spheres of its operations. This concept is at the heart of the company's philosophy.",
      "The company requires all levels of staff throughout the organization to be aware of and implement its safety procedures. Trojan General Contracting's management actively encourages the implementation and continuous review of safety standards.",
      "While safety on site is of prime consideration, we believe that successful safety procedures must embrace all of the company's activities, including its office, material and plant procurement operation.",
      "It is our belief that environmental protection procedures, good health, and safety can, and should, also improve construction in terms of both efficiency and value.",
      "Trojan General Contracting also considers that its environmental protection philosophy, health, and safety must be dynamic and not static. The preparation and implementation of procedures is the beginning, not the end. These procedures should be communicated, reiterated, regularly reviewed, and developed, to suit changing conditions, standards, and technology.",
      "Trojan General Contracting is dedicated to the pursuit of excellence and firmly believes that environmental protection procedures, health, and safety are an intrinsic part of this philosophy."
    ],
    relatedPolicies: [
      "Code of Conduct and Business Ethics",
      "Environmental Policy",
      "Executive Compensation",
      "Human Rights Policy",
      "Occupational Health and Safety Policy Statement",
      "Privacy and Data Security Policy",
      "Supplier Code of Conduct Policy",
      "TCG Quality Policy",
      "Whistleblower Policy"
    ]
  },
  {
    id: "quality-policy",
    title: "Quality Policy",
    subtitle: "ISO 9001:2008 Compliant Quality Management",
    content: [
      "It is the policy of Trojan General Contracting to provide consistent levels of work performance that meet or exceed the quality requirements of the customer, including statutory and regulatory requirements.",
      "We are committed to providing continuous effort, to identify and eliminate any defects or discrepancies, and continually improve the effectiveness of the quality management system by:"
    ],
    bullets: [
      "Implementing a quality management system conforming to ISO 9001:2008;",
      "Identifying and controlling the process and product effectively;",
      "Ensuring the availability of human resources who are capable of meeting the challenges and who fully accept the responsibilities;",
      "Monitoring, measuring, and analyzing the progress;",
      "Minimizing the number of defects/complaints;",
      "Taking action to achieve the targets and continually improve the system."
    ],
    closing: [
      "The quality policy is communicated and understood within the company and is available to all employees who have a direct bearing on quality within the construction.",
      "The policy and performance are reviewed for continuing suitability and accordingly revised when required."
    ]
  },
  {
    id: "iso-certificates",
    title: "ISO Certificates",
    subtitle: "International Organization for Standardization Certifications",
    content: [
      "The ISO Certificates section contains all current ISO certifications held by Trojan General Contracting, including certificate numbers, standards, scopes, issuing bodies, and validity periods.",
      "This information is dynamically loaded from the company's QHSE management system. Please refer to the ISO tab for the full PDF document containing all certificates."
    ],
    note: "Full certificate details (ISO 9001, ISO 14001, ISO 45001, etc.) with certificate numbers, scopes, issuing bodies, and expiry dates are available in the ISO tab PDF document."
  },
  {
    id: "group-policy-statement",
    title: "Group Policy Statement",
    subtitle: "Corporate Governance & Policy Statement",
    content: [
      "The Group Policy Statement outlines Trojan General Contracting's overarching corporate governance framework, commitments, and strategic policy directives.",
      "This document is maintained by senior leadership and reflects the organization's commitment to ethical business practices, regulatory compliance, and sustainable operations.",
      "For the complete Group Policy Statement document including signatories, effective dates, and full policy text, please contact the QHSE department or refer to the company's document management system."
    ],
    note: "The full Group Policy Statement with signatory details and effective dates is available through the company's document management system."
  }
];

const policyTabs = [
  { id: "qhse-policy", label: "QHSE Policy" },
  { id: "quality-policy", label: "Quality Policy" },
  { id: "iso-certificates", label: "ISO Certificates" },
  { id: "group-policy-statement", label: "Group Policy Statement" },
];

const Library = () => {
  const [activeTab, setActiveTab] = useState("iso");

  const renderTabContent = () => {
    switch (activeTab) {
      case "iso":
        return (
          <div className="h-full">
            <iframe
              src={`${import.meta.env.BASE_URL}ISO.pdf`}
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
        const [activePolicyTab, setActivePolicyTab] = useState("qhse-policy");
        const activePolicy = policyData.find(p => p.id === activePolicyTab);
        return (
          <div className="h-full flex flex-col">
            {/* Policy Sub-tabs */}
            <div className="border-b border-border px-4">
              <nav className="flex gap-1 -mb-px" role="tablist">
                {policyTabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activePolicyTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActivePolicyTab(tab.id)}
                    className={cn(
                      "h-10 px-4 text-sm font-medium transition-all",
                      activePolicyTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    role="tab"
                    aria-selected={activePolicyTab === tab.id}
                  >
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </div>
            
            {/* Policy Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activePolicy && (
                <div className="space-y-4 text-sm text-foreground/90 animate-fade-in">
                  <div className="mb-4">
                    <h4 className="font-semibold text-lg">{activePolicy.title}</h4>
                    <p className="text-xs text-muted-foreground">{activePolicy.subtitle}</p>
                  </div>
                  {activePolicy.content.map((paragraph, idx) => (
                    <p key={`content-${activePolicy.id}-${idx}`} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {activePolicy.bullets && (
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {activePolicy.bullets.map((bullet, idx) => (
                        <li key={`bullet-${activePolicy.id}-${idx}`} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {activePolicy.closing && (
                    <>
                      {activePolicy.closing.map((paragraph, idx) => (
                        <p key={`closing-${activePolicy.id}-${idx}`} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </>
                  )}
                  {activePolicy.relatedPolicies && (
                    <div className="pt-4 border-t border-border">
                      <p className="font-medium text-xs text-muted-foreground mb-2 uppercase tracking-wide">Related Policies</p>
                      <div className="flex flex-wrap gap-2">
                        {activePolicy.relatedPolicies.map((relPolicy, idx) => (
                          <span
                            key={`related-${activePolicy.id}-${idx}`}
                            className="px-2 py-1 text-xs bg-muted rounded border text-muted-foreground"
                          >
                            {relPolicy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {activePolicy.note && (
                    <p className="pt-4 text-xs text-muted-foreground italic border-t border-border">
                      {activePolicy.note}
                    </p>
                  )}
                </div>
              )}
            </div>
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
