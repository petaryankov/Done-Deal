import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid';
import { useContext, useState } from "react";
import { Link } from 'react-router';
import { UserContext } from '../../api/contexts/UserContext';

const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Offers', path: '/offers' },
    { name: 'Register', path: '/register' },
    { name: 'Create Offer', path: '/create' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { username } = useContext(UserContext);

     // Filter out navigation items based on the user state
     const filteredNavigation = navigation.filter(item => {
        if (!username && item.name === 'Create Offer') return false; // Hide "Create Offer" when no user
        if (username && item.name === 'Register') return false; // Hide "Register" when there is a user
        return true;
    });

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <img
                                alt="logo"
                                src="/images/donedeal-logo.png"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <Bars3Icon aria-hidden="true" className="size-8 text-red-600 hover:bg-gray-100" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {filteredNavigation.map((item) => (
                            <Link key={item.name} to={item.path} className="block rounded-lg px-3 py-1 text-m/6 font-bold text-red-600 hover:bg-gray-100">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    {!username
                        ?
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link to="/login" className="text-m/6 font-bold text-red-600 block rounded-lg px-3 py-1 hover:bg-gray-100">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                        :
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <UserIcon className='size-6  text-red-600 mt-1' />
                            <Link to="/account" className="text-m/6 font-bold text-red-600 block rounded-lg px-3 py-1 hover:bg-gray-100">
                                {username}
                            </Link>
                            <Link to="/logout" className="text-m/6 font-bold text-red-600 block rounded-lg px-3 py-1 hover:bg-gray-100">
                                Logout <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    }

                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <img
                                    alt="logo"
                                    src="/images/donedeal-logo.png"
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <XMarkIcon aria-hidden="true" className="size-7 text-red-600 hover:bg-gray-100" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {filteredNavigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-bold text-red-600 hover:bg-gray-100"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                {!username
                                    ?
                                    <div className="py-6">
                                        <Link
                                            to="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-bold text-red-600 hover:bg-gray-100"
                                        >
                                            Log in
                                        </Link>
                                    </div>
                                    :
                                    <div className="py-6">
                                        <Link
                                            to="/account"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-bold text-red-600 hover:bg-gray-100"
                                        >
                                            {username}
                                        </Link>
                                        <Link
                                            to="/logout"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-bold text-red-600 hover:bg-gray-100"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </>
    );
}