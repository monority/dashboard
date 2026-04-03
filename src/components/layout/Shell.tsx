import type { ReactNode } from 'react';

interface ShellProps {
    sidebar: ReactNode;
    header: ReactNode;
    children: ReactNode;
}

export const Shell = ({ sidebar, header, children }: ShellProps) => {
    return (
        <div className="app-shell">
            <aside className="app-shell__sidebar">{sidebar}</aside>
            <div className="app-shell__main">
                <header className="app-shell__header">{header}</header>
                <main className="app-shell__content">{children}</main>
            </div>
        </div>
    );
};
