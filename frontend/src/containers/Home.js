import React, { useContext }  from 'react'
import { AuthContext } from '../context/AuthContext';
import Spinner from '../parts/Spinner'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = (props) => {
    const { isAuthEnticated, balance, getBalance, user } = useContext(AuthContext);

    function copyToClipBoard(){
        $('.addr-wrapp').removeClass('bg-dark')
        $('.addr-wrapp').addClass('bg-success')

        setTimeout(()=>{
            $('.addr-wrapp').removeClass('bg-success')
            $('.addr-wrapp').addClass('bg-dark')         
        }, 500)

        navigator.clipboard.writeText($('#adress')[0].dataset.address);
    }

    return (
        <>
            {/* <!-- partial --> */}
            <div className="main-panel">
                <div className="content-wrapper">
                    {svgs.poligon(90)}
                    {svgs.circle2(180)}

                    <div className="row">
                        <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="font-weight-normal">Balances</h4>
                                    <div className="row">
                                        <div className="col-9">
                                            <div className="h-100 d-flex align-items-center align-self-start">
                                                <h3 className="mb-0 mb-0 d-flex align-items-center">
                                                    {svgs.gramo(25,52)}<span className='px-2'>{ !balance ? <Spinner /> : (parseFloat(balance.balance.gramo.amount / 100).toFixed(2))}</span> 
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className="icon icon-box-success ">
                                                <span className="mdi mdi-arrow-top-right icon-item"></span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="font-weight-normal">Address</h4>
                                    <button className='btn' onClick={()=>copyToClipBoard()}>
                                        <div className={`row bg-dark align-items-center addr-wrapp`} style={{paddingRight: "11px"}}>
                                            <div className="col-9">
                                                <div className="d-flex align-items-center align-self-start" style={{height:"52px"}}>
                                                    <h6 className="mb-0 mb-0 d-flex align-items-center">
                                                        <span className='px-2' id="adress" data-address={balance && balance._account}>{ !balance ? <Spinner /> : (balance._account).slice(0, 5)+"..."+(balance._account).slice(-4) }</span> 
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="icon icon-box-success ">
                                                    <span className="mdi mdi-content-copy icon-item"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-sm-6 grid-margin">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3>Withdraw</h3>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-xl-12 my-auto">
                                 
                                            <h6 className="text-muted font-weight-normal">Send GRAMOs to someone</h6>
                                        </div>
                                        <button className="btn d-flex align-items-center border-light mt-3 mx-2" disabled>
                                            {/* <Link to="/withdraw" className='clean-link-btn'> */}
                                                <h4 className='px-2 mb-0'>withdraw</h4> <i style={{color: "rgb(70, 189, 167)"}} className="icon-sm mdi mdi-send ml-auto"></i>
                                            {/* </Link> */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 grid-margin">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3>Deposit</h3>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-xl-12 my-auto">
                                 
                                            <h6 className="text-muted font-weight-normal">Receive GRAMOs from someone</h6>
                                        </div>
                                        <button className="btn d-flex align-items-center border-light mt-3 mx-2">
                                            <Link to="/deposit" className='clean-link-btn'>
                                                <h4 className='px-2 mb-0'>deposit</h4> <i style={{color: "rgb(181, 49, 49)"}} className="icon-sm mdi mdi-widgets  ml-auto"></i>
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 grid-margin">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3>Claim</h3>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-xl-12 my-auto">
                                 
                                            <h6 className="text-muted font-weight-normal">Claim your GRAMOs</h6>
                                        </div>
                                        <button className="btn d-flex align-items-center border-light mt-3 mx-2">
                                            <Link to="/claim" className='clean-link-btn'>
                                                <h4 className='px-2 mb-0'>claim</h4> <i  style={{color: "rgb(238, 170, 97)"}} className="icon-sm mdi mdi-account-arrow-left  ml-auto"></i>
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 grid-margin">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3>Use</h3>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-xl-12 my-auto">
                                 
                                            <h6 className="text-muted font-weight-normal">Use your GRAMOs</h6>
                                        </div>
                                        <button className="btn d-flex align-items-center border-light mt-3 mx-2">
                                            <Link to="/use" className='clean-link-btn'>
                                                <h4 className='px-2 mb-0'>use</h4> <i style={{color: "rgb(49, 156, 181)"}} className="icon-sm mdi mdi-account-arrow-right  ml-auto"></i>
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-sm-12 grid-margin">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h3>Orders</h3>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-xl-12 my-auto">
                 
                                            <h6 className="text-muted font-weight-normal">Orders</h6>
                                        </div>
           
                                    </div>
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

export default Home;