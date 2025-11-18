import React from 'react';
import { Search, Filter, SortAsc, SortDesc, Download } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

import Button from './ui/Button';
import Input from './ui/input';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void;
  onExport: (format: 'json' | 'csv') => void;
  totalUsers: number;
  filteredCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onExport,
  totalUsers,
  filteredCount
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="flex-1 max-w-2xl">
          <Input
            icon={Search}
            placeholder="Search users by name, email, or phone..."
            value={filters.query}
            onChange={(value) => onFiltersChange({ query: value })}
          />
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredCount} of {totalUsers} users
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
            icon={Filter}
          >
            Filters
          </Button>

          <div className="relative group">
            <Button
              variant="secondary"
              icon={Download}
            >
              Export
            </Button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button 
                onClick={() => onExport('json')}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-xl last:rounded-b-xl"
              >
                JSON
              </button>
              <button 
                onClick={() => onExport('csv')}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-xl last:rounded-b-xl"
              >
                CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort By:</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => onFiltersChange({ 
                    sortBy: e.target.value as 'name' | 'email' | 'id' 
                  })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="id">ID</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Order:</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFiltersChange({ 
                    sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
                  })}
                  icon={filters.sortOrder === 'asc' ? SortAsc : SortDesc}
                >
                  {filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchFilters;