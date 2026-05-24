"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReport, getAllReports } from "@/services/admin.services";
import DataTable from "@/components/shared/table/DataTable";
import { getReportColumns } from "./reportColumns";
import { toast } from "sonner";
import { useState } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

const ReportsTable = () => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: reportsResponse, isLoading } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: () => getAllReports(),
  });

  const { mutate: resolveReport, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteReport(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Report resolved successfully");
        queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
      } else {
        toast.error(res.message || "Failed to resolve report");
      }
      setDeleteId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
      setDeleteId(null);
    },
  });

  const columns = getReportColumns({
    onDelete: (id: string) => setDeleteId(id),
  });

  return (
    <>
      {isLoading ? (
        <TableSkeleton columns={5} rows={5} />
      ) : (
        <DataTable
          columns={columns}
          data={reportsResponse?.data || []}
          emptyMessage="No reports found."
          search={{
            placeholder: "Search reports by description...",
            onDebouncedChange: (value) => {
              // Logic for searching reports if needed, 
              // but for now we'll just satisfy the type
              console.log("Searching reports:", value);
            }
          }}
        />
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently resolve and remove this report from the system. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId && resolveReport(deleteId)}
              disabled={isDeleting}
            >
              {isDeleting ? "Resolving..." : "Confirm Resolve"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ReportsTable;
