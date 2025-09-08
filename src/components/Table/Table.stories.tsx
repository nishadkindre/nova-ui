import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table, TableColumn } from './Table';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  lastLogin: string;
  score: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  featured: boolean;
}

// Sample data
const userData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, status: 'active', role: 'Admin', lastLogin: '2024-01-15', score: 95 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, status: 'active', role: 'User', lastLogin: '2024-01-14', score: 87 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, status: 'inactive', role: 'Moderator', lastLogin: '2024-01-10', score: 76 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 29, status: 'pending', role: 'User', lastLogin: '2024-01-12', score: 92 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 38, status: 'active', role: 'Admin', lastLogin: '2024-01-16', score: 88 }
];

const productData: Product[] = [
  { id: 'PRD001', name: 'Wireless Headphones', category: 'Electronics', price: 199.99, stock: 45, rating: 4.5, featured: true },
  { id: 'PRD002', name: 'Coffee Maker', category: 'Appliances', price: 89.99, stock: 23, rating: 4.2, featured: false },
  { id: 'PRD003', name: 'Smartphone', category: 'Electronics', price: 699.99, stock: 12, rating: 4.8, featured: true },
  { id: 'PRD004', name: 'Running Shoes', category: 'Sports', price: 129.99, stock: 67, rating: 4.3, featured: false },
  { id: 'PRD005', name: 'Desk Lamp', category: 'Furniture', price: 59.99, stock: 34, rating: 4.1, featured: false }
];

// User table columns
const userColumns: TableColumn<User>[] = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    width: '200px'
  },
  {
    key: 'email',
    title: 'Email',
    sortable: true
  },
  {
    key: 'age',
    title: 'Age',
    sortable: true,
    align: 'center',
    width: '80px'
  },
  {
    key: 'status',
    title: 'Status',
    sortable: true,
    align: 'center',
    render: (value: User['status']) => {
      const variantMap = {
        active: 'success',
        inactive: 'danger',
        pending: 'warning'
      } as const;

      return (
        <Badge variant={variantMap[value]} size="small">
          {value}
        </Badge>
      );
    }
  },
  {
    key: 'role',
    title: 'Role',
    sortable: true,
    align: 'center'
  },
  {
    key: 'score',
    title: 'Score',
    sortable: true,
    align: 'center',
    render: (value: number) => (
      <span
        style={{
          color: value >= 90 ? '#10b981' : value >= 80 ? '#f59e0b' : '#ef4444',
          fontWeight: 600
        }}>
        {value}%
      </span>
    )
  }
];

// Product table columns
const productColumns: TableColumn<Product>[] = [
  {
    key: 'name',
    title: 'Product',
    sortable: true,
    render: (value: string, record: Product) => (
      <div>
        <div style={{ fontWeight: 600 }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{record.id}</div>
      </div>
    )
  },
  {
    key: 'category',
    title: 'Category',
    sortable: true,
    align: 'center'
  },
  {
    key: 'price',
    title: 'Price',
    sortable: true,
    align: 'right',
    render: (value: number) => `$${value.toFixed(2)}`
  },
  {
    key: 'stock',
    title: 'Stock',
    sortable: true,
    align: 'center',
    render: (value: number) => (
      <span
        style={{
          color: value < 20 ? '#ef4444' : value < 50 ? '#f59e0b' : '#10b981'
        }}>
        {value}
      </span>
    )
  },
  {
    key: 'rating',
    title: 'Rating',
    sortable: true,
    align: 'center',
    render: (value: number) => `${value} ⭐`
  },
  {
    key: 'featured',
    title: 'Featured',
    align: 'center',
    render: (value: boolean) =>
      value ? (
        <Badge variant="primary" size="small">
          Featured
        </Badge>
      ) : null
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'center',
    render: (_, record: Product) => (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <Button size="small" variant="outlined">
          Edit
        </Button>
        <Button size="small" variant="text" color="danger">
          Delete
        </Button>
      </div>
    )
  }
];

// Storybook configuration
const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible and feature-rich table component with sorting, selection, and custom styling. Supports responsive design and accessibility features.'
      }
    }
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the table'
    },
    variant: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Theme variant of the table'
    },
    radius: {
      control: { type: 'text' },
      description: 'Border radius of the table (e.g., "8px", "12px")'
    },
    bordered: {
      control: { type: 'boolean' },
      description: 'Whether to show table borders'
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Whether to show striped rows'
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'Whether to highlight rows on hover'
    },
    sortable: {
      control: { type: 'boolean' },
      description: 'Whether columns are sortable'
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Whether rows are selectable'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state'
    }
  },
  args: {
    size: 'medium',
    variant: 'light',
    radius: '8px',
    bordered: false,
    striped: false,
    hoverable: true,
    sortable: false,
    selectable: false,
    loading: false
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic table
export const Default: Story = {
  args: {
    columns: userColumns as any,
    data: userData as any
  }
};

// With sorting
export const Sortable: Story = {
  args: {
    columns: userColumns as any,
    data: userData as any,
    sortable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on column headers to sort data in ascending or descending order.'
      }
    }
  }
};

// With selection
export const Selectable: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <strong>Selected rows:</strong> {selectedKeys.length} / {userData.length}
          {selectedKeys.length > 0 && <div style={{ marginTop: '8px', fontSize: '14px' }}>Selected IDs: {selectedKeys.join(', ')}</div>}
        </div>

        <Table
          columns={userColumns as any}
          data={userData as any}
          selectable
          selectedRowKeys={selectedKeys}
          onSelectionChange={(keys, rows) => {
            setSelectedKeys(keys);
            console.log('Selected:', { keys, rows });
          }}
          sortable
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tables with row selection support. Use checkboxes to select individual rows or select all.'
      }
    }
  }
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Small</h4>
        <Table columns={userColumns.slice(0, 4)} data={userData.slice(0, 3)} size="small" bordered />
      </div>

      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Medium (Default)</h4>
        <Table columns={userColumns.slice(0, 4)} data={userData.slice(0, 3)} size="medium" bordered />
      </div>

      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Large</h4>
        <Table columns={userColumns.slice(0, 4)} data={userData.slice(0, 3)} size="large" bordered />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tables come in three sizes to accommodate different design needs.'
      }
    }
  }
};

// Table variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Bordered</h4>
        <Table columns={userColumns.slice(0, 4)} data={userData.slice(0, 3)} bordered />
      </div>

      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Striped</h4>
        <Table columns={userColumns.slice(0, 4)} data={userData.slice(0, 3)} striped />
      </div>

      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Bordered + Striped</h4>
        <Table columns={userColumns.slice(0, 4)} data={userData.slice(0, 3)} bordered striped />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for tables including borders and striped rows.'
      }
    }
  }
};

// Product table with actions
export const WithActions: Story = {
  args: {
    columns: productColumns as any,
    data: productData as any,
    sortable: true,
    hoverable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a product table with action buttons and custom cell renderers.'
      }
    }
  }
};

// Empty state
export const EmptyState: Story = {
  args: {
    columns: userColumns as any,
    data: [],
    emptyText: 'No users found'
  },
  parameters: {
    docs: {
      description: {
        story: 'How the table appears when there is no data to display.'
      }
    }
  }
};

// Loading state
export const Loading: Story = {
  args: {
    columns: userColumns as any,
    data: userData as any,
    loading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state shows a centered loading message.'
      }
    }
  }
};

// Complex example with all features
export const FullFeatured: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
    const [currentData, setCurrentData] = useState(userData);

    const handleRowClick = (record: User, index: number) => {
      console.log('Row clicked:', record, 'at index:', index);
    };

    const handleAddUser = () => {
      const newUser: User = {
        id: currentData.length + 1,
        name: 'New User',
        email: 'new@example.com',
        age: 25,
        status: 'pending',
        role: 'User',
        lastLogin: '2024-01-17',
        score: 85
      };
      setCurrentData([...currentData, newUser]);
    };

    const handleDeleteSelected = () => {
      const newData = currentData.filter(user => !selectedKeys.includes(user.id));
      setCurrentData(newData);
      setSelectedKeys([]);
    };

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0' }}>User Management</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Manage your users with sorting, selection, and bulk actions</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button onClick={handleAddUser} variant="filled" color="primary">
              Add User
            </Button>
            <Button onClick={handleDeleteSelected} variant="outlined" color="danger" disabled={selectedKeys.length === 0}>
              Delete Selected ({selectedKeys.length})
            </Button>
          </div>
        </div>

        <Table columns={userColumns} data={currentData} sortable selectable bordered hoverable selectedRowKeys={selectedKeys} onSelectionChange={setSelectedKeys} onRowClick={handleRowClick} />

        {selectedKeys.length > 0 && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#e3f2fd',
              borderRadius: '6px',
              fontSize: '14px'
            }}>
            <strong>{selectedKeys.length}</strong> row(s) selected. Use the actions above to perform bulk operations.
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete example showcasing all table features: sorting, selection, custom renderers, and bulk actions.'
      }
    }
  }
};

// Responsive table
export const Responsive: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <h4 style={{ margin: '0 0 16px 0' }}>Responsive Table (resize window to see effect)</h4>
      <Table
        columns={productColumns}
        data={productData}
        sortable
        bordered
        style={{ minWidth: '800px' }} // Forces horizontal scroll on small screens
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tables automatically become horizontally scrollable when content exceeds container width.'
      }
    }
  }
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <Table
      columns={userColumns.slice(0, 4)}
      data={userData.slice(0, 3)}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      className="custom-table"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tables can be customized with custom styles and CSS classes.'
      }
    }
  }
};

// Dark theme variant
export const DarkTheme: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: '#0f172a',
        padding: '24px',
        borderRadius: '8px',
        minHeight: '400px'
      }}>
      <h3 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Dark Theme Table</h3>
      <Table columns={userColumns} data={userData} variant="dark" sortable selectable striped hoverable bordered radius="12px" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table with dark theme variant for dark mode interfaces. Features enhanced contrast and appropriate colors for dark backgrounds.'
      }
    }
  }
};

// Light vs Dark comparison
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ flex: '1', minWidth: '400px' }}>
        <h4 style={{ marginBottom: '16px' }}>Light Theme</h4>
        <Table columns={userColumns.slice(0, 4)} data={userData.slice(0, 4)} variant="light" sortable striped hoverable bordered radius="8px" />
      </div>
      <div
        style={{
          flex: '1',
          minWidth: '400px',
          backgroundColor: '#0f172a',
          padding: '16px',
          borderRadius: '8px'
        }}>
        <h4 style={{ color: '#f1f5f9', marginBottom: '16px' }}>Dark Theme</h4>
        <Table columns={userColumns.slice(0, 4)} data={userData.slice(0, 4)} variant="dark" sortable striped hoverable bordered radius="8px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme variants showing appropriate colors and contrast for different interface contexts.'
      }
    }
  }
};

// Border radius variations
export const BorderRadiusVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '16px' }}>Sharp Corners (radius: "0px")</h4>
        <Table columns={userColumns.slice(0, 3)} data={userData.slice(0, 3)} radius="0px" bordered striped />
      </div>
      <div>
        <h4 style={{ marginBottom: '16px' }}>Small Radius (radius: "4px")</h4>
        <Table columns={userColumns.slice(0, 3)} data={userData.slice(0, 3)} radius="4px" bordered striped />
      </div>
      <div>
        <h4 style={{ marginBottom: '16px' }}>Medium Radius (radius: "12px")</h4>
        <Table columns={userColumns.slice(0, 3)} data={userData.slice(0, 3)} radius="12px" bordered striped />
      </div>
      <div>
        <h4 style={{ marginBottom: '16px' }}>Large Radius (radius: "20px")</h4>
        <Table columns={userColumns.slice(0, 3)} data={userData.slice(0, 3)} radius="20px" bordered striped />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different border radius options for the table, allowing customization from sharp corners to highly rounded borders.'
      }
    }
  }
};
