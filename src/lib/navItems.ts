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
          title: "Change Password",
          href: "/change-password",
          icon: "Settings",
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
          title: "Favorites",
          href: "/dashboard/favorites",
          icon: "Heart"
      }
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
