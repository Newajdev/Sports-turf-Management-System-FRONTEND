"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getApiErrorMessage } from "@/lib/apiError";
import {
  IBookingPaymentResult,
  ICreateBookingPayload,
} from "@/interface/booking.interface";
import { revalidatePath } from "next/cache";

/**
 * Player: Create a regular booking (with Stripe payment)
 */
export async function createBooking(payload: ICreateBookingPayload) {
  try {
    const response = await httpClient.post<IBookingPaymentResult>(
      "/booking",
      payload,
    );
    revalidatePath("/dashboard/bookings");
    return response;
  } catch (error: unknown) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred while creating booking."),
      data: null,
    };
  }
}

/**
 * Player: Create a custom slot booking (PENDING state)
 */
export async function createCustomBooking(payload: ICreateBookingPayload) {
  try {
    const response = await httpClient.post<IBookingPaymentResult>(
      "/booking/custom",
      payload,
    );
    revalidatePath("/dashboard/bookings");
    return response;
  } catch (error: unknown) {
    console.error("Error creating custom booking:", error);
    return {
      success: false,
      message: getApiErrorMessage(
        error,
        "An error occurred while creating custom booking.",
      ),
      data: null,
    };
  }
}

/**
 * Player: Initiate payment for an approved custom slot booking
 */
export async function makePaymentForCustomSlot(bookingId: string) {
  try {
    const response = await httpClient.post<IBookingPaymentResult>(
      `/booking/payment/${bookingId}`,
      {},
    );
    return response;
  } catch (error: unknown) {
    console.error("Error processing payment for custom slot:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred while processing payment."),
      data: null,
    };
  }
}

/**
 * Player: Get a single booking by id
 */
export async function getBookingById(bookingId: string) {
  try {
    const response = await httpClient.get(`/booking/${bookingId}`);
    return response;
  } catch (error: unknown) {
    console.error("Error fetching booking:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred while fetching booking."),
      data: null,
    };
  }
}

/**
 * Player: Retrieve current player's bookings
 */
export async function getMyBookings(queryString: string = "") {
  try {
    const response = await httpClient.get(`/booking/my-bookings?${queryString}`);
    return response;
  } catch (error: unknown) {
    console.error("Error fetching my bookings:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred while fetching your bookings."),
      data: [],
      meta: undefined,
    };
  }
}

/**
 * Owner: Retrieve bookings for a specific turf
 */
export async function getTurfBookings(turfId: string, queryString: string = "") {
  try {
    const response = await httpClient.get(`/booking/turf/${turfId}?${queryString}`);
    return response;
  } catch (error: unknown) {
    console.error("Error fetching turf bookings:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred while fetching turf bookings."),
      data: [],
      meta: undefined,
    };
  }
}

/**
 * Player/Owner: Cancel a booking
 */
export async function cancelBooking(id: string) {
  try {
    const response = await httpClient.patch(`/booking/cancel/${id}`, {});
    revalidatePath("/dashboard/bookings");
    revalidatePath("/turf-owner/dashboard/bookings");
    return response;
  } catch (error: unknown) {
    console.error("Error cancelling booking:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred while cancelling booking."),
      data: null,
    };
  }
}

/**
 * Owner: Reject a booking
 */
export async function rejectBooking(id: string) {
  try {
    const response = await httpClient.patch(`/booking/reject/${id}`, {});
    revalidatePath("/turf-owner/dashboard/bookings");
    return response;
  } catch (error: unknown) {
    console.error("Error rejecting booking:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred while rejecting booking."),
      data: null,
    };
  }
}

/**
 * Owner: Accept a booking
 */
export async function acceptBooking(id: string) {
  try {
    const response = await httpClient.patch(`/booking/accept/${id}`, {});
    revalidatePath("/turf-owner/dashboard/bookings");
    return response;
  } catch (error: unknown) {
    console.error("Error accepting booking:", error);
    return {
      success: false,
      message: getApiErrorMessage(error, "An error occurred while accepting booking."),
      data: null,
    };
  }
}
