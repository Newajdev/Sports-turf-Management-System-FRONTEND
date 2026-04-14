/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, use } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { VerifyEmailAction, ResendOTPAction } from "./_action";
import { toast } from "sonner";
import Link from "next/link";

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string;
    
  }>;
}

export default function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { email } = use(searchParams);
  const [otp, setOtp] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: VerifyEmailAction,
    onSuccess: (data) => {
      if (data && !data.success) {
        toast.error(data.message);
      } else {
        setIsSuccess(true);
        toast.success("Email verified successfully!");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Verification failed");
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: ResendOTPAction,
    onSuccess: (data) => {
      if (data && !data.success) {
        toast.error(data.message);
      } else {
        toast.success("A new OTP has been sent to your email.");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to resend OTP");
    },
  });

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }
    if (!email) {
      toast.error("Email address missing. Please try logging in again.");
      return;
    }
    verifyOtp({ email, otp });
  };

  const handleResend = () => {
    if (!email) {
      toast.error("Email address missing.");
      return;
    }
    resendOtp({ email });
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md p-6 text-center border-green-100 bg-green-50/30">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Verified!</CardTitle>
            <CardDescription className="text-green-700">
              Your email has been successfully verified. You now have full access to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard" className="block w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700 h-11 text-white shadow-lg shadow-green-200">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-slate-50 to-slate-100/50">
      <Card className="w-full max-w-md p-6 border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
        
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-2 border border-primary/10 rotate-3">
            <Mail className="w-7 h-7 text-primary -rotate-3" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Verify your email</CardTitle>
          <CardDescription className="text-slate-500 text-balance">
            We&rsquo;ve sent a 6-digit code to <span className="font-semibold text-slate-900">{email || "your email"}</span>.
            Please enter it below to verify your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 py-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-11 h-13 text-lg font-bold border-2" />
                <InputOTPSlot index={1} className="w-11 h-13 text-lg font-bold border-2" />
                <InputOTPSlot index={2} className="w-11 h-13 text-lg font-bold border-2" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="w-11 h-13 text-lg font-bold border-2" />
                <InputOTPSlot index={4} className="w-11 h-13 text-lg font-bold border-2" />
                <InputOTPSlot index={5} className="w-11 h-13 text-lg font-bold border-2" />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-xs text-slate-400 font-medium">
              Didn&rsquo;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary hover:underline font-bold disabled:opacity-50 disabled:no-underline"
              >
                {isResending ? "Sending..." : "Click to resend"}
              </button>
            </p>
          </div>

          <Button
            onClick={handleVerify}
            className="w-full h-11 text-base font-semibold transition-all active:scale-[0.98]"
            disabled={otp.length !== 6 || isVerifying || isResending}
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Account"
            )}
          </Button>
        </CardContent>

        <CardFooter className="justify-center border-t pt-4">
          <Link href="/auth/login" className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            Not you? Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
