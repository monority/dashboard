import { useMemo } from 'react';

import { authStore } from '@/stores';

export const usePermissions = () => {
    const permissions = authStore((state) => state.permissions);

    const can = useMemo(
        () => (permissionCode: string) => permissions.includes(permissionCode),
        [permissions],
    );

    return {
        permissions,
        can,
    };
};
