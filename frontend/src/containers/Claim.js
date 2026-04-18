import React, {useContext, useState}  from 'react'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import DatePicker , { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es"; // the locale you want
import { AuthContext } from '../context/AuthContext';
registerLocale("es", es); // register it with the name you want
import axios from 'axios';
import Spinner from '../parts/Spinner';



const Claim = () => {
    const { isAuthEnticated, balance, user, getUser } = useContext(AuthContext);
    const [ formData, setFormData ] = useState({
        amount: 0,
        company: '',
    })
    const [image, setImage] = useState(null);
    const [date, setDate] = useState(null);
    const [imgUploaded, setImgUploaded] = useState('');
    const [imgReady, setImgReady] =  useState(null)
    const [startDate, setStartDate] = useState(new Date("01/30/2000"));
    const {amount, company } = formData
    const [loading, setloading] = useState(false)
    const [msgSend, setmsgSend] = useState(false)
    const [greenPoint, setgreenPoint] = useState(false)
    const [trainers, settrainers] = useState(false)
    const [iframeLoading, setiframeLoading] = useState(false)


    const onChange = e => {setFormData({ ...formData, [e.target.name]: e.target.value })}

    const onSubmit = e => {
        e.preventDefault()
        claim()
    }

    const claim = async () =>{
        setloading(true)
        const uploadData = new FormData();

        if(imgReady && startDate && amount != 0 && company != ""){
            uploadData.append('image', imgReady, imgReady.name)
            uploadData.append('date', startDate)
            uploadData.append('amount', amount)
            uploadData.append('company', company)
            uploadData.append('domain', window.location.origin)


            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': "JWT "+localStorage.getItem('access')
                }
            } 
            console.log(new Date(startDate).toISOString())
            try {
                const res = await axios.post('/api/claim', uploadData, config)
                setloading(false)
                setmsgSend(true)
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('All fields are required*')
        }
    }

    // image
    function handleUploadImg(ev){
        setImage(ev.target.files[0])

        let file = ev.target.files[0];
        getBase64(file).then((data) =>{
            setImgUploaded(data)
            setImgReady(ev.target.files[0])
        });

    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    
    function sendToIframe(selectIframe){
        const frameEle = document.getElementById(selectIframe);
        const message = JSON.stringify({
            message: balance._account,
            date: Date.now(),
        });
        frameEle.contentWindow.postMessage(message, '*');
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
                                    <h4 className="card-title">CLAIM YOUR GRAMOS</h4>
                                    {/* <p className="card-description"> User Profile </p> */}
                                    <form className="forms-sample d-none" onSubmit={e => onSubmit(e)}>
                                        <div className="form-group py-3">
                                            <label htmlFor="exampleInputName1">Date of purchase *</label>
                                            <DatePicker  dateFormat="dd/MM/yyyy" locale="es" selected={startDate} onChange={(date) =>setStartDate(date)} />
                                        </div>
                                        <div className="form-group py-1" >
                                            <label htmlFor="exampleInputamount3">Amount paid (in euros) *</label>
                                            <input value={amount} name="amount" type="number" className="form-control" id="exampleInputamount3" placeholder="amount" onChange={e=>onChange(e)}/>
                                            <p>Format: 12.34 (dot separated)</p>
                                        </div>
                                        <div className="form-group" >
                                            <label htmlFor="exampleSelectGender">CBD Company</label>
                                            <select name='company' className="form-control" id="exampleSelectGender" value={company} onChange={(e) =>onChange(e)}>
                                                <option value={"greenpoint"}>CBD THE GREEN POINT</option>
                                                <option value={"sg_trainers"}>CBD SG TRAINERS</option>
                                            </select>
                                        </div>
                                        <div className="form-group pt-4 pb-2" >
                                            <label>Upload Invoice or Receipt</label>
                                            <input type="file" name="img[]" className="file-upload-default" onChange={(ev)=> handleUploadImg(ev)}/>
                                            <div className="input-group col-xs-12">
                                                <input type="text" className="form-control file-upload-info" disabled placeholder="Upload Image" />

                                                <span className="input-group-append">
                                                    <button className="file-upload-browse btn btn-primary" type="button">Upload</button>
                                                </span>
                                            </div>
                                            <p>Upload here a picture of the Invoice or Receipt where Date and Amount paid are clearly visible</p>
                                        </div>
                                        {!loading ? <button type="submit" className="btn btn-primary mr-2">Submit</button> : <Spinner />}

                                        {msgSend && <div className='mt-5 text-success'>
                                            <h3>Mensaje Enviado</h3>
                                        </div>}
                                    </form>

                                    <button onClick={()=>{
                                        settrainers(true)
                                        setgreenPoint(false)
                                        setiframeLoading(true)
                                    }} className="btn d-flex align-items-center border-light mt-3 mx-2">
                                        <h4 className='px-2 mb-0'>SG TRAINERS</h4> <i style={{color: "rgb(70, 189, 167)"}} className="icon-sm mdi mdi-send ml-auto"></i>
                                    </button>

                                    {trainers && 
                                        <div className='iframe-web'>
                                            <span className='closeiframe' onClick={()=>settrainers(false)}>+</span>
                                            {iframeLoading && "...Loading"}
                                            <iframe id="iframe-sgtrainers" onLoad={(e)=>{
                                                setiframeLoading(false),
                                                sendToIframe('iframe-sgtrainers')
                                            }} src="https://www.crypto-gramo.io/claim-your-crypto-gramos/claim-sgtrainers-iframe/" ></iframe></div> }

                                    <button onClick={()=>{
                                        setgreenPoint(true)
                                        settrainers(false)
                                        setiframeLoading(true)
                                    }} className="btn d-flex align-items-center border-light mt-3 mx-2">
                                        <h4 className='px-2 mb-0'>THE GREEN POINT </h4> <i style={{color: "rgb(70, 189, 167)"}} className="icon-sm mdi mdi-send ml-auto"></i>
                                    </button>

                                    {greenPoint && 
                                        <div className='iframe-web'>
                                            <span className='closeiframe' onClick={()=>setgreenPoint(false)}>+</span>
                                            {iframeLoading && "...Loading"}
                                            <iframe id="iframe-geenpoint" onLoad={()=>{
                                                setiframeLoading(false),
                                                sendToIframe('iframe-geenpoint')
                                            }} src="https://www.crypto-gramo.io/claim-your-crypto-gramos/claim-thegreenpoint-iframe/" ></iframe></div>} 
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

export default Claim;