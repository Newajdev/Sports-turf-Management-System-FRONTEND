import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getTurfs } from "./_actions";
import TurfPage from "@/components/modules/turfs/turfPage";

export default async function BookATurfPage() {
  const queryClient = new QueryClient();

  const { data: turfs } = await queryClient.fetchQuery({
    queryKey: ["turfs"],
    queryFn: getTurfs,
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TurfPage />
    </HydrationBoundary>
  );
}
