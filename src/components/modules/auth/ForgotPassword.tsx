/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForgotPasswordAction } from "@/app/(commonLayout)/(authRoutes)/auth/forgot-password/_action";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: ForgotPasswordAction,
    onSuccess: (data) => {
      if (data && !data.success) {
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success("Reset code sent! Redirecting...");
        router.push(`/auth/reset-password?email=${email}`);
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || error.message || "Request failed",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    mutate({ email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-linear-to-br from-background via-muted to-background">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/10 backdrop-blur-md overflow-hidden">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <KeyRound className="size-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a 6-digit code to
            reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-foreground/80"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-11 bg-white/5 border-muted-foreground/20 focus:ring-primary/20 focus:border-primary transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  required
                />
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
                  Sending Code...
                </>
              ) : (
                "Send Reset Code"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-muted-foreground/10 pt-4">
          <Link
            href="/auth/login"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
