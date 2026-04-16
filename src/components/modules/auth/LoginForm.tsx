/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LoginAction } from "@/app/(commonLayout)/(authRoutes)/auth/login/_action";
import AppField from "@/components/shared/form/AppField";
import FormSubmitBtn from "@/components/shared/form/FormSubmitBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface LoginFormProps {
  redirectPath?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: (payload: ILoginPayload) => LoginAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const result = (await mutateAsync(value)) as any;
        if (result && !result.success) {
          toast.error(result.message || "Login failed");
        }
      } catch (error: any) {
        if (error.message?.includes("NEXT_REDIRECT")) {
          return;
        }
        toast.error(error?.response?.data?.message || error.message || "An unexpected error occurred");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-background via-muted to-background">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/10 backdrop-blur-md">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <LogIn className="size-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please enter your credentials to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            <form.Field
              name="email"
              validators={{ onChange: loginZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                />
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{ onChange: loginZodSchema.shape.password }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  append={
                    <Button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10"
                    >
                      {passwordVisible ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  }
                />
              )}
            </form.Field>

            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline underline-offset-4 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <FormSubmitBtn 
                  isPending={isSubmitting} 
                  disabled={!canSubmit}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all active:scale-[0.98]"
                >
                  Log In
                </FormSubmitBtn>
              )}
            </form.Subscribe>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mb-2 bg-white/5 border-muted-foreground/20 hover:bg-white/10"
            onClick={() => {
              `${baseUrl}/api/v1/auth/login/google`;
            }}
          >
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 border-t border-muted-foreground/10 pt-4">
          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline underline-offset-4 font-bold"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
