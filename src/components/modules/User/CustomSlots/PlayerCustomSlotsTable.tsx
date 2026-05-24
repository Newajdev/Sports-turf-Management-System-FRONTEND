"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getAllMyCustomSlots } from "@/services/slot.services";
import { playerCustomSlotsColumns, ICustomSlot } from "./playerCustomSlotsColumns";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { queryKeys } from "@/lib/queryKeys";

const PlayerCustomSlotsTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const queryString = new URLSearchParams({
    page: (pagination.pageIndex + 1).toString(),
    limit: pagination.pageSize.toString(),
    searchTerm,
  }).toString();

  const { data: response, isLoading, isFetching } = useQuery({
    queryKey: queryKeys.playerCustomSlots(queryString),
    queryFn: () => getAllMyCustomSlots(queryString),
  });

  const slots = (response?.data ?? []) as ICustomSlot[];
  const meta = response?.meta;

  return (
    <DataTable
      data={slots}
      columns={playerCustomSlotsColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="You haven't submitted any custom slot requests yet."
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
        placeholder: "Search by sport...",
        onDebouncedChange: setSearchTerm,
      }}
    />
  );
};

export default PlayerCustomSlotsTable;
