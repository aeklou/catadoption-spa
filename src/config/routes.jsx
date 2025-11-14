/*
Author: Abla Eklou
Date: 11/13/2025
File:routes.jsx
Description: create a  routes page
*/
import React from 'react';
import {BrowserRouter,Routes,Route}from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home";
import Adopters from "../pages/adopter/adopters";
import Adopter from "../pages/adopter/adopter";

import NoMatch from "../pages/nomatch";
import Cats from "../pages/cats/cat";
import {AuthProvider} from "../services/useAuth";
import Signin from "../pages/auth/signin";
import Signout from "../pages/auth/signout";
import Signup from "../pages/auth/signup";
import RequireAuth from "../components/RequireAuth";
const AppRoutes = () => {
    return (

        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        {/*<Route path="adopters" element={<Adopters />}/>*/}
                        <Route path="adopters" element={<Adopters/>}>
                            <Route index element={<p>Select a adopter to view details.</p>}/><Route path=":adopterId" element={<Adopter/>} />
                        </Route>
                        <Route path=":adopterId" element={
                            <RequireAuth>
                                <Adopters/>
                            </RequireAuth>
                        }>
                            <Route path="cats" element={<Cats />}/>
                        </Route>
                        <Route path="*" element={<NoMatch/>}/>
                    </Route>
                    <Route path="/signin" element={<Signin/>}/>
                    <Route path="/signout" element={<Signout/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;
