import React, { useEffect, useContext, useState }  from 'react'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../parts/Spinner';
import {
    Link,
  } from "react-router-dom";



const Orders = () => {
    const { envVariables, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])


    useEffect(()=>{
        if(envVariables){
            if(user.email){

                getOrders()
            }
        }
    }, [envVariables,user])

    const getOrders = ()=>{
        setLoading(true)
        const config = {
            method: 'get',
            url: `https://www.crypto-gramo.io/wp-json/wc/v3/orders?consumer_key=${envVariables.CONSUMER_KEY}&consumer_secret=${envVariables.CONSUMER_SECRET}&search=${user.email}`,
            headers: { }
        };
          
        axios(config).then(function (response) {
            console.log(response.data);
            setOrders(response.data)
            setLoading(false)

        }).catch(function (error) {
            console.log(error);
        });
          
    }


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
                                                        <h2>Orders</h2>
                                                        <p>See your orders</p>
                                                        
                                                    </div>

                                                   
                                                    <div className="col-12">
                                                        <div className="preview-list">
                                                            {orders.map((item)=>(
                                                                <div className="preview-item border-bottom" key={item.id}>
                                                                    <div className="preview-thumbnail">
                                                                    <div className="preview-icon bg-primary">
                                                                        <i className="mdi mdi-file-document"></i>
                                                                    </div>
                                                                    </div>
                                                                    <div className="preview-item-content d-sm-flex flex-grow">
                                                                    <div className="flex-grow">
                                                                        <h6 className="preview-subject">#{item.id}</h6>
                                                                        <p className="text-muted mb-0">{item.billing.address_1}</p>
                                                                    </div>
                                                                    <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                                        <p className="text-muted">{item.total} GRAMO</p>
                                                                        <p className="text-muted mb-0">{item.date_created.split('T')[0]}</p>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
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

export default Orders;