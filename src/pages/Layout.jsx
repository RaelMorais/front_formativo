import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

import { Outlet, useLocation } from "react-router-dom";

export function Layout(){
        const location = useLocation();
        const showLayout = location.pathname !== '/login';
    return(
       
        <>
        {showLayout && <NavBar />}
        <Outlet />
        {showLayout && <Footer />}
        </>
    )
}