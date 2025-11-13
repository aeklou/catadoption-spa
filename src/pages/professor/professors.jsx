/*
Author: Abla Eklou
Date: 11/6/2025
File:professors.jsx
Description: create a  professors page
*/
import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import "../../assets/css/professor.css";

import React from 'react';

const Professors = () => {
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Professors");
    const url = settings.baseApiUrl + "/professors";
    const [professors, setProfessors] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.timeout = 2000; // time in milliseconds
        request.onload = () => { // Request finished.
            setIsLoading (false)
            if (request.status === 200) {
                setProfessors(JSON.parse(request.response));
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
        setSubHeading("All Professors");
    }, [pathname]);

    return (
        <div>
            <div className="main-heading">
                <div className="container">Professor</div>
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
                {professors && <div className="professor-container">
                    <div className="professor-list">
                        {professors.map((professor) => (
                            <NavLink key={professor.id}
                                     className={({isActive}) => isActive ? "active" : ""}
                                     to="#">
                                <span>&nbsp;</span><div>{professor.name}</div>
                            </NavLink>
                        ))}
                    </div>
                    <div className="professor-item">
                        Professor details
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default Professors;