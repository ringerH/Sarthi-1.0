import { useState, useEffect } from 'react';
import { listingService } from './services/api';
import { Listing, CreateListingData } from './types/listing.types';

function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CreateListingData>({
    title: '',
    description: '',
    price: 0,
    category: 'electronics',
    condition: 'good',
    images: [],
    contactInfo: {
      phone: '',
      room: '',
      hostel: ''
    }
  });

  // Fetch listings on mount
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await listingService.getAllListings();
      setListings(data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await listingService.createListing(formData);
      alert('Listing created successfully!');
      setShowForm(false);
      fetchListings(); // Refresh listings
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: 0,
        category: 'electronics',
        condition: 'good',
        images: [],
        contactInfo: { phone: '', room: '', hostel: '' }
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create listing');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || 0 : value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Campus Marketplace</h1>
          <p className="text-blue-100 mt-1">Buy and sell items on campus</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Available Items ({listings.length})
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {showForm ? 'Cancel' : '+ Create Listing'}
          </button>
        </div>

        {/* Create Listing Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Create New Listing</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="books">Books</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                    <option value="sports">Sports</option>
                    <option value="utilities">Utilities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contactInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                  <input
                    type="text"
                    name="contact.room"
                    value={formData.contactInfo.room}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hostel</label>
                  <input
                    type="text"
                    name="contact.hostel"
                    value={formData.contactInfo.hostel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
              >
                Create Listing
              </button>
            </form>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        )}

        {/* Listings Grid */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No listings found. Create the first one!</p>
          </div>
        )}

        {!loading && listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-5"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.status}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {listing.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {listing.category}
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {listing.condition}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{listing.price}
                  </span>
                  {listing.contactInfo.phone && (
                    <span className="text-xs text-gray-500">
                      📞 {listing.contactInfo.phone}
                    </span>
                  )}
                </div>

                {listing.contactInfo.hostel && (
                  <p className="text-xs text-gray-500 mt-2">
                    🏢 {listing.contactInfo.hostel} {listing.contactInfo.room && `- Room ${listing.contactInfo.room}`}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-2">
                  Posted by: {listing.createdBy.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;