import type { ReactNode } from 'react';

export interface BaseComponentProps {
    className?: string;
    children?: ReactNode;
    testId?: string;
}

export interface SelectOption<TValue extends string = string> {
    label: string;
    value: TValue;
    disabled?: boolean;
}

export interface TableColumn<TData> {
    key: keyof TData;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
}

export interface ToastMessage {
    id: string;
    title: string;
    description?: string;
    variant: 'success' | 'warning' | 'danger' | 'info';
}
