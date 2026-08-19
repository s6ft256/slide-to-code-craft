import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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
  const navigate = useNavigate();
  const { userProfile, user, signOut } = useAuth();

  const fullName = userProfile?.name || user?.email?.split('@')[0] || 'User';
  const displayName = fullName.split(' ')[0]; // Show only first name
  const initials = fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    window.location.hash = '/sign-in';
  };

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
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center gap-3 p-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-foreground">{displayName}</div>
            {userProfile?.position && (
              <div className="text-sm text-muted-foreground">{userProfile.position}</div>
            )}
            {userProfile?.company && (
              <div className="text-xs text-muted-foreground mt-1">{userProfile.company}</div>
            )}
            {userProfile?.selected_project && (
              <div className="text-xs text-muted-foreground mt-1">Project: {userProfile.selected_project}</div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2 space-y-1">
          {userProfile?.position && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <div className="h-4 w-4 text-muted-foreground flex items-center justify-center">
                <span className="text-xs font-semibold">👤</span>
              </div>
              <div>
                <div className="text-foreground">{userProfile.position}</div>
                <div className="text-xs text-muted-foreground">Position</div>
              </div>
            </div>
          )}

          {userProfile?.company && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <div className="h-4 w-4 text-muted-foreground flex items-center justify-center">
                <span className="text-xs font-semibold">🏢</span>
              </div>
              <div>
                <div className="text-foreground">{userProfile.company}</div>
                <div className="text-xs text-muted-foreground">Company</div>
              </div>
            </div>
          )}

          {userProfile?.phone && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-foreground">{userProfile.phone}</div>
                <div className="text-xs text-muted-foreground">Contact</div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-foreground">{user?.email || ''}</div>
              <div className="text-xs text-muted-foreground">Email</div>
            </div>
          </div>

          {userProfile?.location && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-foreground">{userProfile.location}</div>
                <div className="text-xs text-muted-foreground">Location</div>
              </div>
            </div>
          )}

          {userProfile?.selected_project && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <div className="h-4 w-4 text-muted-foreground flex items-center justify-center">
                <span className="text-xs font-semibold">📋</span>
              </div>
              <div>
                <div className="text-foreground">{userProfile.selected_project}</div>
                <div className="text-xs text-muted-foreground">Project</div>
              </div>
            </div>
          )}

          {userProfile?.created_at && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-foreground">{new Date(userProfile.created_at).toLocaleDateString()}</div>
                <div className="text-xs text-muted-foreground">Joined</div>
              </div>
            </div>
          )}

          {userProfile?.updated_at && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-foreground">{new Date(userProfile.updated_at).toLocaleDateString()}</div>
                <div className="text-xs text-muted-foreground">Last Updated</div>
              </div>
            </div>
          )}

          {userProfile?.id && (
            <div className="flex items-center gap-3 px-3 py-2 text-sm">
              <div className="h-4 w-4 text-muted-foreground flex items-center justify-center">
                <span className="text-xs font-semibold">🆔</span>
              </div>
              <div>
                <div className="text-foreground text-xs">{userProfile.id.slice(0, 8)}...</div>
                <div className="text-xs text-muted-foreground">User ID</div>
              </div>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-3"
          onClick={() => {
            setIsOpen(false);
            navigate("/profile");
          }}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 text-destructive focus:text-destructive" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}