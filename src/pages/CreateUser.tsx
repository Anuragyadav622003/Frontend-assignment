import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import UserForm from '../components/UserForm';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/ui/Button';
import { ArrowLeft, UserPlus } from 'lucide-react';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { createUser, loading, error } = useUsers();

  const handleSubmit = async (userData: any) => {
    const newUser = await createUser(userData);
    if (newUser) {
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={handleCancel}
          icon={ArrowLeft}
        >
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New User</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Add a new user to the system</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400 text-sm">!</span>
            </div>
            <div>
              <p className="text-red-800 dark:text-red-200 font-medium">Error</p>
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <LoadingSpinner message="Creating user..." />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Information</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Fill in the details for the new user</p>
            </div>
          </div>

          <UserForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default CreateUser;