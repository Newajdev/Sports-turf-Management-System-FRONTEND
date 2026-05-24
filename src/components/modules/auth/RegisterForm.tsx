/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { RegisterAction } from "@/app/(commonLayout)/(authRoutes)/auth/register/_action";
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
import { IRegistrationPayload, registerPlayerZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { isRedirectError } from "@/lib/isRedirectError";

interface RegisterFormProps {
  redirectPath?: string;
}

const RegisterForm = ({ redirectPath }: RegisterFormProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: (payload: IRegistrationPayload) => RegisterAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: async ({ value }) => {
      try {
        const result = (await mutateAsync(value)) as any;
        if (result && !result.success) {
          toast.error(result.message || "Registration failed");
        }
      } catch (error: unknown) {
        if (isRedirectError(error)) return;
        const err = error as { response?: { data?: { message?: string } }; message?: string };
        toast.error(
          err?.response?.data?.message || err?.message || "An unexpected error occurred",
        );
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-background via-muted to-background">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/10 backdrop-blur-md">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <UserPlus className="size-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Join the Arena
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account to start booking top-tier sports venues.
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
              name="name"
              validators={{ onChange: registerPlayerZodSchema.shape.name }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Full Name"
                  type="text"
                  placeholder="Enter your name"
                />
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{ onChange: registerPlayerZodSchema.shape.email }}
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
              validators={{ onChange: registerPlayerZodSchema.shape.password }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Create a strong password"
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

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <FormSubmitBtn 
                  isPending={isSubmitting} 
                  disabled={!canSubmit}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all active:scale-[0.98]"
                >
                  Register Now
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
                Or join with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mb-2 bg-white/5 border-muted-foreground/20 hover:bg-white/10"
            onClick={() => {
              const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
              const redirectParam = redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : "";
              window.location.href = `${baseUrl}/api/v1/auth/login/google${redirectParam}`;
            }}
          >
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 border-t border-muted-foreground/10 pt-4">
          <p className="text-sm text-center text-muted-foreground">
            Already a member?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline underline-offset-4 font-bold"
            >
              Log in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
