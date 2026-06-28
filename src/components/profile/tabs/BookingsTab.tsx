"use client";

import { Box, Typography, Skeleton, Alert, IconButton, Tooltip } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useBookings } from "../../../hooks/useBookings";
import BookingCard from "../../Booking/BookingCard";

export default function BookingsTab() {
    const { bookings, isLoading, error, cancelBooking, fetchBookings } = useBookings();

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
                ))}
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (bookings.length === 0) {
        return (
            <Box sx={{ textAlign: "center", py: 8 }}>
                <CalendarMonthIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                    لا توجد حجوزات حتى الآن
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: '100%' }}>
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title="تحديث الحجوزات">
                    <IconButton onClick={fetchBookings} size="small" color="primary">
                        <RefreshIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box> */}
            {bookings.map((booking) => (
                <BookingCard
                    key={booking._id}
                    booking={booking}
                    onCancel={cancelBooking}
                />
            ))}
        </Box>
    );
}