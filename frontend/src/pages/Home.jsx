import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const ads = [
    {
      title: 'IIITG Tech Fest 2025',
      subtitle: 'Tech Fest Banner',
      description:
        'Join the biggest campus event of the year — competitions, concerts, and more!',
      img: 'https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'IIITG Lost & Found Portal',
      subtitle: 'Lost and Found Banner',
      description:
        'Lost something on campus? Post or browse items here — quick and secure.',
      img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'IIITG Merchandise Store',
      subtitle: 'Merchandise Banner',
      description:
        'Get your hoodies, mugs, and tees with the official IIITG logo!',
      img: 'https://images.unsplash.com/photo-1607083206968-13611e3d76c7?auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-600 dark:text-blue-400 leading-tight mb-4">
          IIITG Student Community Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Your one-stop platform for carpooling and a campus marketplace. Connect, collaborate, and make campus life easier.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/carpool"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all"
          >
            Find a Ride
          </Link>
          <Link
            to="/marketplace"
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            Buy & Sell
          </Link>
        </div>
      </section>

      {/* Dynamic Ads Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 mt-10 rounded-xl shadow-inner">
        <h2 className="text-center text-3xl font-extrabold mb-10 text-gray-800 dark:text-gray-200">
          Sponsored & Announcements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ads.map((ad, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <img
                src={ad.img}
                alt={ad.subtitle}
                className="mx-auto rounded-lg mb-4 w-full h-40 object-cover"
              />
              <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">{ad.subtitle}</h4>
              <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{ad.description}</p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  )
}
