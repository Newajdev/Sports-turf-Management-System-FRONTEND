import { NavSection } from "@/types/dashboard.type";
import { defaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = defaultDashboardRoute(role);
  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          title: "My Profile",
          href: "/profile",
          icon: "User",
        },
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Key",
        },
      ],
    },
  ];
};

export const adminNavItems: NavSection[] = [
  {
    title: "System Management",
    items: [
      {
        title: "Users",
        href: "/admin/dashboard/users-management",
        icon: "Users",
      },
      {
        title: "Turfs",
        href: "/admin/dashboard/turf-management",
        icon: "MapPin",
      },
      {
        title: "Sport Types",
        href: "/admin/dashboard/sport-types-management",
        icon: "Trophy",
      },
      {
        title: "Bookings",
        href: "/admin/dashboard/bookings-management",
        icon: "CalendarCheck",
      },
      {
        title: "Master Slots",
        href: "/admin/dashboard/master-slots-management",
        icon: "Clock",
      },
      {
        title: "Reports",
        href: "/admin/dashboard/reports-management",
        icon: "Flag",
      },
      {
        title: "Reviews",
        href: "/admin/dashboard/reviews-management",
        icon: "MessageSquare",
      },
    ],
  },
];

export const ownerNavItems: NavSection[] = [
  {
    title: "Turf Management",
    items: [
      {
        title: "My Turf",
        href: "/turf-owner/dashboard/my-turf",
        icon: "Map",
      },
      {
        title: "Availability",
        href: "/turf-owner/dashboard/slots",
        icon: "Clock",
      },
      {
        title: "Bookings",
        href: "/turf-owner/dashboard/bookings",
        icon: "Calendar",
      },
    ],
  },
];

export const playerNavItems: NavSection[] = [
  {
    title: "My Activity",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/bookings",
        icon: "Calendar",
      },
      {
        title: "Custom Slot Requests",
        href: "/dashboard/custom-slots",
        icon: "Clock",
      },
      {
        title: "Saved Turfs",
        href: "/dashboard/favorites",
        icon: "Heart",
      },
      {
        title: "My Reviews",
        href: "/dashboard/reviews",
        icon: "MessageSquare",
      },
      {
        title: "My Reports",
        href: "/dashboard/reports",
        icon: "Flag",
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: "Bell",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SYSTEM_ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "TURF_OWNER":
      return [...commonNavItems, ...ownerNavItems];
    case "PLAYER":
      return [...commonNavItems, ...playerNavItems];
    default:
      return commonNavItems;
  }
};
