"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "@/services/booking.services";
import { playerBookingsColumns, IBooking } from "./playerBookingsColumns";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { DataTableFilterConfig } from "@/components/shared/table/DataTableFilters";

const PlayerBookingsTable = () => {
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
        queryKey: ["player-bookings", queryString],
        queryFn: () => getMyBookings(queryString),
    });

    const bookings = ((bookingsResponse?.data ?? []) as Array<
        IBooking & {
            payment?: { status?: IBooking["paymentStatus"] };
            review?: { id: string };
        }
    >).map((booking) => ({
        ...booking,
        paymentStatus: booking.paymentStatus ?? booking.payment?.status,
        review: booking.review,
    }));
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
                { label: "Completed", value: "COMPLETED" },
            ],
        },
    ];

    return (
        <DataTable
            data={bookings}
            columns={playerBookingsColumns}
            isLoading={isLoading || isFetching}
            emptyMessage="You haven't made any bookings yet. Browse turfs to book your first slot."
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
                placeholder: "Search by turf name...",
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

export default PlayerBookingsTable;
