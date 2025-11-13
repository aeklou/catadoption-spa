/*
Author: Abla Eklou
Date: 11/6/2025
File:routes.jsx
Description: create a  routes page
*/
import React from 'react';
import {BrowserRouter,Routes,Route}from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home";
import Adopters from "../pages/adopter/adopters";
import NoMatch from "../pages/nomatch";
const AppRoutes = () => {
    return (

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="adopters" element={<Adopters />}/>
                        <Route path="*" element={<NoMatch/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
          );
};

export default AppRoutes;