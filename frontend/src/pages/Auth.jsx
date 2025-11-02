import React, { useState } from 'react';

export default function Auth({ showMessage }) {
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submit = (e) => {
    e.preventDefault();
    showMessage(tab === 'signin' ? 'Sign in successful!' : 'Account created (mock)');
    setEmail('');
    setPass('');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Join the Community</h2>
        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setTab('signin')}
            className={`px-6 py-2 rounded-full ${
              tab === 'signin'
                ? 'bg-blue-50 border border-blue-600 text-blue-600'
                : 'border border-gray-300 text-gray-500'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`px-6 py-2 rounded-full ${
              tab === 'signup'
                ? 'bg-blue-50 border border-blue-600 text-blue-600'
                : 'border border-gray-300 text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Institute Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="e.g., username@iiitg.ac.in"
              className="w-full px-4 py-2 rounded-lg border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              className="w-full px-4 py-2 rounded-lg border"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg"
          >
            {tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
