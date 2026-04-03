export type UserRole = 'admin' | 'manager' | 'viewer';

export interface Permission {
    code: string;
    description: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    permissions: Permission[];
}

export interface BillingRecord {
    id: string;
    amountCents: number;
    currency: 'EUR' | 'USD';
    status: 'paid' | 'pending' | 'failed';
    issuedAt: Date;
}

export interface AppSettings {
    theme: 'light' | 'dark' | 'system';
    notificationsEnabled: boolean;
}
