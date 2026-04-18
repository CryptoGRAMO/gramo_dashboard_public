import React, {useEffect, useState, useContext}  from 'react'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../parts/Spinner';

const Withdraw = () => {
    let navigate = useNavigate();
    const { isAuthEnticated, getJWT, user, getBalance } = useContext(AuthContext);
    const [passwordCheck, setPasswordCheck] = useState("")
    const [trxSuccess, setTrxSuccess] = useState(false)
    const [loading, setloading] = useState(false)

    useEffect(()=>{

    }, [user])

    const [ formData, setFormData ] = useState({
        address: '',
        amount: ''
    })

    const { address, amount } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        $('#profileModal').modal('show')
    }

    const checkPassword = async () => {
        setloading(true)
        console.log(passwordCheck)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "JWT "+localStorage.getItem('access')
            }
        } 
    
        const body = JSON.stringify({passwordCheck: passwordCheck, email: user.email });
    
        try {
            const res = await axios.post('/api/check_password', body, config)

            if(res.data["passwordcorrect?"]){
                sendGramos()

            } else {
                alert('Password incorrect')
                setloading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const sendGramos = async () => {
        setloading(true)
        console.log(passwordCheck)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "JWT "+localStorage.getItem('access')
            }
        } 
    
        const body = JSON.stringify({address: address, amount: amount });
    
        try {
            const res = await axios.post('/api/withdraw', body, config)

            if(res.data.TRANSACTION == "SUCCESS"){
                getBalance()
                $('#profileModal').modal('hide')
                setTrxSuccess(true)
                setloading(false)
                setFormData({
                    address: '',
                    amount: ''
                })
            }

        } catch (error) {
            if(error.response.data){
                if(error.response.data.wrong == "incorrect address!"){
                    alert('Wrong Address')
                }
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
            console.log(error)
        }
    }



    return (
        <>
            {/* modal confirmation */}
            <div className="modal fade" id="profileModal" tabIndex="-1" role="dialog" aria-labelledby="profileModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="profileModalLabel">Settings Confirmation</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                We must check if is you!
                            </div>
                            <div className='py-2'>
                                Write your password
                            </div>
                            <div>
                                <input value={passwordCheck} name="password" type="password" className="form-control" id="exampleInputPassword4" placeholder="Password Check" onChange={e=>setPasswordCheck(e.target.value)}/>
                            </div>
                        </div>
                        {loading ? <Spinner /> : <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>checkPassword()}>Check Password</button>
                        </div>}
                    </div>
                </div>
            </div>

            {/* <!-- partial --> */}
            <div className="main-panel">
                <div className="content-wrapper">
                    {svgs.poligon(90)}
                    {svgs.circle2(180)}

                    <div className="col-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">

                                {trxSuccess && <div className='p-4 mb-4 bg-dark'>
                                    <h3 className='text-success'>Transaction Completed!</h3>
                                    
                                        <Link to="/"  className='btn btn-success text-dark'>
                                            Check Balance
                                        </Link>
                            
                                </div>}

                                <h4 className="card-title">Withdraw</h4>
                                <p className="card-description"> Send GRAMOs </p>

                                <form className="forms-sample" onSubmit={e => onSubmit(e)}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputName1">Address</label>
                                        <p className='text-muted'>Please introduce public address of the Algorand account where you want to send your GRAMOs</p>
                                        <input value={address} type="text" name="address" className="form-control" id="exampleInputName1" placeholder="Address" onChange={e=>onChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail3">Amount</label>
                                        <p className='text-muted'>Please introduce how many GRAMOs you want to withdraw to your external Algorand wallet</p>
                                        <input value={amount} name="amount" type="number" className="form-control" id="exampleInputEmail3" placeholder="Amount" onChange={e=>onChange(e)}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                </form>
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

export default Withdraw;