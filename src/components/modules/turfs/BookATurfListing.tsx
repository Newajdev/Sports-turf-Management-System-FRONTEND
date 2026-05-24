"use client";

import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  Loader2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import PageHeroSection from "@/components/shared/page-hero-section";
import TurfCard from "@/components/modules/turfs/turf-card";
import DataTableSearch from "@/components/shared/table/DataTableSearch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getTurfs, getSportTypes } from "@/app/(commonLayout)/book-a-turf/_actions";
import { queryKeys } from "@/lib/queryKeys";
import { ITurf } from "@/interface/turf.interface";
import { ISportType } from "@/interface/sport-type.interface";
import type { ApiResponse } from "@/types/api.type";

const PAGE_SIZE = 12;

function buildQueryString(params: {
  page: number;
  searchTerm: string;
  sportTypeId: string;
  sortBy: string;
  sortOrder: string;
}) {
  const qs = new URLSearchParams();
  qs.set("turfStatus", "ACTIVE");
  qs.set("limit", String(PAGE_SIZE));
  qs.set("page", String(params.page));
  qs.set("sortBy", params.sortBy);
  qs.set("sortOrder", params.sortOrder);
  if (params.searchTerm.trim()) qs.set("searchTerm", params.searchTerm.trim());
  if (params.sportTypeId) qs.set("sportTypes.id", params.sportTypeId);
  return qs.toString();
}

/** Keep previous page results when only the page param changes (not search/filters). */
function keepPreviousPageOnly(
  previousData: ApiResponse<ITurf[]> | undefined,
  previousQuery: { queryKey: readonly unknown[] } | undefined,
  currentQueryKey: string,
): ApiResponse<ITurf[]> | undefined {
  if (!previousData || !previousQuery) return undefined;

  const prevKey = String(previousQuery.queryKey[1] ?? "");
  const prevParams = new URLSearchParams(prevKey);
  const currParams = new URLSearchParams(currentQueryKey);
  prevParams.delete("page");
  currParams.delete("page");

  if (prevParams.toString() === currParams.toString()) {
    return previousData;
  }
  return undefined;
}

interface BookATurfListingProps {
  initialTurfs: ITurf[];
  initialMeta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function BookATurfListing({
  initialTurfs,
  initialMeta,
}: BookATurfListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const searchTerm = searchParams.get("searchTerm") || "";
  const sportTypeId = searchParams.get("sportTypeId") || "";
  const sortBy = searchParams.get("sortBy") || "rating";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  const queryString = buildQueryString({
    page,
    searchTerm,
    sportTypeId,
    sortBy,
    sortOrder,
  });

  const hasActiveFilters = Boolean(searchTerm || sportTypeId);

  const updateParams = useCallback(
    (updates: Record<string, string | null>, resetPage = false) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      });
      if (resetPage) params.set("page", "1");

      const next = params.toString();
      router.push(next ? `/book-a-turf?${next}` : "/book-a-turf", { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      const normalized = value.trim();
      const current = (searchParams.get("searchTerm") ?? "").trim();
      if (normalized === current) return;
      updateParams({ searchTerm: normalized || null }, true);
    },
    [searchParams, updateParams],
  );

  const clearAllFilters = useCallback(() => {
    router.push("/book-a-turf", { scroll: false });
  }, [router]);

  const { data: turfsResponse, isLoading, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: queryKeys.publicTurfs(queryString),
      queryFn: () => getTurfs(queryString),
      placeholderData: (previousData, previousQuery) => {
        const kept = keepPreviousPageOnly(previousData, previousQuery, queryString);
        if (kept) return kept;
        if (!previousQuery && initialTurfs.length > 0) {
          return {
            success: true,
            message: "",
            data: initialTurfs,
            meta: initialMeta,
          };
        }
        return undefined;
      },
    });

  const { data: sportTypesResponse } = useQuery({
    queryKey: queryKeys.sportTypes(),
    queryFn: getSportTypes,
  });

  const turfs = (turfsResponse?.data ?? []) as ITurf[];
  const meta = turfsResponse?.meta ?? initialMeta;
  const sportTypes = (sportTypesResponse?.data ?? []) as ISportType[];
  const totalPages = meta?.totalPages ?? 1;
  const total = meta?.total ?? turfs.length;

  const selectedSport = sportTypes.find((s) => s.id === sportTypeId);

  const showFullSkeleton = isLoading && turfs.length === 0;
  const isSearchPending =
    isFetching && (isPlaceholderData || turfs.length === 0);

  const sortLabel = useMemo(() => {
    if (sortBy === "hourlyRate" && sortOrder === "asc") return "Price: Low to High";
    if (sortBy === "hourlyRate" && sortOrder === "desc") return "Price: High to Low";
    if (sortBy === "name") return "Name A–Z";
    return "Top Rated";
  }, [sortBy, sortOrder]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <PageHeroSection
        title="Book a Turf"
        description="Search venues by name, location, or sport — press Enter to search instantly."
        badge="Live Availability"
      />

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 md:p-5 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <DataTableSearch
              initialValue={searchTerm}
              placeholder="Search by turf name, address, or sport..."
              debounceMs={500}
              isLoading={isSearchPending}
              className="flex-1"
              inputClassName="h-11 rounded-xl bg-background"
              onDebouncedChange={handleSearchChange}
            />

            <Select
              value={sportTypeId || "all"}
              onValueChange={(v) =>
                updateParams({ sportTypeId: v === "all" ? null : v }, true)
              }
            >
              <SelectTrigger className="w-full lg:w-[200px] h-11 rounded-xl">
                <SelectValue placeholder="All sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sports</SelectItem>
                {sportTypes.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={(v) => {
                if (!v) return;
                const [field, order] = v.split("-");
                updateParams({ sortBy: field, sortOrder: order });
              }}
            >
              <SelectTrigger className="w-full lg:w-[200px] h-11 rounded-xl">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue>{sortLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating-desc">Top Rated</SelectItem>
                <SelectItem value="hourlyRate-asc">Price: Low to High</SelectItem>
                <SelectItem value="hourlyRate-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name A–Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Active filters
              </span>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1 pr-1 font-normal">
                  Search: &quot;{searchTerm}&quot;
                  <button
                    type="button"
                    className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    aria-label="Clear search"
                    onClick={() => updateParams({ searchTerm: null }, true)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedSport && (
                <Badge variant="secondary" className="gap-1 pr-1 font-normal">
                  Sport: {selectedSport.title}
                  <button
                    type="button"
                    className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    aria-label="Clear sport filter"
                    onClick={() => updateParams({ sportTypeId: null }, true)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground gap-2 flex-wrap">
            <span>
              {isSearchPending ? (
                <span className="flex items-center gap-1.5 text-primary">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Searching...
                </span>
              ) : (
                <>
                  <span className="font-medium text-foreground">{total}</span> venue
                  {total !== 1 ? "s" : ""} found
                  {searchTerm && (
                    <span>
                      {" "}
                      for &quot;<span className="text-foreground">{searchTerm}</span>&quot;
                    </span>
                  )}
                </>
              )}
            </span>
            {!isSearchPending && totalPages > 1 && (
              <span>
                Page {page} of {totalPages}
              </span>
            )}
          </div>
        </div>

        <div
          className={`mt-10 transition-opacity duration-200 ${
            isSearchPending && turfs.length > 0 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {showFullSkeleton ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/50 overflow-hidden">
                  <Skeleton className="h-52 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : turfs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {turfs.map((turf) => (
                  <TurfCard key={turf.id} turf={turf} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1 || isFetching}
                    onClick={() => updateParams({ page: String(page - 1) })}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages || isFetching}
                    onClick={() => updateParams({ page: String(page + 1) })}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
              <MapPin className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No turfs found</h2>
              <p className="text-muted-foreground max-w-md mb-2">
                {searchTerm
                  ? `No venues match "${searchTerm}". Try a different name, area, or sport.`
                  : "No venues match your current filters."}
              </p>
              <p className="text-sm text-muted-foreground/80 mb-6">
                Tip: search works across turf name, address, and sport type.
              </p>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
