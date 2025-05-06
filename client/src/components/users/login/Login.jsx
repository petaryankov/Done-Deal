import { Link, useNavigate } from "react-router";
import { useLogin } from "../../../api/authApi";
import { useActionState, useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import ErrorMessage from "../../error-message/ErrorMessage";

export default function Login() {

    const navigate = useNavigate();
    const [hasServerError, setHasServerError] = useState(false)
    const [serverError, setServerError] = useState({});
    const { userLoginHandler } = useContext(UserContext)
    const { login } = useLogin();



    const loginHandler = async (_, formData) => {
        const { email, password } = Object.fromEntries(formData);

        login(email, password)
            .then((authData) => {
                if (authData.code === 403) {
                    setHasServerError(true);
                    setServerError(authData.message || "Unauthorized access.");
                    // alert(authData.message);
                } else {
                    userLoginHandler(authData);
                    navigate('/');
                }
            })
            .catch((error) => {
                setHasServerError(true);
                setServerError('Server Error During Login!');
                console.error(error);
            });
    };

    const [_, loginAction, isPending] = useActionState(loginHandler);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-red-600">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form id="login" action={loginAction} className="space-y-6">
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    minLength={3}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        {hasServerError && (
                            <ErrorMessage error={serverError} />
                        )}

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit"
                                disabled={isPending}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <Link to="/register" className="ml-2 font-semibold text-red-600 hover:text-red-700">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
