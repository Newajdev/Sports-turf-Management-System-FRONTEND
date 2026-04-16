/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { RegisterAction } from "@/app/(commonLayout)/(authRoutes)/auth/register/_action";
import AppField from "@/components/shared/form/AppField";
import FormSubmitBtn from "@/components/shared/form/FormSubmitBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
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
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;


        if (!result.success) {
          setServerError(result.message);
          return;
        }
      } catch (error: any) {
        setServerError("Registration failed: " + error.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold mb-4 uppercase italic tracking-wider">
            Join the Arena
          </CardTitle>

          <CardDescription className="mb-6">
            Create your account to start booking top-tier sports venues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            method="POST"
            action={"#"}
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
                      className={"cursor-pointer "}
                    >
                      {passwordVisible ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </Button>
                  }
                />
              )}
            </form.Field>

            {serverError && (
              <Alert variant="destructive">
                <AlertTitle className="text-red-600">Error</AlertTitle>
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <FormSubmitBtn isPending={isSubmitting} disabled={!canSubmit}>
                  Register Now
                </FormSubmitBtn>
              )}
            </form.Subscribe>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 uppercase italic tracking-tighter">
                Or join with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mb-2 uppercase font-black italic tracking-widest hover:bg-primary/10 transition-all border-primary/20"
            onClick={() => {
              const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
              window.location.href = `${baseUrl}/api/v1/auth/login/social/google`;
            }}
          >
            Google Arena
          </Button>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-center w-full text-muted-foreground">
            Already a member?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-bold hover:underline underline-offset-4"
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
