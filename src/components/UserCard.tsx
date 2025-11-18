import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { motion } from 'framer-motion';
import { User } from '../types';
import { Edit2, Trash2, Eye, Mail, Phone, Globe, Building } from 'lucide-react';
import Button from './ui/Button';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onView: (user: User) => void; // You can remove this prop if using Link
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete, onView, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-purple-600"></div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <motion.div 
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {user.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">@{user.username}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <Mail className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="text-sm truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <Phone className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="text-sm">{user.phone}</span>
        </div>
        {user.website && (
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Globe className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-sm truncate">{user.website}</span>
          </div>
        )}
        {user.company?.name && (
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <Building className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-sm truncate">{user.company.name}</span>
          </div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        className="flex gap-2 justify-end"
      >
        {/* FIX: Use Link for View button */}
        <Link to={`/users/${user.id}`}>
          <Button
            variant="ghost"
            size="sm"
            icon={Eye}
          >
            View
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(user)}
          icon={Edit2}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(user.id)}
          icon={Trash2}
        >
          Delete
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default UserCard;