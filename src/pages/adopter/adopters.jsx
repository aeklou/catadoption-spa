/*
Author: Abla Eklou
Date: 11/6/2025
File:adopters.jsx
Description: create a  adopters page
*/
import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import "../../assets/css/adopter.css";

import React from 'react';

const Adopters = () => {
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Adopters");
    const url = settings.baseApiUrl + "/adopters";
    const [adopters, setAdopters] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.timeout = 2000; // time in milliseconds
        request.onload = () => { // Request finished.
            setIsLoading (false)
            if (request.status === 200) {
                setAdopters(JSON.parse(request.response));
            } else {
                setError("Status: " + request.status + "; Error: " + request.statusText);
            }
        }
        request.ontimeout = () => { // Request timed out.
            setIsLoading (false);
            setError("Error: The request has timed out.");
        }
        request.send();
    });
    useEffect(() => {
        setSubHeading("All Adopters");
    }, [pathname]);

    return (
        <div>
            <div className="main-heading">
                <div className="container">Adopter</div>
            </div>
            <div className="sub-heading">
                <div className="container">{subHeading}</div>
            </div>
            <div className="main-content container">
                {error && <div>{error}</div>}
                {isLoading && <div className="image-loading">
                    Please wait while data is being loaded
                    <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                </div>}
                {adopters && <div className="adopter-container">
                    <div className="adopter-list">
                        {adopters.map((adopter) => (
                            <NavLink key={adopter.id}
                                     className={({isActive}) => isActive ? "active" : ""}
                                     to="#">
                                <span>&nbsp;</span><div>{adopter.name}</div>
                            </NavLink>
                        ))}
                    </div>
                    <div className="adopter-item">
                        Adopter details
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default Adopters;
