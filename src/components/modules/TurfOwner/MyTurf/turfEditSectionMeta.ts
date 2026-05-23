export type TurfEditSectionId =
  | "basic"
  | "pricing"
  | "schedule"
  | "contact"
  | "sports"
  | "status"
  | "images";

export const TURF_EDIT_SECTION_META: Record<
  TurfEditSectionId,
  { title: string; description: string }
> = {
  basic: {
    title: "Basic Information",
    description: "Update venue name, address, and description.",
  },
  pricing: {
    title: "Pricing",
    description: "Set your hourly booking rate.",
  },
  schedule: {
    title: "Schedule",
    description: "Operating hours, weekly off days, and 24/7 mode.",
  },
  contact: {
    title: "Contact",
    description: "Phone numbers and email for players to reach you.",
  },
  sports: {
    title: "Sports Types",
    description: "Categories that describe what can be played at your venue.",
  },
  status: {
    title: "Venue Status",
    description: "Operational status and maintenance details when applicable.",
  },
  images: {
    title: "Gallery Images",
    description: "Upload or remove venue photos.",
  },
};
