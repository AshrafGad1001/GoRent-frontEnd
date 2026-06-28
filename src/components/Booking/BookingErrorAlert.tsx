import React from "react";
import Alert from "@mui/material/Alert";

interface BookingErrorAlertProps {
  message: string;
}

export default function BookingErrorAlert({ message }: BookingErrorAlertProps) {
  return <Alert severity="error">{message}</Alert>;
}