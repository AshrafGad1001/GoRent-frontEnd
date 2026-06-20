import {
    AdminUser,
    AdminProperty,
    AdminReview,
    AdminDispute,
    PlatformReport,
} from "../types/admin";

// =====================================================================
// REAL API HELPER
// Same pattern as services/auth.ts: httpOnly cookie ("token") sent via
// credentials: "include". This is the auth pattern that's actually wired
// up in the backend (services/booking.ts's Bearer-token/localStorage
// pattern is unused/dead code there, so we don't repeat it here).
// =====================================================================

const API_URL = "";

async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "حدث خطأ أثناء الاتصال بالخادم");
    }

    return data as T;
}

// ---- Raw shapes returned by the real backend (Backend-goRent) ----

interface RawOwner {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
}

interface RawProperty {
    _id: string;
    title: string;
    ownerId: RawOwner | string;
    pricePerMonth: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    location?: { coordinates?: [number, number] };
    createdAt: string;
}

interface RawReview {
    _id: string;
    authorId?: { name?: string };
    propertyId?: { title?: string } | null;
    targetType: "PROPERTY" | "OWNER" | "TENANT";
    rating: number;
    comment: string;
    createdAt: string;
}

interface RawUser {
    _id: string;
    name: string;
    email: string;
    role: "tenant" | "owner" | "admin" | "superadmin";
    phone?: string;
    isbanned: boolean;
    createdAt: string;
}

// ---- Mappers: real backend shape -> the AdminProperty/AdminReview shape
// the existing hooks/pages already expect, so nothing above this file
// needs to change. ----

function mapProperty(raw: RawProperty): AdminProperty {
    const coords = raw.location?.coordinates;
    return {
        _id: raw._id,
        title: raw.title,
        ownerName: typeof raw.ownerId === "object" ? raw.ownerId.name : "—",
        // The backend stores GeoJSON coordinates, not a text address, so we
        // show the coordinates as a readable fallback.
        location: coords ? `${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}` : "—",
        pricePerMonth: raw.pricePerMonth,
        status: raw.status,
        createdAt: raw.createdAt,
    };
}

function mapReview(raw: RawReview): AdminReview {
    const propertyTitle =
        raw.targetType === "PROPERTY"
            ? raw.propertyId?.title || "عقار محذوف"
            : raw.targetType === "OWNER"
                ? "تقييم لمؤجر"
                : "تقييم لمستأجر";

    return {
        _id: raw._id,
        propertyTitle,
        tenantName: raw.authorId?.name || "مستخدم محذوف",
        rating: raw.rating,
        comment: raw.comment,
        createdAt: raw.createdAt,
    };
}

function mapUser(raw: RawUser): AdminUser {
    return {
        _id: raw._id,
        name: raw.name,
        email: raw.email,
        role: raw.role,
        phone: raw.phone,
        status: raw.isbanned ? "SUSPENDED" : "ACTIVE",
        createdAt: raw.createdAt,
    };
}

// =====================================================================
// MOCK DATA
// Disputes and the aggregated Report are still mocked — the backend
// doesn't expose a Disputes feature or an aggregate report endpoint yet.
// Users/Properties/Reviews below are NO LONGER used as a data source for
// getUsers/getProperties/getReviews (those now call the real backend, see
// the SERVICE section) — the arrays are kept only so getReport()'s mock
// aggregation still has numbers to compute from.
// =====================================================================

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

const mockUsers: AdminUser[] = [
    { _id: "u1", name: "أحمد السيد", email: "ahmed.sayed@example.com", role: "tenant", phone: "0100 123 4567", status: "ACTIVE", createdAt: "2026-01-12" },
    { _id: "u2", name: "منى عبد الله", email: "mona.abdallah@example.com", role: "owner", phone: "0111 234 5678", status: "ACTIVE", createdAt: "2026-02-03" },
    { _id: "u3", name: "كريم فتحي", email: "karim.fathy@example.com", role: "owner", phone: "0122 345 6789", status: "SUSPENDED", createdAt: "2026-02-20" },
    { _id: "u4", name: "هبة ناصر", email: "heba.naser@example.com", role: "tenant", phone: "0155 456 7890", status: "ACTIVE", createdAt: "2026-03-01" },
    { _id: "u5", name: "عمر حلمي", email: "omar.helmy@example.com", role: "tenant", phone: "0100 567 8901", status: "ACTIVE", createdAt: "2026-03-18" },
    { _id: "u6", name: "ياسمين طارق", email: "yasmin.tarek@example.com", role: "owner", phone: "0111 678 9012", status: "ACTIVE", createdAt: "2026-04-05" },
    { _id: "u7", name: "محمود رشدي", email: "mahmoud.roshdy@example.com", role: "tenant", phone: "0122 789 0123", status: "SUSPENDED", createdAt: "2026-04-22" },
    { _id: "u8", name: "نهى سامي", email: "noha.samy@example.com", role: "admin", phone: "0155 890 1234", status: "ACTIVE", createdAt: "2026-05-09" },
];

const mockProperties: AdminProperty[] = [
    { _id: "p1", title: "شقة مفروشة بالمهندسين", ownerName: "منى عبد الله", location: "المهندسين، الجيزة", pricePerMonth: 9500, status: "APPROVED", createdAt: "2026-02-10" },
    { _id: "p2", title: "ستوديو حديث بالتجمع الخامس", ownerName: "كريم فتحي", location: "التجمع الخامس، القاهرة", pricePerMonth: 7200, status: "PENDING", createdAt: "2026-03-05" },
    { _id: "p3", title: "فيلا بحديقة في الشيخ زايد", ownerName: "ياسمين طارق", location: "الشيخ زايد، الجيزة", pricePerMonth: 22000, status: "APPROVED", createdAt: "2026-03-21" },
    { _id: "p4", title: "شقة غرفتين بمدينة نصر", ownerName: "كريم فتحي", location: "مدينة نصر، القاهرة", pricePerMonth: 6800, status: "REJECTED", createdAt: "2026-04-02" },
    { _id: "p5", title: "دوبلكس بالساحل الشمالي", ownerName: "ياسمين طارق", location: "الساحل الشمالي", pricePerMonth: 35000, status: "PENDING", createdAt: "2026-04-27" },
    { _id: "p6", title: "شقة عائلية بالزمالك", ownerName: "منى عبد الله", location: "الزمالك، القاهرة", pricePerMonth: 14500, status: "APPROVED", createdAt: "2026-05-15" },
];

const mockReviews: AdminReview[] = [
    { _id: "r1", propertyTitle: "شقة مفروشة بالمهندسين", tenantName: "أحمد السيد", rating: 5, comment: "تجربة ممتازة والشقة نظيفة جداً وقريبة من كل الخدمات.", createdAt: "2026-03-02" },
    { _id: "r2", propertyTitle: "فيلا بحديقة في الشيخ زايد", tenantName: "هبة ناصر", rating: 4, comment: "الفيلا جميلة لكن التكييف كان يحتاج صيانة.", createdAt: "2026-04-01" },
    { _id: "r3", propertyTitle: "شقة غرفتين بمدينة نصر", tenantName: "عمر حلمي", rating: 1, comment: "الوصف على المنصة لا يطابق الشقة الحقيقية إطلاقاً.", createdAt: "2026-04-10" },
    { _id: "r4", propertyTitle: "شقة عائلية بالزمالك", tenantName: "محمود رشدي", rating: 5, comment: "المالكة متعاونة جداً والشقة بموقع رائع.", createdAt: "2026-05-20" },
    { _id: "r5", propertyTitle: "دوبلكس بالساحل الشمالي", tenantName: "هبة ناصر", rating: 2, comment: "يحتوي على كلام غير مناسب وتم الإبلاغ عنه.", createdAt: "2026-05-30" },
    { _id: "r6", propertyTitle: "شقة مفروشة بالمهندسين", tenantName: "عمر حلمي", rating: 3, comment: "مكان جيد بشكل عام مع بعض الملاحظات على النظافة.", createdAt: "2026-06-04" },
];

let mockDisputes: AdminDispute[] = [
    {
        _id: "d1",
        propertyTitle: "شقة غرفتين بمدينة نصر",
        tenantName: "عمر حلمي",
        ownerName: "كريم فتحي",
        subject: "عدم تطابق الشقة مع الوصف",
        description: "الشقة المستلمة تختلف بشكل كبير عن الصور والوصف المنشور على المنصة، ويطلب المستأجر استرداد مبلغ الحجز.",
        status: "OPEN",
        createdAt: "2026-05-02",
    },
    {
        _id: "d2",
        propertyTitle: "دوبلكس بالساحل الشمالي",
        tenantName: "هبة ناصر",
        ownerName: "ياسمين طارق",
        subject: "تأخر في استرداد مبلغ التأمين",
        description: "انتهت مدة الإيجار منذ أسبوعين ولم يتم استرداد مبلغ التأمين المتفق عليه حتى الآن.",
        status: "IN_REVIEW",
        createdAt: "2026-05-22",
    },
    {
        _id: "d3",
        propertyTitle: "شقة مفروشة بالمهندسين",
        tenantName: "أحمد السيد",
        ownerName: "منى عبد الله",
        subject: "خلاف حول فاتورة الكهرباء",
        description: "خلاف بين المستأجر والمالكة حول من يتحمل فاتورة الكهرباء عن الشهر الأخير من الإيجار.",
        status: "RESOLVED",
        createdAt: "2026-04-15",
    },
    {
        _id: "d4",
        propertyTitle: "شقة عائلية بالزمالك",
        tenantName: "محمود رشدي",
        ownerName: "منى عبد الله",
        subject: "طلب إلغاء حجز بعد التأكيد",
        description: "يطلب المستأجر إلغاء الحجز بعد تأكيده بثلاثة أيام بسبب تغيير ظروف عمله.",
        status: "REJECTED",
        createdAt: "2026-04-28",
    },
    {
        _id: "d5",
        propertyTitle: "فيلا بحديقة في الشيخ زايد",
        tenantName: "هبة ناصر",
        ownerName: "ياسمين طارق",
        subject: "أعطال في التكييف لم تُصلح",
        description: "تم الإبلاغ عن عطل بالتكييف منذ أكثر من أسبوعين دون رد من المالكة.",
        status: "OPEN",
        createdAt: "2026-06-08",
    },
];

// =====================================================================
// SERVICE
// =====================================================================

export const adminService = {
    // ---- Users ----
    // GET /api/users requires an admin cookie (verifyRole(["admin"]) on the
    // route) — already covered by fetchApi's credentials: "include". There's
    // no single "toggle status" endpoint on the backend, just /ban and
    // /unban, so the caller passes the user's *current* status and we pick
    // the right one — same pattern as Properties' approve/reject.
    getUsers: async (): Promise<{ users: AdminUser[] }> => {
        const data = await fetchApi<{ users: RawUser[] }>("/api/users");
        return { users: data.users.map(mapUser) };
    },

    toggleUserStatus: async (
        id: string,
        currentStatus: AdminUser["status"]
    ): Promise<{ users: AdminUser[] }> => {
        const endpoint =
            currentStatus === "ACTIVE"
                ? `/api/users/${id}/ban`
                : `/api/users/${id}/unban`;
        await fetchApi(endpoint, { method: "PATCH" });
        return adminService.getUsers();
    },

    // ---- Properties ----
    // NOTE: GET /api/properties hardcodes `status: "APPROVED"` server-side
    // (see buildPropertyFilter in property.controller.js) — there is
    // currently no backend option for an admin to see PENDING/REJECTED
    // properties through this endpoint. So in real data this list will only
    // ever contain approved properties. Approve/reject still work for real
    // (e.g. un-approving a bad listing), they just can't process a pending
    // queue until the backend adds that. The Properties page shows a note
    // about this so it isn't a silent gap.
    getProperties: async (): Promise<{ properties: AdminProperty[] }> => {
        const data = await fetchApi<{ properties: RawProperty[] }>(
            "/api/properties"
        );
        return { properties: data.properties.map(mapProperty) };
    },

    updatePropertyStatus: async (
        id: string,
        status: AdminProperty["status"]
    ): Promise<{ properties: AdminProperty[] }> => {
        const endpoint =
            status === "APPROVED"
                ? `/api/properties/${id}/approve`
                : `/api/properties/${id}/reject`;
        await fetchApi(endpoint, { method: "PATCH" });
        return adminService.getProperties();
    },

    // ---- Reviews ----
    // NOTE: DELETE /api/reviews/:id only allows the review's own author to
    // delete it (hardcoded in reviews.controller.js) — an admin who isn't
    // the author will get a real 403 from the backend, surfaced as-is
    // through the error state. There's also no hide/show field on the
    // Review model, so that action isn't offered in the UI anymore.
    getReviews: async (): Promise<{ reviews: AdminReview[] }> => {
        const data = await fetchApi<{ reviews: RawReview[] }>("/api/reviews");
        return { reviews: data.reviews.map(mapReview) };
    },

    deleteReview: async (id: string): Promise<{ reviews: AdminReview[] }> => {
        await fetchApi(`/api/reviews/${id}`, { method: "DELETE" });
        return adminService.getReviews();
    },

    // ---- Disputes ----
    getDisputes: async (): Promise<{ disputes: AdminDispute[] }> => {
        await delay();
        return { disputes: mockDisputes };
    },

    updateDisputeStatus: async (
        id: string,
        status: AdminDispute["status"]
    ): Promise<{ disputes: AdminDispute[] }> => {
        await delay(250);
        mockDisputes = mockDisputes.map((d) =>
            d._id === id ? { ...d, status } : d
        );
        return { disputes: mockDisputes };
    },

    // ---- Reports (aggregated from the mock data above so the numbers
    // stay consistent with the Users/Properties/Disputes pages) ----
    getReport: async (): Promise<{ report: PlatformReport }> => {
        await delay();

        const totalOwners = mockUsers.filter((u) => u.role === "owner").length;
        const totalTenants = mockUsers.filter((u) => u.role === "tenant").length;
        const approvedProperties = mockProperties.filter(
            (p) => p.status === "APPROVED"
        ).length;
        const pendingProperties = mockProperties.filter(
            (p) => p.status === "PENDING"
        ).length;
        const openDisputes = mockDisputes.filter(
            (d) => d.status === "OPEN" || d.status === "IN_REVIEW"
        ).length;
        const resolvedDisputes = mockDisputes.filter(
            (d) => d.status === "RESOLVED" || d.status === "REJECTED"
        ).length;
        const averageRating =
            mockReviews.reduce((sum, r) => sum + r.rating, 0) /
            (mockReviews.length || 1);

        const topProperties = mockProperties
            .filter((p) => p.status === "APPROVED")
            .map((p) => ({
                title: p.title,
                bookings: Math.max(1, Math.round(p.pricePerMonth / 2500)),
                revenue: p.pricePerMonth * Math.max(1, Math.round(p.pricePerMonth / 2500)),
            }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        const report: PlatformReport = {
            totalUsers: mockUsers.length,
            totalOwners,
            totalTenants,
            totalProperties: mockProperties.length,
            approvedProperties,
            pendingProperties,
            totalBookings: topProperties.reduce((sum, p) => sum + p.bookings, 0),
            totalRevenue: topProperties.reduce((sum, p) => sum + p.revenue, 0),
            openDisputes,
            resolvedDisputes,
            averageRating: Math.round(averageRating * 10) / 10,
            topProperties,
        };

        return { report };
    },
};
