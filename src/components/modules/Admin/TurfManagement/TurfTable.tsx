"use client";

import DataTable from "@/components/shared/table/DataTable";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getAllTurfs } from "@/services/admin.services";
import { ITurfListItem, turfColumns } from "./turfColumns";
import { toast } from "sonner";
import { DataTableFilterConfig } from "@/components/shared/table/DataTableFilters";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const TURF_FILTER_DEFINITIONS = [
  serverManagedFilter.single("turfStatus"),
];

const TurfTable = () => {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    
    const {
      viewingItem,
      isViewDialogOpen,
      onViewOpenChange,
      tableActions,
    } = useRowActionModalState<ITurfListItem>({
        enableEdit: false,
        enableDelete: false,
    });

    const {
      queryStringFromUrl,
      optimisticSortingState,
      optimisticPaginationState,
      isRouteRefreshPending,
      updateParams,
      handleSortingChange,
      handlePaginationChange,
    } = useServerManagedDataTable({
      searchParams,
      defaultPage: DEFAULT_PAGE,
      defaultLimit: DEFAULT_LIMIT,
    });

    const {
      searchTermFromUrl,
      handleDebouncedSearchChange,
    } = useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

    const {
      filterValues,
      handleFilterChange,
      clearAllFilters,
    } = useServerManagedDataTableFilters({
      searchParams,
      definitions: TURF_FILTER_DEFINITIONS,
      updateParams,
    });

    const { data : turfsResponse, isLoading, isFetching } = useQuery({
      queryKey: ["admin-turfs", queryStringFromUrl],
      queryFn: () => getAllTurfs(queryStringFromUrl)
    });

    const turfs = turfsResponse?.data ?? [];
    const meta = turfsResponse?.meta;

    const filterConfigs: DataTableFilterConfig[] = useMemo(() => {
      return [
        {
          id: "turfStatus",
          label: "Status",
          type: "single-select",
          options: [
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
            { label: "Maintenance", value: "MAINTENANCE" },
          ],
        },
      ];
    }, []);

    return (
      <>
        <DataTable
          data={turfs}
          columns={turfColumns}
          isLoading={isLoading || isFetching || isRouteRefreshPending}
          emptyMessage="No turfs found."
          sorting={{
            state: optimisticSortingState,
            onSortingChange: handleSortingChange,
          }}
          pagination={{
            state: optimisticPaginationState,
            onPaginationChange: handlePaginationChange,
          }}
          search={{
            initialValue: searchTermFromUrl,
            placeholder: "Search turf by name, address...",
            debounceMs: 700,
            onDebouncedChange: handleDebouncedSearchChange,
          }}
          filters={{
            configs: filterConfigs,
            values: filterValues,
            onFilterChange: handleFilterChange,
            onClearAll: clearAllFilters,
          }}
          meta={meta}
          actions={tableActions}
        />
        
        {/* View Details Dialog Placeholder - Can be expanded with specialized view component */}
        {isViewDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => onViewOpenChange(false)}>
                <div className="bg-white p-6 rounded-lg max-w-lg w-full" onClick={e => e.stopPropagation()}>
                    <h2 className="text-xl font-bold mb-4">{viewingItem?.name} Details</h2>
                    <div className="space-y-2">
                        <p><strong>Address:</strong> {viewingItem?.address}</p>
                        <p><strong>Owner:</strong> {viewingItem?.owner?.name}</p>
                        <p><strong>Hourly Rate:</strong> ${viewingItem?.hourlyRate}</p>
                        <p><strong>Status:</strong> {viewingItem?.turfStatus}</p>
                    </div>
                    <button onClick={() => onViewOpenChange(false)} className="mt-6 w-full bg-primary text-primary-foreground py-2 rounded-md">Close</button>
                </div>
            </div>
        )}
      </>
    )

}
export default TurfTable
