'use client';

import { useState } from 'react';
import { Card, Title, TextInput, Button, Select, SelectItem, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const roles = ['Admin', 'Manager', 'User'];
const statuses = ['Active', 'Inactive'];

export default function AdminSettings() {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
  });

  const [users, setUsers] = useState<User[]>([]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement user creation logic
    console.log('Adding new user:', newUser);
  };

  return (
    <div className="space-y-6">
      <div>
        <Title>User Management</Title>
      </div>

      <Card>
        <form onSubmit={handleAddUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <TextInput
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="User name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <TextInput
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <Select
                id="role"
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value })}
              >
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <Select
                id="status"
                value={newUser.status}
                onValueChange={(value) => setNewUser({ ...newUser, status: value })}
              >
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Add User
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge color={user.status === 'Active' ? 'green' : 'red'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="xs" variant="secondary">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 