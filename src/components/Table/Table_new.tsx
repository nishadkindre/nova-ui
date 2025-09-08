import React, { useState, useMemo } from 'react';
import { theme } from '../../tokens';
import { zinc, slate } from '../../tokens';

/**
 * Table Component - NovaUI
 *
 * A flexible and feature-rich table component with sorting, selection, and custom styling.
 * Supports responsive design, accessibility features, and light/dark themes.
 *
 * Usage:
 * <Table
 *   columns={columns}
 *   data={data}
 *   sortable
 *   selectable
 *   variant="light"
 *   radius="8px"
 * />
 */

export interface TableColumn<T = any> {
  /** Unique key for the column */
  key: string;

  /** Display title for the column header */
  title: string;

  /** Custom render function for cell content */
  render?: (value: any, record: T, index: number) => React.ReactNode;

  /** Whether this column is sortable */
  sortable?: boolean;

  /** Width of the column */
  width?: string | number;

  /** Alignment of column content */
  align?: 'left' | 'center' | 'right';

  /** Whether this column is fixed */
  fixed?: 'left' | 'right';
}

export interface TableProps<T = any> {
  /** Array of column definitions */
  columns: TableColumn<T>[];

  /** Array of data records */
  data: T[];

  /** Whether the table has sortable columns */
  sortable?: boolean;

  /** Whether rows are selectable */
  selectable?: boolean;

  /** Selected row keys (for controlled selection) */
  selectedRowKeys?: (string | number)[];

  /** Callback when selection changes */
  onSelectionChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void;

  /** Function to get unique key for each row */
  rowKey?: string | ((record: T) => string | number);

  /** Size variant of the table */
  size?: 'small' | 'medium' | 'large';

  /** Color variant of the table */
  variant?: 'light' | 'dark';

  /** Border radius of the table */
  radius?: string;

  /** Whether to show border */
  bordered?: boolean;

  /** Whether to show striped rows */
  striped?: boolean;

  /** Whether to highlight rows on hover */
  hoverable?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Empty state message */
  emptyText?: string;

  /** Custom class name */
  className?: string;

  /** Custom styles */
  style?: React.CSSProperties;

  /** Callback when a row is clicked */
  onRowClick?: (record: T, index: number) => void;
}

interface SortState {
  key: string | null;
  direction: 'asc' | 'desc' | null;
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  sortable = false,
  selectable = false,
  selectedRowKeys = [],
  onSelectionChange,
  rowKey = 'id',
  size = 'medium',
  variant = 'light',
  radius = '8px',
  bordered = false,
  striped = false,
  hoverable = true,
  loading = false,
  emptyText = 'No data',
  className = '',
  style = {},
  onRowClick
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<SortState>({ key: null, direction: null });
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<(string | number)[]>([]);

  const isControlledSelection = selectedRowKeys.length > 0 || onSelectionChange;
  const currentSelectedKeys = isControlledSelection ? selectedRowKeys : internalSelectedKeys;

  // Enhanced color themes inspired by shadcn/radix
  const getTableTheme = () => {
    if (variant === 'dark') {
      return {
        background: zinc[900],
        surface: zinc[800],
        surfaceHover: zinc[700],
        border: zinc[700],
        text: {
          primary: zinc[50],
          secondary: zinc[400],
          muted: zinc[500]
        },
        header: {
          background: zinc[800],
          text: zinc[50]
        },
        row: {
          background: zinc[900],
          backgroundAlt: zinc[800],
          backgroundHover: zinc[700],
          backgroundSelected: zinc[600]
        }
      };
    }

    // Light theme (default)
    return {
      background: 'white',
      surface: slate[50],
      surfaceHover: slate[100],
      border: slate[200],
      text: {
        primary: slate[900],
        secondary: slate[600],
        muted: slate[500]
      },
      header: {
        background: slate[50],
        text: slate[900]
      },
      row: {
        background: 'white',
        backgroundAlt: slate[50],
        backgroundHover: slate[50],
        backgroundSelected: slate[100]
      }
    };
  };

  const tableTheme = getTableTheme();

  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortState.key!];
      const bValue = b[sortState.key!];

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;

      return sortState.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortState]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    setSortState(prev => {
      if (prev.key !== columnKey) {
        return { key: columnKey, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key: columnKey, direction: 'desc' };
      }
      return { key: null, direction: null };
    });
  };

  const handleSelectAll = (checked: boolean) => {
    const allKeys = sortedData.map((record, index) => getRowKey(record, index));
    const newSelectedKeys = checked ? allKeys : [];

    if (isControlledSelection) {
      onSelectionChange?.(newSelectedKeys, checked ? sortedData : []);
    } else {
      setInternalSelectedKeys(newSelectedKeys);
    }
  };

  const handleSelectRow = (recordKey: string | number, record: T) => {
    const newSelectedKeys = currentSelectedKeys.includes(recordKey) ? currentSelectedKeys.filter(key => key !== recordKey) : [...currentSelectedKeys, recordKey];

    const selectedRecords = sortedData.filter((record, index) => newSelectedKeys.includes(getRowKey(record, index)));

    if (isControlledSelection) {
      onSelectionChange?.(newSelectedKeys, selectedRecords);
    } else {
      setInternalSelectedKeys(newSelectedKeys);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '12px', padding: '8px 12px' };
      case 'large':
        return { fontSize: '16px', padding: '16px 20px' };
      default:
        return { fontSize: '14px', padding: '12px 16px' };
    }
  };

  const sizeStyles = getSizeStyles();

  // Enhanced table styles with theme support
  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    borderRadius: radius,
    fontSize: sizeStyles.fontSize,
    backgroundColor: tableTheme.background,
    border: bordered ? `1px solid ${tableTheme.border}` : 'none',
    overflow: 'hidden',
    boxShadow: variant === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.3)',
    ...style
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: tableTheme.header.background,
    borderBottom: `1px solid ${tableTheme.border}`
  };

  const headerCellStyles: React.CSSProperties = {
    padding: sizeStyles.padding,
    textAlign: 'left',
    fontWeight: 600,
    color: tableTheme.header.text,
    borderRight: bordered ? `1px solid ${tableTheme.border}` : 'none',
    cursor: sortable ? 'pointer' : 'default',
    userSelect: 'none',
    transition: 'background-color 0.2s ease'
  };

  const rowStyles = (index: number, isSelected: boolean = false): React.CSSProperties => ({
    borderBottom: `1px solid ${tableTheme.border}`,
    backgroundColor: isSelected ? tableTheme.row.backgroundSelected : striped && index % 2 === 1 ? tableTheme.row.backgroundAlt : tableTheme.row.background,
    transition: 'background-color 0.15s ease'
  });

  const cellStyles = (align?: string): React.CSSProperties => ({
    padding: sizeStyles.padding,
    textAlign: (align as any) || 'left',
    borderRight: bordered ? `1px solid ${tableTheme.border}` : 'none',
    color: tableTheme.text.primary
  });

  const checkboxStyles: React.CSSProperties = {
    margin: 0,
    cursor: 'pointer',
    accentColor: variant === 'dark' ? zinc[400] : slate[600]
  };

  const sortIconStyles: React.CSSProperties = {
    marginLeft: '4px',
    fontSize: '12px',
    color: tableTheme.text.secondary
  };

  const isAllSelected = currentSelectedKeys.length === sortedData.length && sortedData.length > 0;
  const isIndeterminate = currentSelectedKeys.length > 0 && currentSelectedKeys.length < sortedData.length;

  const emptyStateStyles: React.CSSProperties = {
    padding: '40px',
    textAlign: 'center',
    color: tableTheme.text.secondary,
    backgroundColor: tableTheme.background,
    border: bordered ? `1px solid ${tableTheme.border}` : 'none',
    borderRadius: radius
  };

  if (loading) {
    return <div style={emptyStateStyles}>Loading...</div>;
  }

  if (sortedData.length === 0) {
    return <div style={emptyStateStyles}>{emptyText}</div>;
  }

  return (
    <div className={className} style={{ overflowX: 'auto' }}>
      <table style={tableStyles}>
        <thead style={headerStyles}>
          <tr>
            {selectable && (
              <th style={{ ...headerCellStyles, width: '40px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={e => handleSelectAll(e.target.checked)}
                  style={checkboxStyles}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                style={{
                  ...headerCellStyles,
                  width: column.width,
                  textAlign: column.align || 'left',
                  cursor: sortable && column.sortable !== false ? 'pointer' : 'default'
                }}
                onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                onMouseEnter={e => {
                  if (sortable && column.sortable !== false) {
                    e.currentTarget.style.backgroundColor = tableTheme.surfaceHover;
                  }
                }}
                onMouseLeave={e => {
                  if (sortable && column.sortable !== false) {
                    e.currentTarget.style.backgroundColor = tableTheme.header.background;
                  }
                }}>
                {column.title}
                {sortable && column.sortable !== false && <span style={sortIconStyles}>{sortState.key === column.key ? (sortState.direction === 'asc' ? '↑' : '↓') : '↕'}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((record, index) => {
            const recordKey = getRowKey(record, index);
            const isSelected = currentSelectedKeys.includes(recordKey);

            return (
              <tr
                key={recordKey}
                style={rowStyles(index, isSelected)}
                onClick={() => onRowClick?.(record, index)}
                onMouseEnter={e => {
                  if (hoverable) {
                    e.currentTarget.style.backgroundColor = tableTheme.row.backgroundHover;
                  }
                }}
                onMouseLeave={e => {
                  if (hoverable) {
                    const baseBackground = isSelected ? tableTheme.row.backgroundSelected : striped && index % 2 === 1 ? tableTheme.row.backgroundAlt : tableTheme.row.background;
                    e.currentTarget.style.backgroundColor = baseBackground;
                  }
                }}>
                {selectable && (
                  <td style={{ ...cellStyles('center'), width: '40px' }}>
                    <input type="checkbox" checked={isSelected} onChange={() => handleSelectRow(recordKey, record)} style={checkboxStyles} aria-label={`Select row ${index + 1}`} />
                  </td>
                )}
                {columns.map(column => (
                  <td key={column.key} style={cellStyles(column.align)}>
                    {column.render ? column.render(record[column.key], record, index) : record[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
