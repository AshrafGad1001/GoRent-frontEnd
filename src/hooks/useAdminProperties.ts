"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminProperty } from "../types/admin";
import { adminService } from "../services/admin";

export function useAdminProperties() {
    const [properties, setProperties] = useState<AdminProperty[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProperties = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await adminService.getProperties();
            setProperties(data.properties);
        } catch {
            setError("فشل جلب العقارات");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updatePropertyStatus = async (
        id: string,
        status: AdminProperty["status"]
    ) => {
        try {
            await adminService.updatePropertyStatus(id, status);
            await fetchProperties();
        } catch {
            setError("فشل تحديث حالة العقار");
        }
    };

    useEffect(() => {
        let ignore = false;

        const load = async () => {
            try {
                setIsLoading(true);
                const data = await adminService.getProperties();
                if (!ignore) setProperties(data.properties);
            } catch {
                if (!ignore) setError("فشل جلب العقارات");
            } finally {
                if (!ignore) setIsLoading(false);
            }
        };

        load();

        return () => {
            ignore = true;
        };
    }, []);

    return { properties, isLoading, error, updatePropertyStatus };
}
