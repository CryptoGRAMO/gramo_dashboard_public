import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate  } from 'react-router-dom'
import GramoTitles from '../components/GramoTitles'
import { AuthContext } from '../context/AuthContext';
import { useLocation, useParams } from 'react-router-dom'

const Activated = () => {
    const { activateUser } = useContext(AuthContext);
    const par = useParams()

    const userAuthenticated = localStorage.getItem('access') 
    
    if(userAuthenticated){
        window.location.replace('/')
    }

    useEffect(()=>{
        activateUser(par.uid, par.token)
    },[])

    return (
        <>

           {!userAuthenticated && <div className="row w-100 m-0">
                <GramoTitles />

                <div className="content-wrapper has-curtain full-page-wrapper d-flex align-items-center auth login-bg">
                    <div className="card col-lg-4 mx-auto z-index-99">

                        <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Activated</h3>
                            
                            <div className='py-4'>
                                <p className="sign-up text-left">Go to <Link to='/login'>Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            {/* <!-- content-wrapper ends --> */}
            </div>}
        </>
    )
}

export default Activated;