"use client";
import { queryKeys } from "@/lib/queryKeys";
import { getHeroState } from "@/services/heroState.services";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Star, Users } from "lucide-react";

type HeroStateType = {
  totalUsers: number;
  totalTurfs: number;
  bookings: {
    completed: number;
  };
};

export default function HeroState() {
  const { data: HeroState } = useQuery<HeroStateType>({
    queryKey: [queryKeys.heroState],
    queryFn: async () => {
      const response = await getHeroState();
      return (response as { data: HeroStateType }).data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="pt-20 grid grid-cols-2 md:grid-cols-3 gap-12 border-t border-white/20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
      <div className="flex flex-col items-center gap-2 group">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
          <span className="text-3xl font-black italic text-white drop-shadow-md">
            {HeroState?.totalUsers || ""}
          </span>
        </div>
        <span className="text-[0.7rem] font-bold text-white/50 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
          Active Players
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 group">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
          <span className="text-3xl font-black italic text-white drop-shadow-md">
            {HeroState?.totalTurfs || ""}
          </span>
        </div>
        <span className="text-[0.7rem] font-bold text-white/50 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
          Verified Turfs
        </span>
      </div>
      <div className="hidden md:flex flex-col items-center gap-2 group">
        <div className="flex items-center gap-3">
          <Star className="h-5 w-5 text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
          <span className="text-3xl font-black italic text-white drop-shadow-md">
            {HeroState?.bookings.completed || ""}
          </span>
        </div>
        <span className="text-[0.7rem] font-bold text-white/50 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
          Successful Bookings
        </span>
      </div>
    </div>
  );
};

