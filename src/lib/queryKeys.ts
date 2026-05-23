export const queryKeys = {
  playerBookings: (queryString = "") => ["player-bookings", queryString] as const,
  playerReviews: (queryString = "") => ["player-reviews", queryString] as const,
  playerNotifications: (queryString = "") => ["notifications", queryString] as const,
  users: (queryString = "") => ["users", queryString] as const,
  ownerBookings: (queryString = "") => ["owner-bookings", queryString] as const,
  turfAvailability: (turfId: string, date: string) =>
    ["turf-availability", turfId, date] as const,
};
