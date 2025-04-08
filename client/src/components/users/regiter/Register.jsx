import { useActionState, useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../../api/contexts/UserContext";
import { useRegister } from "../../../api/authApi";

export default function Register() {
  const { userLoginHandler } = useContext(UserContext)
  const navigate = useNavigate()
  const { register } = useRegister();
  const [error, setError] = useState({});
  const [isPaaswordMissmatch, setIsPaaswordMissmatch] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);

  const loginHandler = async (_, formData) => {
    const { email, username, phone, password, confirmPassword } = Object.fromEntries(formData);
    if (password !== confirmPassword) {
      setIsPaaswordMissmatch(true);
      setError('Password missmatch!')
      return;
    }
    register(email, password, username, phone)
      .then(authData => {
        userLoginHandler(authData);
        navigate('/offers');
      })
      .catch(error => {
        setError('Error during registration')
        setHasServerError(true);
        console.error(error.message);
        
      });
  }
  const [_, loginAction, isPending] = useActionState(loginHandler);


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-red-600">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={loginAction} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  minLength={10}
                  maxLength={10}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {isPaaswordMissmatch && (
              <p className="mt-4 text-red-600 justify-center text-center bg-amber-200 font-bold text-lg/6 rounded-md py-1.5">{error}</p>
            )}

            {hasServerError && (
              <p className="mt-4 text-red-600 justify-center text-center bg-amber-200 font-bold text-lg/6 rounded-md py-1.5">{error}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isPending}
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="ml-2 font-semibold text-red-600 hover:text-red-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
