import { useContext, useEffect } from "react";
import request from "../utils/request";
import { UserContext } from "./contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {

    const login = async (email, password) => 
        request.post(`${baseUrl}/login`, { email, password });

    return {
        login,
    }
}

export const useRegister = () => {
    const register = (email, password, username, phone) => 
        request.post(`${baseUrl}/register`, { email, password, username, phone });
    
    return {
        register,
    }
}

export const useLogout = () => {
    const { accessToken, userLogoutHandler} = useContext(UserContext);

    useEffect(() => {

        if (!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        }

        request.get(`${baseUrl}/logout`, null, options)
        .then(userLogoutHandler);

    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    }

    
}
