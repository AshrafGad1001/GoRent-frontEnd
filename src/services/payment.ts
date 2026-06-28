import { fetchApi } from "./auth";

const validateObjectId = (id: string, label: string) => {
    if (!id || typeof id !== "string") {
        throw new Error(`${label} is required`);
    }
    if (!/^[a-f\d]{24}$/i.test(id)) {
        throw new Error(`Invalid ${label}`);
    }
};

export const paymentService = {
    initiateBookingFeePayment: async (bookingId: string) => {
        validateObjectId(bookingId, "booking ID");
        return fetchApi(`/api/payment/booking-fee/${bookingId}`, {
            method: "POST",
        });
    },

    initiateListingFeePayment: async (propertyId: string) => {
        validateObjectId(propertyId, "property ID");
        return fetchApi(`/api/payment/listing-fee/${propertyId}`, {
            method: "POST",
        });
    },
};