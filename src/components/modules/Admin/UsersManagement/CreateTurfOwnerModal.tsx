/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTurfOwner } from "@/services/admin.services";
import { createTurfOwnerZodSchema } from "@/zod/auth.validation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AppField from "@/components/shared/form/AppField";
import FormSubmitBtn from "@/components/shared/form/FormSubmitBtn";
import { PlusCircle, UserPlus } from "lucide-react";
import { useState } from "react";

const CreateTurfOwnerModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTurfOwner,
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Turf Owner created successfully! An email has been sent to them.");
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setOpen(false);
        form.reset();
      } else {
        toast.error(res.message);
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      contactNumber: "",
    },
    validators: {
      onChange: createTurfOwnerZodSchema as any,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 shadow-premium hover:shadow-premium-hover transition-all bg-primary hover:bg-primary/90">
          <PlusCircle className="size-4" />
          <span>Add Turf Owner</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-none shadow-2xl p-8">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <UserPlus className="size-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-center">Onboard Turf Owner</DialogTitle>
          <DialogDescription className="text-center">
            Create a new partner account. They will be required to change their password upon first login.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-4"
        >
          <form.Field name="name">
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                placeholder="John Doe"
              />
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <AppField
                field={field}
                label="Email Address"
                type="email"
                placeholder="john@example.com"
              />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <AppField
                field={field}
                label="Temporary Password"
                type="password"
                placeholder="Minimum 6 characters"
              />
            )}
          </form.Field>

          <form.Field name="contactNumber">
            {(field) => (
              <AppField
                field={field}
                label="Contact Number (Optional)"
                placeholder="+880123456789"
              />
            )}
          </form.Field>

          <div>
            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <FormSubmitBtn
                  isPending={isPending || isSubmitting}
                  disabled={!canSubmit}
                  className="py-6 font-semibold"
                >
                  Create Account
                </FormSubmitBtn>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTurfOwnerModal;
