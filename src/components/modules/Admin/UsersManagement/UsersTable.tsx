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
import { getAllUsers, blockUser } from "@/services/admin.services";
import { userColumns, IUser } from "./userColumns";
import { toast } from "sonner";
import { DataTableFilterConfig } from "@/components/shared/table/DataTableFilters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const USER_FILTER_DEFINITIONS = [
  serverManagedFilter.single("role"),
  serverManagedFilter.single("userStatus"),
];

const UsersTable = () => {
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    
    const {
      deletingItem,
      isDeleteDialogOpen,
      onDeleteOpenChange,
      tableActions,
    } = useRowActionModalState<IUser>({
        enableEdit: false,
        enableView: false,
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
      definitions: USER_FILTER_DEFINITIONS,
      updateParams,
    });

    const { data : usersResponse, isLoading, isFetching } = useQuery({
      queryKey: ["users", queryStringFromUrl],
      queryFn: () => getAllUsers(queryStringFromUrl)
    });

    const users = usersResponse?.data ?? [];
    const meta = usersResponse?.meta;

    const filterConfigs: DataTableFilterConfig[] = useMemo(() => {
      return [
        {
          id: "role",
          label: "Role",
          type: "single-select",
          options: [
            { label: "Player", value: "PLAYER" },
            { label: "Turf Owner", value: "TURF_OWNER" },
          ],
        },
        {
          id: "userStatus",
          label: "Status",
          type: "single-select",
          options: [
            { label: "Active", value: "ACTIVE" },
            { label: "Blocked", value: "BLOCKED" },
            { label: "Inactive", value: "INACTIVE" },
          ],
        },
      ];
    }, []);

    const { mutate: toggleBlock, isPending: isBlocking } = useMutation({
        mutationFn: ({ id, status }: { id: string; status: "BLOCKED" | "ACTIVE" }) => blockUser(id, status === "BLOCKED"),
        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ["users"] });
                onDeleteOpenChange(false);
            } else {
                toast.error(res.message);
            }
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to update user status");
        }
    });

    return (
      <>
        <DataTable
          data={users}
          columns={userColumns}
          isLoading={isLoading || isFetching || isRouteRefreshPending}
          emptyMessage="No users found."
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
            placeholder: "Search user by name, email...",
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
          actions={{
            ...tableActions,
            onDelete: (user) => tableActions.onDelete?.(user), // Overriding delete to be "Block/Unblock"
          }}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={onDeleteOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {deletingItem?.userStatus === "BLOCKED" ? "Unblock User" : "Block User"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to {deletingItem?.userStatus === "BLOCKED" ? "unblock" : "block"} <strong>{deletingItem?.name}</strong>? 
                        {deletingItem?.userStatus !== "BLOCKED" && " This will prevent them from logging into the platform."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isBlocking}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        disabled={isBlocking}
                        onClick={() => toggleBlock({ 
                            id: deletingItem?.id!, 
                            status: deletingItem?.userStatus === "BLOCKED" ? "ACTIVE" : "BLOCKED" 
                        })}
                        className={deletingItem?.userStatus === "BLOCKED" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-destructive hover:bg-destructive/90"}
                    >
                        {isBlocking ? "Processing..." : deletingItem?.userStatus === "BLOCKED" ? "Unblock" : "Block"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </>
    )

}
export default UsersTable
