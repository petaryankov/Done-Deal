import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
    const { email } = useContext(UserContext);

    if (!email) {
        return <Navigate to= '/login' />
        
    }
    return (
        <Outlet />
    );
}