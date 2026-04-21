"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/services/review.services";
import { playerReviewsColumns } from "./playerReviewsColumns";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";

const PlayerReviewsTable = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    
    const [sorting, setSorting] = useState<SortingState>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const queryString = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(),
        limit: pagination.pageSize.toString(),
        searchTerm: searchTerm,
    }).toString();

    const { data: reviewsResponse, isLoading, isFetching } = useQuery({
        queryKey: ["player-reviews", queryString],
        queryFn: () => getMyReviews(queryString),
    });

    const reviews = reviewsResponse?.data ?? [];
    const meta = reviewsResponse?.meta;

    return (
        <DataTable
            data={reviews}
            columns={playerReviewsColumns}
            isLoading={isLoading || isFetching}
            emptyMessage="You haven't shared any reviews yet."
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
                placeholder: "Search reviews...",
                onDebouncedChange: setSearchTerm,
            }}
        />
    );
};

export default PlayerReviewsTable;
