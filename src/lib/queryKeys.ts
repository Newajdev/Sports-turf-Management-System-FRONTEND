export const queryKeys = {
  playerAnalytics: () => ["player-analytics"] as const,
  playerBookings: (queryString = "") => ["player-bookings", queryString] as const,
  playerReviews: (queryString = "") => ["player-reviews", queryString] as const,
  playerReports: (queryString = "") => ["player-reports", queryString] as const,
  playerFavorites: () => ["player-favorites"] as const,
  playerCustomSlots: (queryString = "") => ["player-custom-slots", queryString] as const,
  turfReviews: (turfId: string, queryString = "") =>
    ["turf-reviews", turfId, queryString] as const,
  playerNotifications: (queryString = "") => ["notifications", queryString] as const,
  users: (queryString = "") => ["users", queryString] as const,
  ownerBookings: (queryString = "") => ["owner-bookings", queryString] as const,
  turfAvailability: (turfId: string, date: string) =>
    ["turf-availability", turfId, date] as const,
  publicTurfs: (queryString = "") => ["public-turfs", queryString] as const,
  sportTypes: () => ["sport-types"] as const,
};
