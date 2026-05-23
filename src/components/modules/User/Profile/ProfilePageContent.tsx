"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/services/user.services";
import ProfileHeader from "@/components/modules/User/Profile/ProfileHeader";
import ProfileTabs from "@/components/modules/User/Profile/ProfileTabs";
import { Loader2 } from "lucide-react";

export function ProfilePageContent() {
  const { data: profileResponse, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getMyProfile(),
  });

  const user = profileResponse?.data;

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse font-medium">
          Loading your profile data...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <p className="text-muted-foreground">
          Failed to load profile. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 mt-4">
      <ProfileHeader user={user} />

      <div className="px-1 md:px-4">
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
