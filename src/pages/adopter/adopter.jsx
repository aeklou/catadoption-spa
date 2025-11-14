/*
Author: Abla Eklou
Date: 11/13/2025
File: useXmlHttp.jsx
Description: display detail of specific adopter
*/


import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams, Link, useOutletContext, Outlet} from "react-router-dom";
import "../../assets/css/adopter.css";

import React from 'react';

const Adopter= () => {
    //add code here to get data from the API server using the useXmlHttp service
    const [subheading, setSubHeading] = useOutletContext();
    const {adopterId} = useParams();
    const url = settings.baseApiUrl + "/adopters/" + adopterId;
    const {
        error,
        isLoading,
        data: adopter
    } = useXmlHttp(url);
    return (
        <div>
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src="/src/assets/img/loading.gif" alt="Loading ......"/>
                </div>}
            {adopter && <>
                {setSubHeading(adopter.name)}
                <div className="adopter-details">
                    {/*<div className="adopter-name">{adopter.name}</div>*/}
                    <div className="adopter-info">
                        <div><strong>Department</strong>: {adopter.department}</div>
                        <div><strong>Program</strong>: {adopter.program}</div>
                        <div><strong>Email</strong>: {adopter.email}</div>
                        <div><strong>Phone</strong>: {adopter.phone}</div>
                        <div><strong>Office</strong>: {adopter.office}</div>
                        <div><strong>Profile</strong>:<a href={adopter.url} target="_blank">Click here to view profile</a></div>
                        <div><strong>Classes</strong>: <Link to="{`/adopters/${adopter.id}/classes`}">Click here to view classes</Link></div>
                    </div>
                    <div className="adopter-photo">
                        <img src={adopter.image} alt={adopter.name} id={adopter.id}/>
                    </div>
                </div>
                <div className="adopter-classes">
                    <Outlet/>
                </div>
            </>}
        </div>
    );
};

export default Adopter;
