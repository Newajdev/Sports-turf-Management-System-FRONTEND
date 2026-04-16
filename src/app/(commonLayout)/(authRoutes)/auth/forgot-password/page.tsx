"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordAction } from "./_action";
import { toast } from "sonner";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: ForgotPasswordAction,
    onSuccess: (data) => {
      if (data && !data.success) {
        setError(data.message || "Failed to send reset code.");
        toast.error(data.message || "Something went wrong");
      } else {
        toast.success("Reset code sent! Redirecting...");
        // Handle redirect on the client side
        router.push(`/auth/reset-password?email=${email}`);
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
      toast.error("Please enter your email address");
      return;
    }
    mutate({ email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-slate-50/50">
      <Card className="w-full max-w-md shadow-2xl border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
        
        <CardHeader className="text-center pt-8 pb-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-black italic tracking-tight uppercase">Forgot Password</CardTitle>
          <CardDescription className="text-slate-500">
            Enter your email address and we'll send you a 6-digit code to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-slate-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-11 border-slate-200 focus:ring-primary/20 focus:border-primary transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertTitle className="text-red-800 font-bold">Failed to send code</AlertTitle>
                <AlertDescription className="text-red-700">{error}</AlertDescription>
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
                  Sending Code...
                </>
              ) : (
                "Send Reset Code"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="bg-slate-50 border-t py-4 justify-center">
          <Link 
            href="/auth/login" 
            className="flex items-center text-sm font-bold text-slate-500 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
