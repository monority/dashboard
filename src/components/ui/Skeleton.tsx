import type { BaseComponentProps } from '@/types';

/** Props for the Skeleton component */
interface SkeletonProps extends BaseComponentProps {
  /** Height of the skeleton element (CSS value) */
  height?: string;
  /** Width of the skeleton element (CSS value) */
  width?: string;
}

/**
 * Placeholder loading component that animates while content is fetching.
 * Displays as a shimmer loading state, hidden from screen readers.
 *
 * @param props - Skeleton component props
 * @returns Animated placeholder element
 */
export const Skeleton = ({ className, height = '1rem', width = '100%', testId }: SkeletonProps) => {
  const classes = ['ui-skeleton', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={{ height, width }} aria-hidden="true" data-testid={testId} />
  );
};

Skeleton.displayName = 'Skeleton';
