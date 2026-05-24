"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "@/services/admin.services";
import { bookingsColumns } from "./bookingsColumns";
import { useState } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { DataTableFilterConfig } from "@/components/shared/table/DataTableFilters";

const BookingsTable = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    
    const [sorting, setSorting] = useState<SortingState>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<Record<string, any>>({});

    const queryString = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        searchTerm: searchTerm,
        ...filters,
    }).toString();

    const { data: bookingsResponse, isLoading, isFetching } = useQuery({
        queryKey: ["admin-bookings", queryString],
        queryFn: () => getAllBookings(queryString),
    });

    const bookings = bookingsResponse?.data ?? [];
    const meta = bookingsResponse?.meta;

    const filterConfigs: DataTableFilterConfig[] = [
        {
            id: "status",
            label: "Status",
            type: "single-select",
            options: [
                { label: "Pending", value: "PENDING" },
                { label: "Confirmed", value: "CONFIRMED" },
                { label: "Cancelled", value: "CANCELLED" },
                { label: "Rejected", value: "REJECTED" },
            ],
        },
    ];

    return (
      <>
        {isLoading || isFetching ? (
          <TableSkeleton columns={5} rows={5} />
        ) : (
          <DataTable
            data={bookings}
            columns={bookingsColumns}
            emptyMessage="No bookings found."
            meta={meta}
            pagination={{
              state: pagination,
              onPaginationChange: setPagination,
            }}
            sorting={{
              state: sorting,
              onSortingChange: setSorting,
            }}
            search={{
              placeholder: "Search by turf or player...",
              onDebouncedChange: setSearchTerm,
            }}
            filters={{
              configs: filterConfigs,
              values: filters,
              onFilterChange: (id, value) => {
                setFilters((prev) => ({ ...prev, [id]: value }));
                setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page
              },
              onClearAll: () => setFilters({}),
            }}
          />
        )}
      </>
    );
};

export default BookingsTable;
