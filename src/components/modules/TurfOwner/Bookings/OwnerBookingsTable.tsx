"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getTurfBookings } from "@/services/booking.services";
import { ownerBookingsColumns, IBooking } from "./ownerBookingsColumns";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { DataTableFilterConfig } from "@/components/shared/table/DataTableFilters";

interface OwnerBookingsTableProps {
    turfId: string;
}

const OwnerBookingsTable = ({ turfId }: OwnerBookingsTableProps) => {
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
        queryKey: ["owner-bookings", turfId, queryString],
        queryFn: () => getTurfBookings(turfId, queryString),
        enabled: !!turfId,
    });

    const bookings = (bookingsResponse?.data ?? []) as IBooking[];
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
        <DataTable
            data={bookings}
            columns={ownerBookingsColumns}
            isLoading={isLoading || isFetching}
            emptyMessage="No bookings found for your turf."
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
                placeholder: "Search by player name or email...",
                onDebouncedChange: setSearchTerm,
            }}
            filters={{
                configs: filterConfigs,
                values: filters,
                onFilterChange: (id, value) => {
                    setFilters((prev) => ({ ...prev, [id]: value }));
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                },
                onClearAll: () => setFilters({}),
            }}
        />
    );
};

export default OwnerBookingsTable;
