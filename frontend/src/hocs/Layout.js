import React, { useState, useContext } from 'react'
import Navbar from '../components/Navbar';
import NavbarTop from '../components/NavbarTop';
import { useLocation, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

const Layout = ({children}) => {
    const { slugsToExcludeLayout } = useContext(AuthContext);
    const isSlug = slugsToExcludeLayout.includes(useLocation().pathname)
    const userAuthenticated = localStorage.getItem('access') 
    
    const matchAny= () =>{
        if(useLocation().pathname.split("/").includes("activate")){
            return true
        }
        if(useLocation().pathname.split("/").includes("password") && useLocation().pathname.split("/").includes("reset")){
            return true
        }
        if(isSlug){
            return true
        } 
        if(!isSlug){
            return false
        }

    }

    return (
        <>
            {!matchAny() && userAuthenticated && <Navbar />}
            <div className={`container-fluid page-body-wrapper ${matchAny() && "full-page-wrapper"}`}> 
                {!matchAny() && userAuthenticated && <NavbarTop />}
                {children}
            </div>
        </>
    )
}

export default Layout;