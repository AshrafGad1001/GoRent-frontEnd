"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminUser } from "../types/admin";
import { adminService } from "../services/admin";

export function useAdminUsers() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await adminService.getUsers();
            setUsers(data.users);
        } catch {
            setError("فشل جلب المستخدمين");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const toggleUserStatus = async (id: string, currentStatus: AdminUser["status"]) => {
        try {
            await adminService.toggleUserStatus(id, currentStatus);
            await fetchUsers();
        } catch (err) {
            const message = err instanceof Error ? err.message : "فشل تحديث حالة المستخدم";
            setError(message);
        }
    };

    useEffect(() => {
        let ignore = false;

        const load = async () => {
            try {
                setIsLoading(true);
                const data = await adminService.getUsers();
                if (!ignore) setUsers(data.users);
            } catch {
                if (!ignore) setError("فشل جلب المستخدمين");
            } finally {
                if (!ignore) setIsLoading(false);
            }
        };

        load();

        return () => {
            ignore = true;
        };
    }, []);

    return { users, isLoading, error, toggleUserStatus };
}
