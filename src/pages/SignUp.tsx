import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthShell from "@/components/auth/AuthShell";
import { AuthInput } from "@/components/ui/AuthInput";
import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/contexts/ProjectContext";
import { useToast } from "@/hooks/use-toast";

const btnCls =
  "w-full rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 py-3 text-base font-semibold text-white shadow-[0_0_24px_0_rgba(0,243,255,0.45)] ring-1 ring-white/30 transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_30px_0_rgba(0,243,255,0.6)] disabled:cursor-not-allowed disabled:opacity-70";

const inputCls =
  "border-white/30 placeholder-white/45 focus:border-cyan-400/70 focus:ring-cyan-400/40";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { projects } = useProject();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    position: "",
    phone: "",
    location: "",
    selectedProject: "TG000",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleProjectChange = (value: string) =>
    setFormData({ ...formData, selectedProject: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const result = await signUp(
      formData.email,
      formData.password,
      formData.name,
      formData.company,
      formData.position,
      formData.selectedProject,
      formData.phone,
      formData.location,
    );
    setLoading(false);

    if (result.error) {
      toast({
        title: "Sign Up Failed",
        description: result.error.message || "An error occurred during sign up",
        variant: "destructive",
      });
    } else if (result.needsEmailConfirmation) {
      toast({
        title: "Check your email",
        description:
          "A confirmation link has been sent. Please confirm your email before signing in.",
      });
      navigate("/sign-in");
    } else {
      toast({
        title: "Sign Up Successful",
        description: "Welcome to THSEMS!",
      });
      navigate("/dashboard");
    }
  };

  return (
    <AuthShell
      title="Create Account"
      subtitle="Join THSEMS — set up your safety profile in seconds"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <AuthInput
              id="name"
              label="Full Name"
              name="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <AuthInput
            id="email"
            label="Email address"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className={inputCls}
          />

          <AuthInput
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />

          <div className="sm:col-span-2">
            <AuthInput
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <AuthInput
            id="company"
            label="Company"
            name="company"
            placeholder="Your Company"
            value={formData.company}
            onChange={handleChange}
            disabled={loading}
          />

          <AuthInput
            id="position"
            label="Position"
            name="position"
            placeholder="Your Job Title"
            value={formData.position}
            onChange={handleChange}
            disabled={loading}
          />

          <AuthInput
            id="phone"
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+971-50-123-4567"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
          />

          <AuthInput
            id="location"
            label="Location"
            name="location"
            placeholder="Dubai, UAE"
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
          />

          <div className="sm:col-span-2">
            <label
              htmlFor="selectedProject"
              className="text-xs font-medium text-white/60"
            >
              Select Project
            </label>
            <Select
              value={formData.selectedProject}
              onValueChange={handleProjectChange}
              disabled={loading}
            >
              <SelectTrigger className="w-full rounded-xl border border-white/30 bg-transparent px-4 py-3 text-base text-white placeholder-white/45 shadow-inner transition-all duration-200 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/40 focus:shadow-[0_0_12px_rgba(0,243,255,0.35)] focus:outline-none">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent className="border border-white/20 bg-slate-900/90 text-white">
                {projects.map((project) => (
                  <SelectItem
                    key={project.code}
                    value={project.code}
                    className="text-white focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                  >
                    {project.code} - {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-1 text-xs text-white/50">
              You will only have access to data for this project
            </p>
          </div>
        </div>

        <button type="submit" disabled={loading} className={btnCls}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Creating Account...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <span className="text-sm text-white/55">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="font-bold text-cyan-300 underline decoration-cyan-300/40 underline-offset-2 transition-colors hover:text-cyan-200"
        >
          Sign in
        </Link>
      </span>
    </AuthShell>
  );
}
