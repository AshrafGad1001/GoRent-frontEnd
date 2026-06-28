"use client";

import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { bookingService } from "@/services/booking";
import { BookingModalProps, CreateBookingResponse } from "@/types/booking";
import BookingModalHeader from "../Booking/BookingModalHeader";
import BookingFormStep from "../Booking//BookingFormStep";
import BookingSuccessStep from "../Booking/BookingSuccessStep";

export default function BookingModal({ propertyId, pricePerMonth, onClose }: BookingModalProps) {
  const today = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<CreateBookingResponse | null>(null);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Derived calculations — use calendar arithmetic to avoid 31-day month rounding bugs
  const estimatedMonths = (() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    // Add 1 if there are extra days beyond the full months
    const dayRemainder =
      end.getDate() > start.getDate()
        ? 1
        : 0;
    return Math.max(0, months + dayRemainder);
  })();
  const estimatedTotal = estimatedMonths * pricePerMonth;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!startDate || !endDate) {
      setError("يرجى تحديد تاريخ البداية والنهاية.");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setError("يجب أن يكون تاريخ النهاية بعد تاريخ البداية.");
      return;
    }

    setLoading(true);
    try {
      const result = await bookingService.createBooking({ propertyId, startDate, endDate });
      setSuccess(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          maxHeight: "92vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 25px 60px rgba(15, 23, 42, 0.35)"
              : "0 25px 60px rgba(0, 0, 0, 0.7)",
          "@keyframes scaleIn": {
            from: { opacity: 0, transform: "scale(0.95) translateY(8px)" },
            to: { opacity: 1, transform: "scale(1) translateY(0)" },
          },
          animation: "scaleIn 0.25s ease-out",
        }}
      >
        <BookingModalHeader onClose={onClose} />

        <Box sx={{ p: 3 }}>
          {success ? (
            <BookingSuccessStep
              booking={success.booking}
              message={success.message}
              onClose={onClose}
            />
          ) : (
            <BookingFormStep
              today={today}
              startDate={startDate}
              endDate={endDate}
              pricePerMonth={pricePerMonth}
              estimatedMonths={estimatedMonths}
              estimatedTotal={estimatedTotal}
              loading={loading}
              error={error}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onSubmit={handleSubmit}
              onCancel={onClose}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}