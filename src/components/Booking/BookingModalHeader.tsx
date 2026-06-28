"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface BookingModalHeaderProps {
  onClose: () => void;
}

export default function BookingModalHeader({ onClose }: BookingModalHeaderProps) {
  return (
    <Box
      sx={{
        bgcolor: "primary.dark",
        px: 3,
        py: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography sx={{ color: "primary.contrastText", fontWeight: "bold", fontSize: "1.25rem" }}>
          تأكيد الحجز
        </Typography>
        <Typography variant="body2" sx={{ color: "primary.contrastText", opacity: 0.7, mt: 0.5 }}>
          حدد مدة الإيجار المطلوبة
        </Typography>
      </Box>
      <IconButton
        onClick={onClose}
        aria-label="إغلاق"
        sx={{
          color: "primary.contrastText",
          opacity: 0.7,
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)", opacity: 1 },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}