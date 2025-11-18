import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import SearchFilters from '../components/SearchFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/ui/Button';
import { Plus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { users, allUsers, loading, error, updateUser, deleteUser, filters, updateFilters, exportUsers } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setShowEditForm(true);
  };

  const handleUpdate = async (userData: any) => {
    if (editingUser) {
      const success = await updateUser(editingUser.id, userData);
      if (success) {
        setShowEditForm(false);
        setEditingUser(null);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };
 const handleView = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingUser(null);
  };

  if (loading && users.length === 0) {
    return <LoadingSpinner size="large" message="Loading users..." />;
  }

  if (error && users.length === 0) {
    return (
      <div className="min-h-96 flex flex-col items-center justify-center text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error Loading Users</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Efficiently manage your users with our intuitive interface</p>
        </div>
        <Link to="/users/create">
          <Button
            variant="primary"
            icon={Plus}
          >
            Add New User
          </Button>
        </Link>
      </div>

      <SearchFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onExport={exportUsers}
        totalUsers={allUsers.length}
        filteredCount={users.length}
      />

      {showEditForm && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit User</h2>
            <UserForm
              user={editingUser}
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
              loading={loading}
            />
          </div>
        </div>
      )}

      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Users Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Get started by creating your first user.</p>
          <Link to="/users/create">
            <Button
              variant="primary"
              icon={Plus}
            >
              Create User
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;