import { Suspense } from "react";
import { getTurfs } from "./_actions";
import BookATurfListing from "@/components/modules/turfs/BookATurfListing";
import { ITurf } from "@/interface/turf.interface";
import { Loader2 } from "lucide-react";

const INITIAL_QUERY =
  "turfStatus=ACTIVE&limit=12&page=1&sortBy=rating&sortOrder=desc";

function ListingFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

async function BookATurfContent() {
  const turfsResult = await getTurfs(INITIAL_QUERY);

  const turfs = (turfsResult?.data ?? []) as ITurf[];

  return (
    <BookATurfListing
      initialTurfs={turfs}
      initialMeta={turfsResult?.meta}
    />
  );
}

export default function BookATurfPage() {
  return (
    <Suspense fallback={<ListingFallback />}>
      <BookATurfContent />
    </Suspense>
  );
}
