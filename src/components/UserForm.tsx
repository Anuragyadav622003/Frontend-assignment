import React, { useState, useEffect } from 'react';
import { User as UserType, UserFormData } from '../types';
import Button from './ui/Button';
import { User, Mail, Phone, Globe, MapPin, Building } from 'lucide-react';
import Input from './ui/input';

interface UserFormProps {
  user?: UserType | null;
  onSubmit: (userData: UserFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel, loading = false }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
    address: {
      street: '',
      city: '',
      zipcode: ''
    },
    company: {
      name: ''
    }
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        website: user.website,
        address: {
          street: user.address.street,
          city: user.address.city,
          zipcode: user.address.zipcode
        },
        company: {
          name: user.company.name
        }
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleNestedChange = (parent: 'address' | 'company', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name *"
          icon={User}
          value={formData.name}
          onChange={(value) => handleChange('name', value)}
          error={errors.name}
          placeholder="Enter full name"
          disabled={loading}
        />

        <Input
          label="Email Address *"
          icon={Mail}
          type="email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          error={errors.email}
          placeholder="Enter email address"
          disabled={loading}
        />

        <Input
          label="Phone Number *"
          icon={Phone}
          type="tel"
          value={formData.phone}
          onChange={(value) => handleChange('phone', value)}
          error={errors.phone}
          placeholder="Enter phone number"
          disabled={loading}
        />

        <Input
          label="Username *"
          icon={User}
          value={formData.username}
          onChange={(value) => handleChange('username', value)}
          error={errors.username}
          placeholder="Enter username"
          disabled={loading}
        />

        <Input
          label="Website"
          icon={Globe}
          value={formData.website}
          onChange={(value) => handleChange('website', value)}
          placeholder="Enter website URL"
          disabled={loading}
        />

        <Input
          label="Company Name"
          icon={Building}
          value={formData.company.name}
          onChange={(value) => handleNestedChange('company', 'name', value)}
          placeholder="Enter company name"
          disabled={loading}
        />
      </div>

      {/* Address Information */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Street"
            value={formData.address.street}
            onChange={(value) => handleNestedChange('address', 'street', value)}
            placeholder="Enter street address"
            disabled={loading}
          />

          <Input
            label="City"
            value={formData.address.city}
            onChange={(value) => handleNestedChange('address', 'city', value)}
            placeholder="Enter city"
            disabled={loading}
          />

          <Input
            label="Zip Code"
            value={formData.address.zipcode}
            onChange={(value) => handleNestedChange('address', 'zipcode', value)}
            placeholder="Enter zip code"
            disabled={loading}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {user ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;