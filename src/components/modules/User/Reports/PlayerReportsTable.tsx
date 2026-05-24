"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getMyReports } from "@/services/report.services";
import { playerReportsColumns, IPlayerReport } from "./playerReportsColumns";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { queryKeys } from "@/lib/queryKeys";

const PlayerReportsTable = () => {
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

  const { data: reportsResponse, isLoading, isFetching } = useQuery({
    queryKey: queryKeys.playerReports(queryString),
    queryFn: () => getMyReports(queryString),
  });

  const reports = (reportsResponse?.data ?? []) as IPlayerReport[];
  const meta = reportsResponse?.meta;

  return (
    <DataTable
      data={reports}
      columns={playerReportsColumns}
      isLoading={isLoading || isFetching}
      emptyMessage="You haven't submitted any turf reports yet."
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
        placeholder: "Search reports...",
        onDebouncedChange: setSearchTerm,
      }}
    />
  );
};

export default PlayerReportsTable;
