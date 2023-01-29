import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
    let log = {
        'user' : sessionStorage.getItem("IsLoggedIn"),
        'admin': sessionStorage.getItem("IsAdmLoggedIn")
    }
    return (
        log.user || log.admin ? <Outlet/> : <Navigate to="/get-started" />
    )
}

export default ProtectedRoutes
