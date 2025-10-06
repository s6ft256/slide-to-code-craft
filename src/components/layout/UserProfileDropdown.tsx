import { useState } from "react";
import { User, Settings, LogOut, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { userData } from "@/lib/userData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileDropdownProps {
  className?: string;
}

export function UserProfileDropdown({ className }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  
  // Get user information based on authentication type
  const getUserDisplayInfo = () => {
    if (!user) {
      return {
        name: "Guest User",
        email: "guest@example.com",
        role: "Guest",
        initials: "GU",
        avatarUrl: "",
        isAnonymous: true
      };
    }

    const isAnonymous = user.user_metadata?.isAnonymous;
    
    if (isAnonymous) {
      return {
        name: "Guest User",
        email: "guest@example.com",
        role: "Guest",
        initials: "GU",
        avatarUrl: "",
        isAnonymous: true
      };
    }

    // For authenticated users
    const name = user.user_metadata?.name || user.user_metadata?.full_name || 
                 (user.email ? user.email.split('@')[0] : "User");
    const email = user.email || "";
    const role = user.user_metadata?.role || "User";
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || "";

    return {
      name,
      email,
      role,
      initials,
      avatarUrl,
      isAnonymous: false
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`w-8 h-8 rounded-full ${className}`}
          aria-label="User profile menu"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={userInfo.avatarUrl} alt={userInfo.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {userInfo.initials || <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center gap-3 p-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={userInfo.avatarUrl} alt={userInfo.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
              {userInfo.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-foreground">{userInfo.name}</div>
            <div className="text-sm text-muted-foreground">{userInfo.role}</div>
            {userInfo.isAnonymous && (
              <div className="text-xs text-muted-foreground mt-1">Anonymous User</div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-foreground">{userInfo.email}</div>
              <div className="text-xs text-muted-foreground">Email</div>
            </div>
          </div>

          {!userInfo.isAnonymous && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-foreground">{userData.phone}</div>
                <div className="text-xs text-muted-foreground">Phone</div>
              </div>
            </div>
          )}

          {!userInfo.isAnonymous && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-foreground">{userData.location}</div>
                <div className="text-xs text-muted-foreground">Location</div>
              </div>
            </div>
          )}

          {!userInfo.isAnonymous && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-foreground">{userData.joinDate}</div>
                <div className="text-xs text-muted-foreground">Joined</div>
              </div>
            </div>
          )}
        </div>

        {!userInfo.isAnonymous && (
          <>
            <DropdownMenuItem className="flex items-center gap-3">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem 
          className="flex items-center gap-3 text-destructive focus:text-destructive"
          onClick={async () => {
            await signOut();
            setIsOpen(false);
            navigate("/auth");
          }}
        >
          <LogOut className="h-4 w-4" />
          <span>{userInfo.isAnonymous ? "Exit Guest Mode" : "Sign Out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}