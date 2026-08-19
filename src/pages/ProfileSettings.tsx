import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/contexts/ProjectContext";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  User,
  Building2,
  Briefcase,
  Phone,
  MapPin,
  Mail,
  Save,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

const ProfileSettings = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const { projects, selectedProject } = useProject();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    phone: "",
    location: "",
    selected_project: selectedProject.code,
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        company: userProfile.company || "",
        position: userProfile.position || "",
        phone: userProfile.phone || "",
        location: userProfile.location || "",
        selected_project: userProfile.selected_project || selectedProject.code,
      });
    }
  }, [userProfile, selectedProject.code]);

  const saved = useMemo(
    () => ({
      name: userProfile?.name || "",
      company: userProfile?.company || "",
      position: userProfile?.position || "",
      phone: userProfile?.phone || "",
      location: userProfile?.location || "",
      selected_project: userProfile?.selected_project || selectedProject.code,
    }),
    [userProfile, selectedProject.code]
  );

  const isDirty = useMemo(
    () =>
      formData.name !== saved.name ||
      formData.company !== saved.company ||
      formData.position !== saved.position ||
      formData.phone !== saved.phone ||
      formData.location !== saved.location ||
      formData.selected_project !== saved.selected_project,
    [formData, saved]
  );

  const initials = (
    formData.name.trim() ||
    user?.email?.split("@")[0] ||
    "U"
  )
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const resetForm = () =>
    setFormData({
      name: userProfile?.name || "",
      company: userProfile?.company || "",
      position: userProfile?.position || "",
      phone: userProfile?.phone || "",
      location: userProfile?.location || "",
      selected_project: userProfile?.selected_project || selectedProject.code,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (value: string) => {
    setFormData({ ...formData, selected_project: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await updateProfile({
      name: formData.name,
      company: formData.company,
      position: formData.position,
      phone: formData.phone,
      location: formData.location,
      selected_project: formData.selected_project,
    });
    setLoading(false);

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message || "Could not update your profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved.",
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Profile Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal information, contact details, and project
            access.
          </p>
        </div>

        {/* Identity banner */}
        <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card shadow-soft p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Avatar className="h-20 w-20 ring-2 ring-primary/20 rounded-2xl shadow-medium">
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold rounded-2xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-xl font-bold text-foreground truncate">
              {formData.name.trim() || "Your Name"}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {[formData.position, formData.company]
                .filter(Boolean)
                .join(" · ") || "No position or company set yet"}
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="secondary" className="gap-1">
                <Building2 className="h-3 w-3" />
                {formData.selected_project || selectedProject.code}
              </Badge>
              {userProfile?.created_at && (
                <Badge variant="outline" className="gap-1">
                  Member since{" "}
                  {new Date(userProfile.created_at).toLocaleDateString()}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Settings form */}
        <Card className="shadow-soft">
          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-8">
              {/* Contact Information */}
              <section className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      Company
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      Position
                    </Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Job title"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      readOnly
                      className="opacity-75 cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground">
                      Your email is tied to your account and cannot be changed
                      here.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Location & Access */}
              <section className="space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location & Project Access
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971-50-123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Dubai, UAE"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="selectedProject" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      Assigned Project
                    </Label>
                    <Select
                      value={formData.selected_project}
                      onValueChange={handleProjectChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.code} value={project.code}>
                            {project.code} - {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      You will primarily have access to data for this project.
                    </p>
                  </div>
                </div>
              </section>
            </CardContent>
            <CardFooter className="border-t bg-muted/40 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-b-2xl">
              <span
                className={`text-xs font-medium flex items-center gap-2 ${
                  isDirty ? "text-amber-600" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isDirty ? "bg-amber-500 animate-pulse" : "bg-emerald-500"
                  }`}
                />
                {isDirty ? "You have unsaved changes" : "All changes saved"}
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={!isDirty || loading}
                  className="flex-1 sm:flex-none"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !isDirty}
                  className="flex-1 sm:flex-none gradient-bg-primary bg-primary hover:bg-primary-hover shadow-medium transition-all duration-200 hover:scale-105"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfileSettings;


