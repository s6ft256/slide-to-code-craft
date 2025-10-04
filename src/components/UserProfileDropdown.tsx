import { useState } from "react";
import { User, Settings, LogOut, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { userData } from "@/lib/userData";
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

  // User data is imported from shared location

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
            <AvatarImage src="" alt={userData.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-foreground">{userData.name}</div>
            <div className="text-sm text-muted-foreground">{userData.role}</div>
            <div className="text-xs text-muted-foreground mt-1">{userData.employeeId}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-foreground">{userData.email}</div>
              <div className="text-xs text-muted-foreground">Email</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-foreground">{userData.phone}</div>
              <div className="text-xs text-muted-foreground">Phone</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-foreground">{userData.location}</div>
              <div className="text-xs text-muted-foreground">Location</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-foreground">{userData.joinDate}</div>
              <div className="text-xs text-muted-foreground">Joined</div>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-3">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}