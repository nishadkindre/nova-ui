import React, { useState, useMemo } from 'react';
import { zinc, blue } from '../../tokens';

// Column definition interface
export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  fixed?: 'left' | 'right';
}

// Table props interface
export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  sortable?: boolean;
  selectable?: boolean;
  selectedRowKeys?: (string | number)[];
  onSelectionChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void;
  onRowClick?: (record: T, index: number) => void;
  rowKey?: string | ((record: T) => string | number);
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
  radius?: string;
  bordered?: boolean;
  outerBorder?: boolean;
  shadow?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  pagination?: boolean;
  emptyText?: React.ReactNode;
  pageSize?: number;
  style?: React.CSSProperties;
  className?: string;
}

// Sort state interface
interface SortState {
  key: string | null;
  direction: 'asc' | 'desc' | null;
}

// Enhanced theme function for table styling
const getTableTheme = (variant: 'light' | 'dark') => {
  if (variant === 'dark') {
    return {
      background: zinc[900],
      border: zinc[700],
      shadow: '0px 2px 8px rgba(0, 0, 0, 0.5)',
      header: {
        background: zinc[800],
        text: zinc[100],
        border: zinc[700]
      },
      body: {
        background: zinc[900],
        text: zinc[200],
        border: zinc[800],
        hover: zinc[800],
        stripe: zinc[950]
      },
      selected: {
        background: blue[900],
        border: blue[700]
      }
    };
  }

  // Light theme
  return {
    background: '#ffffff',
    border: zinc[200],
    shadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    header: {
      background: zinc[50],
      text: zinc[900],
      border: zinc[200]
    },
    body: {
      background: '#ffffff',
      text: zinc[700],
      border: zinc[200],
      hover: zinc[50],
      stripe: zinc[50]
    },
    selected: {
      background: blue[50],
      border: blue[200]
    }
  };
};

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
  outerBorder = false,
  shadow = true,
  striped = false,
  hoverable = true,
  loading = false,
  pagination = false,
  pageSize = 10,
  style,
  className
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<SortState>({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  // Get theme based on variant
  const tableTheme = getTableTheme(variant);

  // Get row key function
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  // Handle sorting
  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    setSortState(prev => {
      if (prev.key === columnKey) {
        if (prev.direction === 'asc') {
          return { key: columnKey, direction: 'desc' };
        } else if (prev.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  // Handle selection
  const handleRowSelection = (key: string | number, record: T) => {
    if (!selectable || !onSelectionChange) return;

    const newSelectedKeys = selectedRowKeys.includes(key) ? selectedRowKeys.filter(k => k !== key) : [...selectedRowKeys, key];

    const selectedRows = data.filter(item => newSelectedKeys.includes(getRowKey(item, 0)));
    onSelectionChange(newSelectedKeys, selectedRows);
  };

  const handleSelectAll = () => {
    if (!selectable || !onSelectionChange) return;

    const allKeys = data.map((record, index) => getRowKey(record, index));
    const isAllSelected = allKeys.every(key => selectedRowKeys.includes(key));

    const newSelectedKeys = isAllSelected ? [] : allKeys;
    const selectedRows = isAllSelected ? [] : data;
    onSelectionChange(newSelectedKeys, selectedRows);
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) return data;

    return [...data].sort((a, b) => {
      const column = columns.find(col => col.key === sortState.key);
      if (!column) return 0;

      const aValue = column.dataIndex ? a[column.dataIndex] : a[sortState.key!];
      const bValue = column.dataIndex ? b[column.dataIndex] : b[sortState.key!];

      if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortState, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  // Size styles
  const sizeStyles = {
    small: { padding: '8px 12px', fontSize: '14px' },
    medium: { padding: '12px 16px', fontSize: '14px' },
    large: { padding: '16px 20px', fontSize: '16px' }
  };

  // Base table styles
  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: tableTheme.background,
    borderRadius: radius,
    // overflow: 'hidden',
    border: bordered ? `1px solid ${tableTheme.header.border}` : '1px solid transparent',
    boxShadow: shadow ? tableTheme.shadow : 'none',
    ...style
  };

  // Header cell styles
  const headerCellStyles = (align: string = 'left'): React.CSSProperties => ({
    ...sizeStyles[size],
    backgroundColor: tableTheme.header.background,
    color: tableTheme.header.text,
    borderBottom: `1px solid ${tableTheme.header.border}`,
    borderRight: bordered ? `1px solid ${tableTheme.header.border}` : 'none',
    textAlign: align as any,
    fontWeight: 600,
    cursor: sortable ? 'pointer' : 'default',
    userSelect: 'none',
    position: 'sticky',
    top: 0,
    zIndex: 10
  });

  // Body cell styles
  const cellStyles = (align: string = 'left'): React.CSSProperties => ({
    ...sizeStyles[size],
    color: tableTheme.body.text,
    borderBottom: `1px solid ${tableTheme.body.border}`,
    borderRight: bordered ? `1px solid ${tableTheme.body.border}` : '1px solid transparent',
    textAlign: align as any
  });

  // Row styles
  const getRowStyles = (index: number, isSelected: boolean): React.CSSProperties => ({
    backgroundColor: isSelected ? tableTheme.selected.background : striped && index % 2 === 1 ? tableTheme.body.stripe : tableTheme.body.background,
    borderBottom: isSelected ? `1px solid ${tableTheme.selected.border}` : undefined
  });

  if (loading) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          color: tableTheme.body.text,
          backgroundColor: tableTheme.background,
          borderRadius: radius,
          border: bordered ? `1px solid ${tableTheme.border}` : '1px solid transparent'
        }}>
        Loading...
      </div>
    );
  }

  return (
    <div className={className}>
      <table style={tableStyles}>
        <thead>
          <tr>
            {selectable && (
              <th style={headerCellStyles('center')}>
                <input
                  type="checkbox"
                  checked={data.length > 0 && data.every((record, index) => selectedRowKeys.includes(getRowKey(record, index)))}
                  onChange={handleSelectAll}
                  style={{ cursor: 'pointer' }}
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                style={{
                  ...headerCellStyles(column.align),
                  width: column.width
                }}
                onClick={() => column.sortable !== false && handleSort(column.key)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: column.align === 'center' ? 'center' : column.align === 'right' ? 'flex-end' : 'flex-start' }}>
                  {column.title}
                  {sortable && column.sortable !== false && (
                    <span style={{ marginLeft: '8px', opacity: 0.5 }}>{sortState.key === column.key ? (sortState.direction === 'asc' ? '↑' : '↓') : '↕'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((record, index) => {
            const key = getRowKey(record, index);
            const isSelected = selectedRowKeys.includes(key);

            return (
              <tr
                key={key}
                style={getRowStyles(index, isSelected)}
                onMouseEnter={e => {
                  if (hoverable) {
                    e.currentTarget.style.backgroundColor = tableTheme.body.hover;
                  }
                }}
                onMouseLeave={e => {
                  if (hoverable) {
                    e.currentTarget.style.backgroundColor = getRowStyles(index, isSelected).backgroundColor as string;
                  }
                }}>
                {selectable && (
                  <td
                    style={{
                      ...cellStyles('center'),
                      backgroundColor: 'inherit'
                    }}>
                    <input type="checkbox" checked={isSelected} onChange={() => handleRowSelection(key, record)} style={{ cursor: 'pointer' }} />
                  </td>
                )}
                {columns.map(column => {
                  const value = column.dataIndex ? record[column.dataIndex] : record[column.key];
                  const cellContent = column.render ? column.render(value, record, index) : value;

                  return (
                    <td
                      key={column.key}
                      style={{
                        ...cellStyles(column.align),
                        backgroundColor: 'inherit'
                      }}>
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {pagination && (
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            color: tableTheme.body.text
          }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '4px 8px',
              backgroundColor: tableTheme.header.background,
              color: tableTheme.header.text,
              border: `1px solid ${tableTheme.border}`,
              borderRadius: '4px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1
            }}>
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(sortedData.length / pageSize)}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(sortedData.length / pageSize), prev + 1))}
            disabled={currentPage >= Math.ceil(sortedData.length / pageSize)}
            style={{
              padding: '4px 8px',
              backgroundColor: tableTheme.header.background,
              color: tableTheme.header.text,
              border: `1px solid ${tableTheme.border}`,
              borderRadius: '4px',
              cursor: currentPage >= Math.ceil(sortedData.length / pageSize) ? 'not-allowed' : 'pointer',
              opacity: currentPage >= Math.ceil(sortedData.length / pageSize) ? 0.5 : 1
            }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
