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
