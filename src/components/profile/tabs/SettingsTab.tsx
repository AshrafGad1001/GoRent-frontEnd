"use client";

import { useState, useRef } from "react";
import {
    Box, Typography, Divider, Alert, CircularProgress,
    Avatar, Dialog, DialogTitle, DialogContent, DialogActions,
    IconButton, InputAdornment, TextField, Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { User } from "../../../types/user";
import { userService } from "../../../services/user";

interface SettingsTabProps {
    user: User;
    onUpdate?: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "primary.main", mb: "8px" }}>
            {label}
        </Typography>
        <Typography variant="body1">{value || "—"}</Typography>
    </Box>
);

const SectionHeader = ({
    title,
    action,
}: {
    title: string;
    action: React.ReactNode;
}) => (
    <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
    }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
        </Typography>
        <Box>{action}</Box>
    </Box>
);

const sectionSx = {
    p: 3,
    borderRadius: 3,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid",
    borderColor: "divider",
};

export default function SettingsTab({ user, onUpdate }: SettingsTabProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageError, setImageError] = useState<string | null>(null);
    const [imageSuccess, setImageSuccess] = useState(false);

    const [infoOpen, setInfoOpen] = useState(false);
    const [name, setName] = useState(user.name || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [infoLoading, setInfoLoading] = useState(false);
    const [infoSuccess, setInfoSuccess] = useState(false);
    const [infoError, setInfoError] = useState<string | null>(null);

    const [passOpen, setPassOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [passLoading, setPassLoading] = useState(false);
    const [passSuccess, setPassSuccess] = useState(false);
    const [passError, setPassError] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setImageLoading(true);
            setImageError(null);
            setImageSuccess(false);
            await userService.updateProfileImage(user._id, file);
            setImageSuccess(true);
            onUpdate?.();
        } catch (err: unknown) {
            setImageError(err instanceof Error ? err.message : "فشل تحديث الصورة");
        } finally {
            setImageLoading(false);
        }
    };

    const handleUpdateInfo = async () => {
        try {
            setInfoLoading(true);
            setInfoError(null);
            setInfoSuccess(false);
            await userService.updateUser(user._id, { name, phone });
            setInfoSuccess(true);
            onUpdate?.();
            setTimeout(() => setInfoOpen(false), 1000);
        } catch (err: unknown) {
            setInfoError(err instanceof Error ? err.message : "فشل تحديث البيانات");
        } finally {
            setInfoLoading(false);
        }
    };

    const handleChangePassword = async () => {
        try {
            setPassLoading(true);
            setPassError(null);
            setPassSuccess(false);
            await userService.changePassword(user._id, { currentPassword, newPassword, confirmPassword });
            setPassSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            onUpdate?.();
            setTimeout(() => setPassOpen(false), 1000);
        } catch (err: unknown) {
            setPassError(err instanceof Error ? err.message : "فشل تغيير كلمة السر");
        } finally {
            setPassLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

            {/* ─── Profile Image ─── */}
            <Box sx={sectionSx}>
                <SectionHeader
                    title="الصورة الشخصية"
                    action={
                        <IconButton
                            color="primary"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={imageLoading}
                            sx={{ border: "1px solid", borderColor: "primary.main", borderRadius: 2, px: 1.5, gap: 0.5 }}
                        >
                            {imageLoading
                                ? <CircularProgress size={18} />
                                : <CameraAltIcon fontSize="small" />}
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>
                                تعديل الصورة
                            </Typography>
                        </IconButton>
                    }
                />

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                        <Avatar
                            src={user.profileImage}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                                width: 100, height: 100,
                                bgcolor: "primary.main", fontSize: "2rem",
                                cursor: "pointer",
                            }}
                        >
                            {user.name?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                                position: "absolute", bottom: 0, right: 0,
                                bgcolor: "primary.main", borderRadius: "50%",
                                p: 0.5, cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <CameraAltIcon sx={{ fontSize: 16, color: "#fff" }} />
                        </Box>
                    </Box>
                    <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageUpload} />
                    {imageSuccess && <Alert severity="success" sx={{ py: 0 }}>تم تحديث الصورة بنجاح</Alert>}
                    {imageError && <Alert severity="error" sx={{ py: 0 }}>{imageError}</Alert>}
                </Box>
            </Box>

            {/* ─── Personal Info ─── */}
            <Box sx={sectionSx}>
                <SectionHeader
                    title="البيانات الشخصية"
                    action={
                        <IconButton
                            color="primary"
                            onClick={() => setInfoOpen(true)}
                            sx={{ border: "1px solid", borderColor: "primary.main", borderRadius: 2, px: 1.5, gap: 0.5 }}
                        >
                            <EditIcon fontSize="small" />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>
                                تعديل البيانات
                            </Typography>
                        </IconButton>
                    }
                />

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <InfoRow label="البريد الإلكتروني" value={user.email} />
                    <Divider />
                    <InfoRow label="الاسم" value={user.name} />
                    <Divider />
                    <InfoRow label="رقم الهاتف" value={user.phone || ""} />
                </Box>
            </Box>

            {/* ─── Change Password ─── */}
            <Box sx={sectionSx}>
                <SectionHeader
                    title="كلمة السر"
                    action={
                        <IconButton
                            color="primary"
                            onClick={() => setPassOpen(true)}
                            sx={{ border: "1px solid", borderColor: "primary.main", borderRadius: 2, px: 1.5, gap: 0.5 }}
                        >
                            <LockOutlinedIcon fontSize="small" />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: "primary.main" }}>
                                تغيير كلمة السر
                            </Typography>
                        </IconButton>
                    }
                />
            </Box>

            {/* ─── Edit Info Dialog ─── */}
            <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>تعديل البيانات الشخصية</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
                        <TextField
                            label="الاسم"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth size="small"
                        />
                        <TextField
                            label="رقم الهاتف"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth size="small"
                        />
                        {infoSuccess && <Alert severity="success">تم التحديث بنجاح</Alert>}
                        {infoError && <Alert severity="error">{infoError}</Alert>}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                    <Button onClick={() => setInfoOpen(false)} variant="outlined"
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>
                        إلغاء
                    </Button>
                    <Button onClick={handleUpdateInfo} variant="contained" disabled={infoLoading}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, boxShadow: "none" }}>
                        {infoLoading ? <CircularProgress size={20} color="inherit" /> : "حفظ"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ─── Change Password Dialog ─── */}
            <Dialog open={passOpen} onClose={() => setPassOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>تغيير كلمة السر</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
                        <TextField
                            label="كلمة السر الحالية"
                            type={showCurrent ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            fullWidth size="small"
                            slotProps={{
                                input: {
                                    dir: "rtl",
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton size="small" onClick={() => setShowCurrent(!showCurrent)}>
                                                {showCurrent ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                        <TextField
                            label="كلمة السر الجديدة"
                            type={showNew ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            fullWidth size="small"
                            slotProps={{
                                input: {
                                    dir: "rtl",
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton size="small" onClick={() => setShowNew(!showNew)}>
                                                {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                        <TextField
                            label="تأكيد كلمة السر الجديدة"
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth size="small"
                            slotProps={{
                                input: {
                                    dir: "rtl",
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton size="small" onClick={() => setShowConfirm(!showConfirm)}>
                                                {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                        {passSuccess && <Alert severity="success">تم تغيير كلمة السر بنجاح</Alert>}
                        {passError && <Alert severity="error">{passError}</Alert>}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                    <Button onClick={() => setPassOpen(false)} variant="outlined"
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>
                        إلغاء
                    </Button>
                    <Button onClick={handleChangePassword} variant="contained" disabled={passLoading}
                        sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, boxShadow: "none" }}>
                        {passLoading ? <CircularProgress size={20} color="inherit" /> : "تغيير"}
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
}