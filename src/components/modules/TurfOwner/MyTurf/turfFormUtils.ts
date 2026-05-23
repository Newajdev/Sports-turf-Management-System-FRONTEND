import { TurfStatus, WeeklyOffDay } from "@/interface/enum.interface";

export const WEEKLY_OFF_DAY_OPTIONS = Object.values(WeeklyOffDay);

export const TURF_STATUS_OPTIONS = Object.values(TurfStatus);

export type TurfCreatePayload = {
  name: string;
  address: string;
  openingTime: string;
  closingTime: string;
  hourlyRate: number;
  description?: string;
  images?: string[];
  contactNumber?: string[];
  emailAddress?: string | null;
  weeklyOffDays?: WeeklyOffDay[];
  isAlwaysOpen?: boolean;
  sportsTypes?: string[];
};

export type TurfUpdatePayload = Partial<TurfCreatePayload> & {
  turfStatus?: TurfStatus;
  maintenanceDetails?: {
    startDateTime: string;
    endDateTime: string;
    notice: string;
  };
};

export function turfToFormDefaults(turf: {
  name?: string;
  address?: string;
  description?: string | null;
  hourlyRate?: string | number;
  openingTime?: string;
  closingTime?: string;
  contactNumber?: string[];
  emailAddress?: string | null;
  weeklyOffDays?: WeeklyOffDay[];
  isAlwaysOpen?: boolean;
  turfStatus?: TurfStatus;
  sportTypes?: { id: string }[];
}) {
  return {
    name: turf.name ?? "",
    address: turf.address ?? "",
    description: turf.description ?? "",
    hourlyRate: turf.hourlyRate ? Number(turf.hourlyRate) : 0,
    openingTime: turf.openingTime ?? "08:00",
    closingTime: turf.closingTime ?? "22:00",
    contactNumbers:
      turf.contactNumber?.length ? [...turf.contactNumber] : [""],
    emailAddress: turf.emailAddress ?? "",
    weeklyOffDays: turf.weeklyOffDays ?? [],
    isAlwaysOpen: turf.isAlwaysOpen ?? false,
    turfStatus: turf.turfStatus ?? TurfStatus.ACTIVE,
    sportsTypes: turf.sportTypes?.map((s) => s.id) ?? [],
  };
}
