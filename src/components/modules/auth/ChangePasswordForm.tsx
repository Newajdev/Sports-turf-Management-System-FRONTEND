/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChangePasswordAction } from "@/app/(commonLayout)/(authRoutes)/auth/change-password/_action";
import AppField from "@/components/shared/form/AppField";
import FormSubmitBtn from "@/components/shared/form/FormSubmitBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { changePasswordZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { z } from "zod";

interface ChangePasswordFormProps {
  email?: string;
  title?: string;
  description?: string;
  showBackground?: boolean;
}

const ChangePasswordForm = ({ 
    email, 
    title = "Update Password", 
    description = "Ensure your account is secure with a strong password.",
    showBackground = true 
}: ChangePasswordFormProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: (payload: any) => ChangePasswordAction(payload),
  });

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onChange: z.object({
        currentPassword: changePasswordZodSchema.shape.currentPassword,
        newPassword: changePasswordZodSchema.shape.newPassword,
        confirmPassword: z.string().min(1, "Please confirm your new password"),
      }).refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }),
    },
    onSubmit: async ({ value }) => {
      try {
        const payload = {
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        };
        const result = (await mutateAsync(payload)) as any;
        if (result && !result.success) {
          toast.error(result.message || "Failed to change password");
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
    <div className={cn(
        showBackground && "flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-background via-muted to-background"
    )}>
      <Card className={cn(
        "w-full max-w-md border-none shadow-2xl",
        showBackground ? "bg-white/10 backdrop-blur-md" : "bg-background/50 backdrop-blur-sm mx-auto"
      )}>
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Lock className="size-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {description} {email && <>for {email}</>}
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
            className="space-y-5"
          >
            <form.Field name="currentPassword">
              {(field) => (
                <AppField
                  field={field}
                  label="Current Password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  append={
                    <Button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10"
                    >
                      {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </Button>
                  }
                />
              )}
            </form.Field>

            <form.Field name="newPassword">
              {(field) => (
                <AppField
                  field={field}
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="At least 6 characters (1 letter, 1 number)"
                  append={
                    <Button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10"
                    >
                      {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </Button>
                  }
                />
              )}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => (
                <AppField
                  field={field}
                  label="Confirm New Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-type new password"
                  append={
                    <Button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10"
                    >
                      {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
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
                  Update Password
                </FormSubmitBtn>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;
