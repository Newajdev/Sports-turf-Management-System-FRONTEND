import { getTurfs } from "./_actions";
import TurfPage from "@/components/modules/turfs/turfPage";
import { ITurf } from "@/interface/turf.interface";

export default async function BookATurfPage() {
  const result = await getTurfs();
  const turfs = (result?.data ?? []) as ITurf[];

  return <TurfPage turfs={turfs} />;
}
