import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import { AuthInput } from "@/components/ui/AuthInput";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const btnCls =
  "w-full rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 py-3 text-base font-semibold text-white shadow-[0_0_24px_0_rgba(0,243,255,0.45)] ring-1 ring-white/30 transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_30px_0_rgba(0,243,255,0.6)] disabled:cursor-not-allowed disabled:opacity-70";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } else {
      toast({ title: "Welcome Back", description: "You have successfully signed in" });
      navigate("/dashboard");
    }
  };

  return (
    <AuthShell title="Welcome Back" subtitle="Enter your credentials to access THSEMS">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AuthInput
          id="email"
          label="Email address"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <AuthInput
          id="password"
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <div className="flex justify-end">
          <span className="text-xs text-white/55">Forget Password ?</span>
        </div>
        <button type="submit" disabled={loading} className={btnCls}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Signing In...
            </span>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <span className="text-sm text-white/55">
        Are You New Member ?{" "}
        <Link
          to="/sign-up"
          className="font-bold text-cyan-300 underline decoration-cyan-300/40 underline-offset-2 transition-colors hover:text-cyan-200"
        >
          Sign UP
        </Link>
      </span>
    </AuthShell>
  );
}
