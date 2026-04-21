"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileInfoCards from "./ProfileInfoCards";
import SecuritySettings from "./SecuritySettings";
import RoleActivity from "./RoleActivity";
import { User, ShieldCheck, Activity } from "lucide-react";

interface ProfileTabsProps {
  user: any;
}

const ProfileTabs = ({ user }: ProfileTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="flex items-center justify-between mb-6 border-b border-border/40 pb-1 overflow-x-auto no-scrollbar">
        <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start">
            <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-3 font-semibold transition-all"
            >
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Overview
                </div>
            </TabsTrigger>
            <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-3 font-semibold transition-all"
            >
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Security
                </div>
            </TabsTrigger>
            <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none px-0 pb-3 font-semibold transition-all"
            >
                <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Activity
                </div>
            </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="outline-none focus-visible:ring-0">
        <div className="space-y-6">
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Profile Overview</h3>
                <p className="text-sm text-muted-foreground">General information about your account and contact details.</p>
            </div>
            <ProfileInfoCards user={user} />
        </div>
      </TabsContent>

      <TabsContent value="security" className="outline-none focus-visible:ring-0">
        <SecuritySettings user={user} />
      </TabsContent>

      <TabsContent value="activity" className="outline-none focus-visible:ring-0">
        <RoleActivity user={user} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
