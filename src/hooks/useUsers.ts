import { useState, useEffect, useCallback } from 'react';
import { User, UserFormData, SearchFilters } from '../types';
import toast from 'react-hot-toast';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const applyFilters = useCallback((usersList: User[], filters: SearchFilters) => {
    let filtered = usersList;

    if (filters.query) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.query.toLowerCase()) ||
        user.phone.includes(filters.query)
      );
    }

    filtered = [...filtered].sort((a, b) => {
      const aValue = a[filters.sortBy] as string;
      const bValue = b[filters.sortBy] as string;
      return filters.sortOrder === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    return filtered;
  }, []);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data: User[] = await response.json();
      setUsers(data);
      setFilteredUsers(applyFilters(data, filters));
      toast.success('Users loaded successfully!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: UserFormData): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) throw new Error('Failed to create user');
      
      const newUser: User = await response.json();
      const userWithId = { ...newUser, id: Date.now() };
      
      setUsers(prev => {
        const updated = [...prev, userWithId];
        setFilteredUsers(applyFilters(updated, filters));
        return updated;
      });
      
      toast.success('User created successfully!');
      return userWithId;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create user';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: number, userData: UserFormData): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) throw new Error('Failed to update user');
      
      const updatedUser: User = await response.json();
      
      setUsers(prev => {
        const updated = prev.map(user => user.id === id ? { ...updatedUser, id } : user);
        setFilteredUsers(applyFilters(updated, filters));
        return updated;
      });
      
      toast.success('User updated successfully!');
      return updatedUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete user');
      
      setUsers(prev => {
        const updated = prev.filter(user => user.id !== id);
        setFilteredUsers(applyFilters(updated, filters));
        return updated;
      });
      
      toast.success('User deleted successfully!');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    setFilteredUsers(applyFilters(users, updatedFilters));
  };

  const exportUsers = (format: 'json' | 'csv') => {
    const data = format === 'json' 
      ? JSON.stringify(users, null, 2)
      : convertToCSV(users);
    
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Users exported as ${format.toUpperCase()}!`);
  };

  const convertToCSV = (users: User[]): string => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Website', 'Company'];
    const rows = users.map(user => [
      user.id,
      `"${user.name}"`,
      `"${user.email}"`,
      `"${user.phone}"`,
      `"${user.website}"`,
      `"${user.company?.name}"`
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users: filteredUsers,
    allUsers: users,
    loading,
    error,
    filters,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    updateFilters,
    exportUsers,
  };
};