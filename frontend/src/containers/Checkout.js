import React, { useEffect, useContext, useState }  from 'react'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Spinner from '../parts/Spinner';
import {
    useNavigate ,
    useParams
  } from "react-router-dom";



const Checkout = () => {
    let navigate = useNavigate();
    let { id } = useParams();
    const { envVariables, user,getBalance } = useContext(AuthContext);
    const [loading, setLoading] = useState(true)
    const [product, setproduct] = useState([])
    const [pyhisicaladdress, setpyhisicaladdress] = useState('')
    const [city, setCity] = useState('')
    const [stateP, setStateP] = useState('')
    const [cp, setCp] = useState('')
    const [placingOrder, setPlacingOrder] = useState(false)
    const [amount, setamount] = useState(0)


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
            setamount(response.data.price)

        }).catch(function (error) {
            console.log(error);
        });
          
    }

    
    const placeOrder = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "JWT "+localStorage.getItem('access')
            }
        } 
    
        const body = JSON.stringify({amount: amount });
    
        try {
            const res = await axios.post('/api/buy', body, config)

            if(res.data.TRANSACTION == "SUCCESS"){
                publishOrder()
                getBalance()

                setPlacingOrder(false)
                navigate("/ordercompleted", { replace: true });
            }

        } catch (error) {
            console.log(error.response.data.wrong)
            if(error.response.data){
                alert(error.response.data.wrong)
                // if(error.response.data.wrong == "incorrect address!"){
                //     alert('Wrong Address')
                // }
            }
            if(error.request.status == 406 ){
                if(error.response.data){
                    let text = "Overspend";
                    if (confirm(text) == true) {
                        location.reload()
                    } else {
                        location.reload()
                    }
                }
            }
        }
    }


    const publishOrder = async ()=>{
        setPlacingOrder(true)

        var config = {
          headers: { 
            'Content-Type': 'application/json'
          }
        };

        const body = JSON.stringify({
          "product_id": product.id,
          "first_name": user.name,
          "last_name": user.email.split('@')[0],
          "company": "none",
          "email": user.email,
          "phone": "777-777-777-777",
          "address_1": pyhisicaladdress,
          "address_2": "",
          "city": city,
          "state": stateP,
          "postcode": cp,
          "country": "ES"
        });

        try {
            const res = await axios.post(`https://www.crypto-gramo.io/wp-json/wl/v1/gramo_order/${envVariables.CONSUMER_SECRET}`, body, config)
            
            console.log(res.data);
            
            placeOrder()

        } catch (error) {
            console.log(error);
        }
        
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
                                                        <div >
                                                            <img style={{maxHeight: "150px"}} src={product.images[0].src} className="img-fluid"/>
                                                        </div>
                                                        <div className=''>
                                                            <div className=''>
                                                                <h4 className='py-2'>{product.name}</h4>
                                                                <p>{product.price} GRAMO</p>
                                                                <div className='py-4'></div>
                                                            </div>
                                                        
                                                        </div>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <form onSubmit={e => placeOrder(e)} method="POST">
                                                            <div className="form-group">
                                                                <label>Physical Address *</label>
                                                                <p>Your Physical Address to deliver.</p>
                                                                <input              
                                                                    type='text'
                                                                    placeholder='Physical Address'
                                                                    name='physical_address'
                                                                    value={pyhisicaladdress}
                                                                    onChange={e => setpyhisicaladdress(e.target.value)}
                                                                    required className="form-control p_input" 
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <label>City *</label>
                                                                <input              
                                                                    type='text'
                                                                    placeholder='City'
                                                                    name='city'
                                                                    value={city}
                                                                    onChange={e => setCity(e.target.value)}
                                                                    required className="form-control p_input" 
                                                                />
                                                            </div>

                                                            <div className="form-group">                                                               
                                                                <label>Province/State *</label>
                                                                <input              
                                                                    type='text'
                                                                    placeholder='State/Province'
                                                                    name='state'
                                                                    value={stateP}
                                                                    onChange={e => setStateP(e.target.value)}
                                                                    required className="form-control p_input" 
                                                                />                                                                
                                                            </div>

                                                            <div className="form-group">
                                                                <label>Postal Code *</label>
                                                                <input              
                                                                    type='text'
                                                                    placeholder='Postal Code'
                                                                    name='cp'
                                                                    value={cp}
                                                                    onChange={e => setCp(e.target.value)}
                                                                    required className="form-control p_input" 
                                                                />
                                                                
                                                            </div>
                                                            <div className="text-center">
                                                                {!placingOrder && <button type="submit" className="btn py-3 btn-primary btn-block enter-btn" >Place Order</button>}
                                                                {placingOrder && <p>Placing Order...</p>}
                                                            </div>

                                                        </form>
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

export default Checkout;