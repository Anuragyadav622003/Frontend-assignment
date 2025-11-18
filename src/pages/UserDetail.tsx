import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { User } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/ui/Button';
import { ArrowLeft, Mail, Phone, MapPin, Globe, Building, Calendar } from 'lucide-react';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, loading } = useUsers();

  const user: User | undefined = users.find(u => u.id === parseInt(id || '0'));

  if (loading && users.length === 0) {
    return <LoadingSpinner size="large" message="Loading user details..." />;
  }

  if (!user) {
    return (
      <div className="min-h-96 flex flex-col items-center justify-center text-center">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8 max-w-md">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The user you're looking for doesn't exist.</p>
          <Button
            onClick={() => navigate('/')}
            variant="primary"
          >
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          icon={ArrowLeft}
        >
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Details</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <p className="text-blue-100 text-lg">@{user.username}</p>
              <p className="text-blue-100 mt-2">{user.company?.name}</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <a 
                      href={`mailto:${user.email}`}
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <a 
                      href={`tel:${user.phone}`}
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {user.phone}
                    </a>
                  </div>
                </div>

                {user.website && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                      <a 
                        href={`http://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {user.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Address & Company */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                Address & Company
              </h3>
              
              <div className="space-y-4">
                {user.address && (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p className="text-gray-900 dark:text-white">
                        {user.address.street}, {user.address.suite}<br />
                        {user.address.city}, {user.address.zipcode}
                      </p>
                      {user.address.geo && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          📍 {user.address.geo.lat}, {user.address.geo.lng}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {user.company && (
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <Building className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                      <p className="text-gray-900 dark:text-white font-semibold">{user.company.name}</p>
                      {user.company.catchPhrase && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 italic">
                          "{user.company.catchPhrase}"
                        </p>
                      )}
                      {user.company.bs && (
                        <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                          {user.company.bs}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                    <p className="text-gray-900 dark:text-white font-mono">#{user.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
        >
          Back to Users List
        </Button>
        <Link to={`/users/edit/${user.id}`} state={{ user }}>
          <Button variant="primary">
            Edit User
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;