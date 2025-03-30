import { Navigate } from "react-router";
import { useLogout } from "../../../../api/authApi";
import Loader from "../../../loader/Loader";

export default function Logout() {
    const {isLoggedOut} = useLogout()
    return (
        isLoggedOut ? <Navigate to="/" /> : <Loader />
    );
}