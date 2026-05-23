/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, use } from "react";
import { Mail, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import {
  ResendOTPAction,
  VerifyEmailAction,
} from "@/app/(commonLayout)/(authRoutes)/auth/verify-email/_action";
import { isRedirectError } from "@/lib/isRedirectError";

interface VerifyEmailPageProps {
  searchParams: Promise<{
    email?: string;
  }>;
}

export default function VerifyEmail({ searchParams }: VerifyEmailPageProps) {
  const { email } = use(searchParams);
  const [otp, setOtp] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: VerifyEmailAction,
    onSuccess: (data) => {
      if (data && !data.success) {
        toast.error(data.message || "Verification failed");
      } else {
        setIsSuccess(true);
        toast.success("Email verified successfully!");
      }
    },
    onError: (error: unknown) => {
      if (isRedirectError(error)) return;
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      toast.error(
        err?.response?.data?.message || err?.message || "Verification failed",
      );
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: ResendOTPAction,
    onSuccess: (data) => {
      if (data && !data.success) {
        toast.error(data.message || "Failed to resend OTP");
      } else {
        toast.success("A new OTP has been sent to your email.");
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to resend OTP",
      );
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
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-background via-muted to-background">
        <Card className="w-full max-w-md border-none shadow-2xl bg-white/10 backdrop-blur-md text-center">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <CheckCircle2 className="size-10 text-green-500" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Verified!
            </CardTitle>
            <CardDescription className="text-muted-foreground italic">
              Your email has been successfully verified. You now have full
              access to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Link href="/dashboard" className="block w-full">
              <Button className="w-full h-11 font-bold shadow-lg transition-all active:scale-[0.98]">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-background via-muted to-background">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/10 backdrop-blur-md overflow-hidden relative">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Mail className="size-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Verify your email
          </CardTitle>
          <CardDescription className="text-muted-foreground text-balance">
            We&rsquo;ve sent a 6-digit code to{" "}
            <span className="font-semibold text-foreground">
              {email || "your email"}
            </span>
            . Please enter it below to verify your account.
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
                <InputOTPSlot
                  index={0}
                  className="w-11 h-13 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20"
                />
                <InputOTPSlot
                  index={1}
                  className="w-11 h-13 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20"
                />
                <InputOTPSlot
                  index={2}
                  className="w-11 h-13 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20"
                />
              </InputOTPGroup>
              <InputOTPSeparator className="text-muted-foreground" />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className="w-11 h-13 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20"
                />
                <InputOTPSlot
                  index={4}
                  className="w-11 h-13 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20"
                />
                <InputOTPSlot
                  index={5}
                  className="w-11 h-13 text-lg font-bold border-2 bg-white/5 border-muted-foreground/20"
                />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-xs text-muted-foreground font-medium">
              Didn&rsquo;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-primary hover:underline font-bold disabled:opacity-50 disabled:no-underline cursor-pointer"
              >
                {isResending ? "Sending..." : "Click to resend"}
              </button>
            </p>
          </div>

          <Button
            onClick={handleVerify}
            className="w-full h-11 text-base font-bold shadow-lg transition-all active:scale-[0.98]"
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

        <CardFooter className="flex justify-center border-t border-muted-foreground/10 pt-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
