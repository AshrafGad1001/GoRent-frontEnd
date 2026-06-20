"use client";

import { useState, useEffect } from "react";
import { PlatformReport } from "../types/admin";
import { adminService } from "../services/admin";

export function useAdminReport() {
    const [report, setReport] = useState<PlatformReport | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        const load = async () => {
            try {
                setIsLoading(true);
                const data = await adminService.getReport();
                if (!ignore) setReport(data.report);
            } catch {
                if (!ignore) setError("فشل جلب التقارير");
            } finally {
                if (!ignore) setIsLoading(false);
            }
        };

        load();

        return () => {
            ignore = true;
        };
    }, []);

    return { report, isLoading, error };
}
