export interface SportType {
  id: string;
  title: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MasterSlot {
  id: string;
  slotType: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface TurfSlot {
  id: string;
  price: string;
  isBooking: boolean;
  turfId: string;
  slotId: string;
  slot: MasterSlot;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
}

export interface TurfItem {
  id: string;
  name: string;
  images: string[];
  address: string;
  contactNumber: string[];
  emailAddress: string | null;
  description: string | null;
  openingTime: string;
  closingTime: string;
  hourlyRate: string;
  sportTypes: SportType[];
  rating: string | number;
  reviewCount: number;
  turfStatus: string;
  owner?: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
  };
  turfSlots?: TurfSlot[];
  reviews?: Review[];
}