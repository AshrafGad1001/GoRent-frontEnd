"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminDispute } from "../types/admin";
import { adminService } from "../services/admin";

export function useAdminDisputes() {
    const [disputes, setDisputes] = useState<AdminDispute[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDisputes = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await adminService.getDisputes();
            setDisputes(data.disputes);
        } catch {
            setError("فشل جلب النزاعات");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateDisputeStatus = async (
        id: string,
        status: AdminDispute["status"]
    ) => {
        try {
            await adminService.updateDisputeStatus(id, status);
            await fetchDisputes();
        } catch {
            setError("فشل تحديث حالة النزاع");
        }
    };

    useEffect(() => {
        let ignore = false;

        const load = async () => {
            try {
                setIsLoading(true);
                const data = await adminService.getDisputes();
                if (!ignore) setDisputes(data.disputes);
            } catch {
                if (!ignore) setError("فشل جلب النزاعات");
            } finally {
                if (!ignore) setIsLoading(false);
            }
        };

        load();

        return () => {
            ignore = true;
        };
    }, []);

    return { disputes, isLoading, error, updateDisputeStatus };
}
