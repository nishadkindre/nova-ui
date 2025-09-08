import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table, TableColumn } from './Table';

// Mock data for testing
interface TestData {
  id: number;
  name: string;
  age: number;
  email: string;
  status: string;
}

const mockColumns: TableColumn<TestData>[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true
  },
  {
    key: 'age',
    title: 'Age',
    sortable: true,
    align: 'center'
  },
  {
    key: 'email',
    title: 'Email'
  },
  {
    key: 'status',
    title: 'Status',
    render: value => <span style={{ color: value === 'active' ? 'green' : 'red' }}>{value}</span>
  }
];

const mockData: TestData[] = [
  { id: 1, name: 'John Doe', age: 25, email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', age: 30, email: 'jane@example.com', status: 'inactive' },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', status: 'active' }
];

describe('Table Component', () => {
  // Test 1: Basic rendering
  it('renders table with data', () => {
    render(<Table columns={mockColumns} data={mockData} />);

    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  // Test 2: Empty state
  it('shows empty message when no data', () => {
    render(<Table columns={mockColumns} data={[]} />);

    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  // Test 3: Custom empty message
  it('shows custom empty message', () => {
    render(<Table columns={mockColumns} data={[]} emptyText="Custom empty message" />);

    expect(screen.getByText('Custom empty message')).toBeInTheDocument();
  });

  // Test 4: Loading state
  it('shows loading state', () => {
    render(<Table columns={mockColumns} data={mockData} loading />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  // Test 5: Sorting functionality
  it('sorts data when column header is clicked', () => {
    render(<Table columns={mockColumns} data={mockData} sortable />);

    const nameHeader = screen.getByText('Name');

    // First click - ascending sort
    fireEvent.click(nameHeader);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Bob Johnson'); // Should be first after sorting

    // Second click - descending sort
    fireEvent.click(nameHeader);

    const rowsDesc = screen.getAllByRole('row');
    expect(rowsDesc[1]).toHaveTextContent('John Doe'); // Should be first in descending order
  });

  // Test 6: Selection functionality
  it('handles row selection', () => {
    const onSelectionChange = jest.fn();
    render(<Table columns={mockColumns} data={mockData} selectable onSelectionChange={onSelectionChange} />);

    // Check for checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4); // 3 rows + 1 header

    // Click first row checkbox
    fireEvent.click(checkboxes[1]);

    expect(onSelectionChange).toHaveBeenCalledWith([1], [mockData[0]]);
  });

  // Test 7: Select all functionality
  it('handles select all', () => {
    const onSelectionChange = jest.fn();
    render(<Table columns={mockColumns} data={mockData} selectable onSelectionChange={onSelectionChange} />);

    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];

    fireEvent.click(selectAllCheckbox);

    expect(onSelectionChange).toHaveBeenCalledWith([1, 2, 3], mockData);
  });

  // Test 8: Custom render function
  it('uses custom render function', () => {
    render(<Table columns={mockColumns} data={mockData} />);

    // Status column uses custom render with colored text
    const activeStatus = screen.getAllByText('active');
    expect(activeStatus[0]).toHaveStyle('color: green');

    const inactiveStatus = screen.getByText('inactive');
    expect(inactiveStatus).toHaveStyle('color: red');
  });

  // Test 9: Row click handler
  it('calls onRowClick when row is clicked', () => {
    const onRowClick = jest.fn();
    render(<Table columns={mockColumns} data={mockData} onRowClick={onRowClick} />);

    const firstRow = screen.getAllByRole('row')[1]; // Skip header row
    fireEvent.click(firstRow);

    expect(onRowClick).toHaveBeenCalledWith(mockData[0], 0);
  });

  // Test 10: Different sizes
  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<Table columns={mockColumns} data={mockData} size={size} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();

      unmount();
    });
  });

  // Test 11: Bordered table
  it('renders with border', () => {
    const { container } = render(<Table columns={mockColumns} data={mockData} bordered />);

    const table = container.querySelector('table');
    expect(table).toHaveStyle('border: 1px solid #e2e8f0');
  });

  // Test 12: Striped rows
  it('renders with striped rows', () => {
    render(<Table columns={mockColumns} data={mockData} striped />);

    // Should render without errors
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // Test 13: Hoverable rows
  it('enables hover on rows when hoverable', () => {
    render(<Table columns={mockColumns} data={mockData} hoverable />);

    const firstRow = screen.getAllByRole('row')[1];

    // Test hover behavior
    fireEvent.mouseEnter(firstRow);
    fireEvent.mouseLeave(firstRow);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // Test 14: Custom row key function
  it('uses custom row key function', () => {
    const customRowKey = (record: TestData) => `user-${record.id}`;

    render(<Table columns={mockColumns} data={mockData} rowKey={customRowKey} selectable />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // Test 15: Column alignment
  it('applies column alignment', () => {
    render(<Table columns={mockColumns} data={mockData} />);

    // Age column should be center-aligned
    const ageHeader = screen.getByText('Age');
    expect(ageHeader).toHaveStyle('text-align: center');
  });

  // Test 16: Column width
  it('applies column width', () => {
    const columnsWithWidth = [{ ...mockColumns[0], width: '200px' }, ...mockColumns.slice(1)];

    render(<Table columns={columnsWithWidth} data={mockData} />);

    const nameHeader = screen.getByText('Name');
    expect(nameHeader).toHaveStyle('width: 200px');
  });

  // Test 17: Custom className
  it('applies custom className', () => {
    const { container } = render(<Table columns={mockColumns} data={mockData} className="custom-table" />);

    const tableContainer = container.firstChild;
    expect(tableContainer).toHaveClass('custom-table');
  });

  // Test 18: Custom styles
  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'lightblue' };
    const { container } = render(<Table columns={mockColumns} data={mockData} style={customStyle} />);

    const table = container.querySelector('table');
    expect(table).toHaveStyle('background-color: lightblue');
  });

  // Test 19: Uncontrolled selection
  it('manages selection internally when not controlled', () => {
    render(<Table columns={mockColumns} data={mockData} selectable />);

    const checkboxes = screen.getAllByRole('checkbox');

    // Initially unchecked
    expect(checkboxes[1]).not.toBeChecked();

    // Click to select
    fireEvent.click(checkboxes[1]);
    expect(checkboxes[1]).toBeChecked();
  });

  // Test 20: Sort indicators
  it('shows sort indicators when sortable', () => {
    render(<Table columns={mockColumns} data={mockData} sortable />);

    const nameHeader = screen.getByText('Name');

    // Should have sort indicator
    expect(nameHeader.parentElement).toHaveTextContent('↕');

    // Click to sort
    fireEvent.click(nameHeader);
    expect(nameHeader.parentElement).toHaveTextContent('↑');

    // Click again to reverse sort
    fireEvent.click(nameHeader);
    expect(nameHeader.parentElement).toHaveTextContent('↓');
  });
});
