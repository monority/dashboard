export interface ApiError {
    message: string;
    code: string;
    status: number;
    details?: Record<string, string[]>;
}

export interface ApiResponse<TData> {
    data: TData;
    message?: string;
    requestId?: string;
}

export interface PaginatedResponse<TItem> {
    data: TItem[];
    meta: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

export interface UserApiModel {
    id: string;
    email: string;
    fullName: string;
    role: 'admin' | 'manager' | 'viewer';
    permissions: string[];
    createdAt: string;
    updatedAt: string;
}

export interface SettingsApiModel {
    theme: 'light' | 'dark' | 'system';
    notificationsEnabled: boolean;
}

export interface BillingApiModel {
    id: string;
    amount: number;
    currency: 'EUR' | 'USD';
    status: 'paid' | 'pending' | 'failed';
    issuedAt: string;
}
