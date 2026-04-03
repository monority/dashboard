import type { BaseComponentProps, TableColumn } from '@/types';

interface TableProps<TData extends Record<string, unknown>> extends BaseComponentProps {
    columns: TableColumn<TData>[];
    rows: TData[];
    rowKey: keyof TData;
}

export const Table = <TData extends Record<string, unknown>>({
    columns,
    rows,
    rowKey,
    className,
    testId,
}: TableProps<TData>) => {
    const classes = ['ui-table', className].filter(Boolean).join(' ');

    return (
        <div className="ui-table-wrapper" data-testid={testId}>
            <table className={classes}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={String(column.key)} style={{ textAlign: column.align ?? 'left', width: column.width }}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={String(row[rowKey])}>
                            {columns.map((column) => (
                                <td key={String(column.key)}>{String(row[column.key] ?? '')}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
