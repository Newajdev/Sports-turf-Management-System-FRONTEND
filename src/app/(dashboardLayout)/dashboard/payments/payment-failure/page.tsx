import { Suspense } from "react";
import { PaymentFailureContent } from "@/components/modules/dashboard/PaymentFailureContent";
import { Loader2 } from "lucide-react";

export default function PaymentFailurePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading...
        </div>
      }
    >
      <PaymentFailureContent />
    </Suspense>
  );
}
