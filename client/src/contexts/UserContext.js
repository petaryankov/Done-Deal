import { createContext } from "react";

export const UserContext = createContext({
    _id: '',
    email: '',
    phone: '',
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
});