"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Edit3, Camera } from "lucide-react";
import Image from "next/image";
import UpdateProfileModal from "./UpdateProfileModal";

interface ProfileHeaderProps {
  user: any;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="relative mb-8 pb-8 border-b">
      {/* Background Decor */}
      <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent blur-3xl -z-10" />
      
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
        {/* Avatar Section */}
        <div className="relative group">
          <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-3xl overflow-hidden border-4 border-background shadow-premium ring-1 ring-primary/10 bg-muted">
            {user.image ? (
              <Image 
                src={user.image} 
                alt={user.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <User className="h-16 w-16 md:h-20 md:w-20 text-muted-foreground/30" />
              </div>
            )}
            
            {/* Quick Camera Overlay (Visual only, modal handles actual upload) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
              {user.name}
            </h1>
            <Badge variant="outline" className="w-fit mx-auto md:mx-0 bg-primary/5 text-primary border-primary/20 font-bold uppercase tracking-widest text-[10px]">
              {user.role?.replace("_", " ")}
            </Badge>
          </div>
          
          <p className="text-muted-foreground text-sm max-w-xl mx-auto md:mx-0">
            Platform account manager and verified platform member. 
            Manage your personal data and account settings here.
          </p>

          <div className="pt-2">
            <UpdateProfileModal user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
