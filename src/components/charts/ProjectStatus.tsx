import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectStatusProps {
  rating?: number;
  status?: string;
  standing?: string;
  score?: string;
  scoreValue?: string;
  className?: string;
}

const ProjectStatus = ({ 
  rating = 4, 
  status = "OPS", 
  standing = "U L S", 
  score = "G E", 
  scoreValue = "+0",
  className 
}: ProjectStatusProps) => {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-5 h-5",
          i < count
            ? "fill-warning text-warning"
            : "fill-muted text-muted-foreground"
        )}
      />
    ));
  };

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4", className)}>
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-2">Project Rating</div>
          <div className="flex gap-1 mb-1">{renderStars(rating)}</div>
          <div className="text-sm font-medium text-foreground">{status}</div>
          <div className="text-xs text-muted-foreground">14</div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-2">Project Status</div>
          <div className="flex gap-1 mb-1">{renderStars(rating)}</div>
          <div className="text-xs text-muted-foreground">-2</div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-2">Project Standing</div>
          <div className="text-sm font-medium text-foreground">{standing}</div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-2">Project Score</div>
          <div className="text-sm font-medium text-foreground">{score} {scoreValue}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStatus;