import type { BaseComponentProps } from '@/types';

interface SkeletonProps extends BaseComponentProps {
    height?: string;
    width?: string;
}

export const Skeleton = ({ className, height = '1rem', width = '100%', testId }: SkeletonProps) => {
    const classes = ['ui-skeleton', className].filter(Boolean).join(' ');

    return <div className={classes} style={{ height, width }} aria-hidden="true" data-testid={testId} />;
};
