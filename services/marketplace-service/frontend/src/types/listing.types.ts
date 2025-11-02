export interface Listing {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: 'furniture' | 'books' | 'electronics' | 'utilities' | 'clothing' | 'sports' | 'other';
    condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
    images: string[];
    status: 'available' | 'sold' | 'reserved';
    contactInfo: {
      phone?: string;
      room?: string;
      hostel?: string;
    };
    createdBy: {
      _id: string;
      email: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateListingData {
    title: string;
    description: string;
    price: number;
    category: string;
    condition: string;
    images: string[];
    contactInfo: {
      phone?: string;
      room?: string;
      hostel?: string;
    };
  }