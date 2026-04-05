import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type AppubmitBtnProps = {
  isPending: boolean;
  children: React.ReactNode;
  pendingLabel: string;
  className?: string;
  disabled?: boolean;
};

const FormSubmitBtn = ({
  isPending,
  children,
  pendingLabel,
  className,
  disabled,
}: AppubmitBtnProps) => {
    const isDisabled = disabled || isPending;

    return (
        <Button
            type="submit"
            disabled={isDisabled}
            className={cn("w-full", className)}
        >
            {isPending ? (
                <>
                    <Loader2 className="animate-spin mr-2" aria-hidden="true"/>
                    {pendingLabel ? pendingLabel : children}
                </>
            ) : children}
      </Button>
  );
};

export default FormSubmitBtn;
