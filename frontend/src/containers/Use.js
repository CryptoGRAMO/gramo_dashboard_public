import React, { useEffect, useContext, useState }  from 'react'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../parts/Spinner';
import { Link } from 'react-router-dom';


const Use = () => {
    const { envVariables } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [products, setproducts] = useState([])

    useEffect(()=>{
        if(envVariables){
            getProducts()
        }
        console.log(envVariables)
    }, [envVariables])

    const getProducts = ()=>{
        setLoading(true)
        const config = {
            method: 'get',
            url: `https://www.crypto-gramo.io/wp-json/wc/v3/products?consumer_key=${envVariables.CONSUMER_KEY}&consumer_secret=${envVariables.CONSUMER_SECRET}`,
            headers: { }
        };
          
        axios(config).then(function (response) {
            console.log(response.data);
            setproducts(response.data)
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
                                    <h4 className="card-title">PRODUCTS</h4>
                                    
                                    {!loading ? <div>

                                        <section className="section-products">
                                            <div className="container">
                                                <div className="row">
                                                    {products.map((p)=>
                                                        <div key={p.id} className="col-md-6 col-lg-4 col-xl-3">
                                                            <div  id={"product-"+p.id} className="single-product" >
                                                                    <Link to={`/product/${p.id}`}>
                                                                        <div className={"product-"+p.id+" part-1 prod-imag"} style={{backgroundImage:`url(${p.images[0].src})`}}>
                                                                                <ul>
                                                                                    <li>
                                                                                        {/* <a className='btn btn-success text-dark' href="#">
                                                                                            Buy
                                                                                        </a> */}
                                                                                    </li>
                                                                                    {/* <li><a href="#"><i className="fas fa-heart"></i></a></li>
                                                                                    <li><a href="#"><i className="fas fa-plus"></i></a></li>
                                                                                    <li><a href="#"><i className="fas fa-expand"></i></a></li> */}
                                                                                </ul>
                                                                        </div>
                                                                    </Link>
                                                                    <div className="part-2">
                                                                        <Link to={`/product/${p.id}`} className="clean-link">
                                                                            <h3 className="product-title">{p.name}</h3>
                                                                        </Link>
                                                                        <h4 className="product-price text-success">{p.price} GRAMO</h4>
                                                                    </div>
                                                            </div>                                                     
                                                        </div>
                                                    )}
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

export default Use;