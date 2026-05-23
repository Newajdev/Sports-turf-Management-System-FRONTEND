/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Calendar, ShieldCheck, Fingerprint } from "lucide-react";
import { format } from "date-fns";

interface ProfileInfoCardsProps {
  user: any;
}

const ProfileInfoCards = ({ user }: ProfileInfoCardsProps) => {
  const roleData = user.player || user.turfOwner || user.systemAdmin || {};
  
  const infoItems = [
    {
      label: "Email Address",
      value: user.email,
      icon: Mail,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Contact Number",
      value: roleData.contactNumber || "Not provided",
      icon: Phone,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Member Since",
      value: format(new Date(user.createdAt), "MMMM dd, yyyy"),
      icon: Calendar,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Account Status",
      value: user.userStatus,
      icon: ShieldCheck,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {infoItems.map((item, idx) => (
        <Card key={idx} className="border-none shadow-premium-subtle hover:shadow-premium-hover transition-shadow bg-card/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-tight text-muted-foreground">
              {item.label}
            </CardTitle>
            <div className={`ml-auto p-1.5 rounded-md ${item.bg}`}>
                <item.icon className={`h-3 w-3 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold truncate" title={item.value}>
                {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileInfoCards;
