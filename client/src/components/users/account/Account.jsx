import { useState } from 'react';
import { Link } from 'react-router';

export default function Account() {
  const [user, setUser] = useState({
    username: 'JohnDoe123',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <h2 className="text-center text-2xl font-bold text-red-600">
            My Profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form action="#" method="POST" className="space-y-6">
            {/* Profile Info */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={user.username}
                    readOnly
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2 flex space-x-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={user.firstName}
                    readOnly
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={user.lastName}
                    readOnly
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-900"
                >
                  Current Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Changes
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/settings"
              className="font-semibold text-red-600 hover:text-red-700"
            >
              Account Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}