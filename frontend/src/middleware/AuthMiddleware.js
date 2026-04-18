import React, {useEffect} from 'react'
import {
    useParams,
    Navigate
  } from "react-router-dom";

const AuthMiddleware = (props) => {
    const userAuthenticated = localStorage.getItem('access') 
    let { id } = useParams();

    useEffect(()=>{

        let par = props.par       
        if(props.par == "product" || props.par == "checkout"){
            par = props.par+`/${id}`
        }
        localStorage.setItem('urlrequested',par)
    },[])

    return (
        <>
            {
                userAuthenticated ? 
                    props.content : 
                    <Navigate to="/login" replace={true} />
            }
        </>
    )
}

export default AuthMiddleware;