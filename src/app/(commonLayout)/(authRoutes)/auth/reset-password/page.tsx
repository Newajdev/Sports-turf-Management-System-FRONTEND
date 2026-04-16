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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: ResetPasswordAction,
    onSuccess: (data) => {
      if (data && !data.success) {
        setError(data.message || "Failed to reset password.");
        toast.error(data.message || "Reset failed");
      } else {
        toast.success("Password reset successful! Redirecting to login...");
        // Handle redirect on the client side
        router.push("/auth/login?reset=success");
      }
    },
    onError: (error: any) => {
      setError(error.message || "An unexpected error occurred.");
      toast.error(error.message || "Request failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
    <div className="flex items-center justify-center min-h-screen px-4 bg-slate-50/50 py-12">
      <Card className="w-full max-w-md shadow-2xl border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
        
        <CardHeader className="text-center pt-8 pb-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-black italic tracking-tight uppercase">Set New Password</CardTitle>
          <CardDescription className="text-slate-500">
            Enter the 6-digit code sent to <span className="font-bold text-slate-900">{email || "your email"}</span> and your new password.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-bold uppercase tracking-wider text-slate-700 block text-center">Verification Code</Label>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-10 h-12 text-lg font-bold border-2" />
                    <InputOTPSlot index={1} className="w-10 h-12 text-lg font-bold border-2" />
                    <InputOTPSlot index={2} className="w-10 h-12 text-lg font-bold border-2" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="w-10 h-12 text-lg font-bold border-2" />
                    <InputOTPSlot index={4} className="w-10 h-12 text-lg font-bold border-2" />
                    <InputOTPSlot index={5} className="w-10 h-12 text-lg font-bold border-2" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password font-bold uppercase tracking-wider">New Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 h-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword font-bold uppercase tracking-wider">Confirm New Password</Label>
                <div className="relative">
                  <CheckCircle2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 h-11"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-11 font-black italic tracking-widest uppercase transition-all active:scale-[0.98]"
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

        <CardFooter className="bg-slate-50 border-t py-4 justify-center">
          <Link 
            href="/auth/login" 
            className="text-sm font-bold text-slate-500 hover:text-primary transition-colors"
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
