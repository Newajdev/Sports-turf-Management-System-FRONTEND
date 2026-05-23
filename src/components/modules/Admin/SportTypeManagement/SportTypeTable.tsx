/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllSportTypes, deleteSportType } from "@/services/admin.services";
import { sportTypeColumns, ISportType } from "./sportTypeColumns";
import { toast } from "sonner";
import CreateSportTypeModal from "./CreateSportTypeModal";
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

const SportTypeTable = () => {
    const queryClient = useQueryClient();
    
    const {
      deletingItem,
      isDeleteDialogOpen,
      onDeleteOpenChange,
      tableActions,
    } = useRowActionModalState<ISportType>({
        enableEdit: false,
        enableView: false,
    });

    const { data : sportTypesResponse, isLoading, isFetching } = useQuery({
      queryKey: ["admin-sport-types"],
      queryFn: getAllSportTypes
    });

    const sportTypes = sportTypesResponse?.data ?? [];

    const { mutate: handleDelete, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => deleteSportType(id),
        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message);
                queryClient.invalidateQueries({ queryKey: ["admin-sport-types"] });
                onDeleteOpenChange(false);
            } else {
                toast.error(res.message);
            }
        },
        onError: (err: any) => {
            toast.error(err.message || "Failed to delete sport type");
        }
    });

    return (
      <>
        <DataTable
          data={sportTypes}
          columns={sportTypeColumns}
          isLoading={isLoading || isFetching}
          emptyMessage="No sport types found."
          toolbarAction={<CreateSportTypeModal />}
          actions={tableActions}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={onDeleteOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Sport Type</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <strong>{deletingItem?.title}</strong>? 
                        This action cannot be undone and may affect turfs categorized under this sport type.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        disabled={isDeleting}
                        onClick={() => handleDelete(deletingItem?.id!)}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </>
    )

}
export default SportTypeTable
