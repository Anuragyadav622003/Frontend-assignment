export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

export interface SearchFilters {
  query: string;
  sortBy: 'name' | 'email' | 'id';
  sortOrder: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}