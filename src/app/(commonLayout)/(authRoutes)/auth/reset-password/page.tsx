"use client";

import { useState, use } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, Loader2, KeyRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordAction } from "./_action";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const router = useRouter();
  const { email } = use(searchParams);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: ResetPasswordAction,
    onSuccess: (data) => {
      if (data && !data.success) {
        toast.error(data.message || "Reset failed");
      } else {
        toast.success("Password reset successful! Redirecting to login...");
        router.push("/auth/login?reset=success");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error.message || "Request failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email address missing.");
      return;
    }
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    mutate({ email, otp, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-background via-muted to-background py-12">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/10 backdrop-blur-md overflow-hidden">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Lock className="size-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Set New Password</CardTitle>
          <CardDescription className="text-muted-foreground text-balance">
            Enter the 6-digit code sent to <span className="font-semibold text-foreground">{email || "your email"}</span> and your new password.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground/80 block text-center uppercase tracking-wide">Verification Code</Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-10 h-12 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20" />
                    <InputOTPSlot index={1} className="w-10 h-12 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20" />
                    <InputOTPSlot index={2} className="w-10 h-12 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20" />
                  </InputOTPGroup>
                  <InputOTPSeparator className="text-muted-foreground" />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-10 h-12 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20" />
                    <InputOTPSlot index={4} className="w-10 h-12 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20" />
                    <InputOTPSlot index={5} className="w-10 h-12 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">New Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 h-11 bg-white/5 border-muted-foreground/20 focus:ring-primary/20 focus:border-primary transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground/80">Confirm New Password</Label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 h-11 bg-white/5 border-muted-foreground/20 focus:ring-primary/20 focus:border-primary transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 font-bold shadow-lg transition-all active:scale-[0.98]"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-muted-foreground/10 py-4">
          <Link 
            href="/auth/login" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
