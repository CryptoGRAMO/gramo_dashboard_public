import React, {useContext, useState}  from 'react'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import QRCode from "qrcode.react";
import { AuthContext } from '../context/AuthContext';
import Spinner from '../parts/Spinner';


const Deposit = () => {
    const { isAuthEnticated, getJWT, user, getBalance, balance } = useContext(AuthContext);

    useState(()=>{

    },[balance])

    function copyToClipBoard(){
        $('.addr-wrapp').removeClass('bg-dark')
        $('.addr-wrapp').addClass('bg-success')

        setTimeout(()=>{
            $('.addr-wrapp').removeClass('bg-success')
            $('.addr-wrapp').addClass('bg-dark')         
        }, 500)

        navigator.clipboard.writeText($('#adress')[0].dataset.address);
    }

    function download(href, name){
        var link = document.createElement('a');
        link.download = name;
        link.style.opacity = "0";
        console.log(link)
        $('body')[0].append(link);
        link.href = href;
        link.click();
        link.remove();
    }

    return (
        <>
            {/* <!-- partial --> */}
            <div className="main-panel">
                <div className="content-wrapper">
                    {svgs.poligon(90)}
                    {svgs.circle2(180)}


                    <div className="col-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">

                                <h4 className="card-title">Deposit</h4>
                                <p className="card-description"> Receive GRAMOs from someone </p>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <h4 className="font-weight-normal">Use this QR code to Receive</h4>
                                        <div className='bg-white p-3' id="qr-wrapper" style={{display:"inline-block"}}>
                                            {balance ? <QRCode  
                                                value={balance._account}
                                                size={window.screen.width < 500 ? "150": 250}
                                            />: <Spinner />}
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <h4 className="font-weight-normal">Download QR</h4>                                     
                                        {balance ?<div className='mb-4'>
                                                <button className='btn border' onClick={()=>download($('#qr-wrapper canvas')[0].toDataURL(), "image.png")}>
                                                    Download {downloadIcon()}
                                                </button>
                                        </div>: <Spinner />}
                                        
                                        <div>
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
                        </div>
                    </div>  
                </div>
                
                <Footer />

            </div>
            {/* <!-- main-panel ends --> */}
        </>
    )
}

let downloadIcon = () => <svg style={{width:"24px",height:"24px"}} viewBox="0 0 24 24">
<path fill="currentColor" d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z" />
</svg>

export default Deposit;