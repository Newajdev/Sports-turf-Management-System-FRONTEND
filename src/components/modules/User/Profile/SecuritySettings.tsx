"use client";

import ChangePasswordForm from "@/components/modules/auth/ChangePasswordForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, KeyRound } from "lucide-react";

interface SecuritySettingsProps {
  user: any;
}

const SecuritySettings = ({ user }: SecuritySettingsProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Password Management */}
        <div className="space-y-4">
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <KeyRound className="h-5 w-5 text-primary" />
                    Authentication
                </h3>
                <p className="text-sm text-muted-foreground">Keep your account secure by updating your password regularly.</p>
            </div>
            
            <ChangePasswordForm 
                showBackground={false} 
                title="Change Password" 
                description="Your new password must be at least 6 characters long."
            />
        </div>

        {/* Security Summary / Status */}
        <div className="space-y-4">
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-amber-500" />
                    Security Status
                </h3>
                <p className="text-sm text-muted-foreground">Detailed overview of your account security standing.</p>
            </div>

            <Card className="border-none bg-muted/30 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-sm">Account Verification</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Email Verified</span>
                        <span className={`font-medium ${user.emailVerified ? "text-emerald-500" : "text-amber-500"}`}>
                            {user.emailVerified ? "Verified" : "Unverified"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Password Change Required</span>
                        <span className={`font-medium ${user.needPasswordChange ? "text-amber-500" : "text-emerald-500"}`}>
                            {user.needPasswordChange ? "Yes" : "No"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Account Status</span>
                        <span className="font-medium text-primary uppercase">
                            {user.userStatus}
                        </span>
                    </div>
                </CardContent>
            </Card>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 leading-relaxed italic">
                <strong>Tip:</strong> We recommend using a unique password for this platform that you don't use anywhere else.
            </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
