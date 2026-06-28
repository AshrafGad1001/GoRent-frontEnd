"use client";

import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { viewingService } from "@/services/viewing";
import { ViewingResponse } from "@/types/viewing";

interface ViewingModalProps {
  propertyId: string;
  onClose: () => void;
}

export default function ViewingModal({ propertyId, onClose }: ViewingModalProps) {
  const [scheduledAt, setScheduledAt] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<ViewingResponse | null>(null);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!scheduledAt) {
      setError("يرجى تحديد موعد المعاينة.");
      return;
    }

    setLoading(true);
    try {
      const result = await viewingService.createViewing({
        propertyId,
        scheduledAt: new Date(scheduledAt).toISOString(),
        notes,
      });
      setSuccess(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().slice(0, 16);

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
          maxWidth: 480,
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
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            طلب معاينة
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ p: 3 }}>
          {success ? (
            <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "success.main",
                  color: "success.contrastText",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                }}
              >
                <CheckIcon fontSize="large" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {success.message}
              </Typography>
              <Typography color="text.secondary">
                موعد المعاينة: {new Date(success.viewing.scheduledAt).toLocaleString("ar-SA")}
              </Typography>
              <Button
                onClick={onClose}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, py: 1.3, borderRadius: 3, fontWeight: 700 }}
              >
                إغلاق
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="تاريخ ووقت المعاينة"
                type="datetime-local"
                required
                fullWidth
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: { inputProps: { min: today } },
                }}
              />

              <TextField
                label="ملاحظات (اختياري)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: أود التحقق من حالة الشقة..."
                fullWidth
                multiline
                rows={3}
              />

              <Box sx={{ display: "flex", gap: 1.5, pt: 1 }}>
                <Button
                  type="submit"
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.3, borderRadius: 3, fontWeight: 700 }}
                >
                  {loading ? "جاري الإرسال..." : "تأكيد الطلب"}
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  sx={{ py: 1.3, borderRadius: 3, fontWeight: 700 }}
                >
                  إلغاء
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}