"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CreatedBooking } from "@/types/booking";

interface BookingSuccessStepProps {
  booking: CreatedBooking;
  message: string;
  onClose: () => void;
}

export default function BookingSuccessStep({
  booking,
  message,
  onClose,
}: BookingSuccessStepProps) {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      {/* Check icon */}
      <Box
        sx={{
          width: 64,
          height: 64,
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(22, 163, 74, 0.1)"
              : "rgba(74, 222, 128, 0.1)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 40, color: "success.main" }} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}>
        {message}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
        رقم الحجز:{" "}
        <Typography
          component="span"
          sx={{ fontFamily: "monospace", color: "text.primary", fontSize: "0.75rem" }}
        >
          {booking._id}
        </Typography>
      </Typography>

      <Box
        component="span"
        sx={{
          display: "inline-block",
          mt: 2,
          px: 2,
          py: 0.5,
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(217, 119, 6, 0.1)"
              : "rgba(251, 191, 36, 0.1)",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(217, 119, 6, 0.3)"
              : "rgba(251, 191, 36, 0.3)",
          color: "warning.main",
          borderRadius: "50px",
          fontSize: "0.75rem",
          fontWeight: 600,
        }}
      >
        في انتظار موافقة المالك
      </Box>

      <Button
        onClick={onClose}
        variant="contained"
        fullWidth
        sx={{ mt: 3, py: 1.5 }}
      >
        حسناً
      </Button>
    </Box>
  );
}