import React, { useEffect, useContext, useState }  from 'react'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../parts/Spinner';
import {
    Link,
    useNavigate ,
    useParams
  } from "react-router-dom";



const OrderCompleted = () => {
    let navigate = useNavigate();
    let { id } = useParams();
    const { envVariables, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        if(envVariables){

        }
    }, [envVariables])

    return (
        <>
            {/* <!-- partial --> */}
            <div className="main-panel">
                <div className="content-wrapper">
                    {svgs.poligon(90)}
                    {svgs.circle2(180)}

                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    
                                    {!loading ? <div>

                                        <section className="">
                                            <div className="container">
                                                <div className="row">
                                                    <div className='col-md-12'>
                                                        <h2>Order Completed successfully:</h2>
                                                        <p>Go to orders to see more information</p>
                                                        <Link to="/" className='btn btn-success text-dark'>
                                                            Orders
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div> : <Spinner />}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Footer />

            </div>
            {/* <!-- main-panel ends --> */}
        </>
    )
}

export default OrderCompleted;