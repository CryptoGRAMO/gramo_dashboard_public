import React, { useEffect, useContext, useState }  from 'react'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../parts/Spinner';
import {
    Link,
    useParams
  } from "react-router-dom";
import parse from 'html-react-parser';


const Product = () => {
    let { id } = useParams();
    const { envVariables } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [product, setproduct] = useState([])

    useEffect(()=>{
        if(envVariables){
            getProduct()
        }
    }, [envVariables])

    const getProduct = ()=>{
        setLoading(true)
        const config = {
            method: 'get',
            url: `https://www.crypto-gramo.io/wp-json/wc/v3/products/${id}?consumer_key=${envVariables.CONSUMER_KEY}&consumer_secret=${envVariables.CONSUMER_SECRET}`,
            headers: { }
        };
          
        axios(config).then(function (response) {
            console.log(response.data);
            setproduct(response.data)
            setLoading(false)

            response.data.categories.map((c)=>{
                console.log(c)
            })
   

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
                                                    <div className='col-md-6'>
                                                        <img  src={product.images[0].src} className="img-fluid"/>
                                                    </div>
                                                    <div className='col-md-6 d-flex align-items-center justify-content-center'>
                                                        <div className='p-4'>
                                                            <h1 className='py-2'>{product.name}</h1>
                                                            <p>{product.price} GRAMO</p>
                                                            <div className='py-4'></div>
                                                            {parse(product.description)}
                                                            <button className='btn btn-success btn-lg text-dark'>
                                                                <Link to={`/checkout/${id}`} className="clean-link">
                                                                    Buy
                                                                </Link>
                                                            </button>
                                                            <div className='py-5'></div>
                        
                                                            <div className='categories'>
                                                                <div>Categories: </div>
                                                                {product.categories.map((c, index)=>
                                                                    <span key={index} className='btn bg-dark text-white'>{c.name}</span>
                                                                )}
                                                            </div>
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

export default Product;