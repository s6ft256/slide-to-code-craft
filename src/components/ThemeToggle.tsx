import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();

  const handleToggle = () => {
    toggleTheme();
    const newTheme = theme === 'light' ? 'dark' : 'light';

    toast({
      title: `Switched to ${newTheme} mode`,
      description: `Theme has been changed to ${newTheme} mode.`,
      duration: 2000,
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="w-9 h-9 border-2 hover:border-primary/50 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}