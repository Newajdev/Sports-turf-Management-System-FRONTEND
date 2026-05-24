export interface IAdminAnalytics {
  revenue: number;
  users: {
    players: number;
    owners: number;
    total: number;
  };
  turfs: {
    total: number;
  };
  bookings: Record<string, number>;
}

export interface IOwnerAnalytics {
  revenue: number;
  totalBookings: number;
  averageRating: number;
  turfCount: number;
}

export interface IPlayerAnalytics {
  totalBookings: number;
  upcomingBookings: number;
  totalSpent: number;
  recentBookings: Array<{
    id: string;
    status: string;
    date: string;
    turf?: { name: string };
    turfSlot?: { slot?: { startTime: string } };
    customSlot?: { startTime: string };
  }>;
}
