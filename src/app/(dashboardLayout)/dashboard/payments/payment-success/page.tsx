import { Suspense } from "react";
import { PaymentSuccessContent } from "@/components/modules/dashboard/PaymentSuccessContent";
import { Loader2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading payment confirmation...
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
