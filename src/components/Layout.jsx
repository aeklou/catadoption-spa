/*
Author: Abla Eklou
Date: 11/6/2025
File: Layout.js
Description: create the layout page.
*/

import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
