import { useContext } from 'react';
import { UserContext } from '../../../api/contexts/UserContext';

export default function Account() {
  const { username, email, phone } = useContext(UserContext);

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
                    value={username}
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
                    value={email}
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
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={phone}
                    readOnly
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}