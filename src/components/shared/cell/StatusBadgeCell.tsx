import { Badge } from "@/components/ui/badge";

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
    PENDING = "PENDING"
}

interface IStatusBadgeCellProps {
    status : string;
}

const StatusBadgeCell = ({ status }: IStatusBadgeCellProps) => {
  const normalizedStatus = status?.toUpperCase() || "PENDING";
  
  return (
    <Badge
        variant={normalizedStatus === UserStatus.ACTIVE ? "default" : normalizedStatus === UserStatus.BLOCKED ? "destructive" : "secondary"}
        className="px-2 py-0.5"
    >
        <span className="text-xs font-semibold capitalize">{status?.toLowerCase() || "pending"}</span>
    </Badge>
  )
}

export default StatusBadgeCell
