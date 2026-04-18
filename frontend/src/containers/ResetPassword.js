import React, {useState, useContext} from 'react'
import { Link, Navigate  } from 'react-router-dom'
import GramoTitles from '../components/GramoTitles';
import { AuthContext } from '../context/AuthContext';

const ResetPassword = () => {
    const { resetPassword, reqCheckEmail } = useContext(AuthContext);
    const userAuthenticated = localStorage.getItem('access') 
    const [showMessageNotUser, setshowMessageNotUser] = useState(false)
    
    if(userAuthenticated){
        window.location.replace('/')
    }

    const [ formData, setFormData ] = useState({
        email: ''
    })

    const [ passwordReseted, setPasswordReseted ] = useState(false)

    const { email } = formData

    const onChange = (e) => {
        setshowMessageNotUser(false)
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()

        checkEmail()
    }

    const checkEmail = async () => {
        const resultExistEmail = await reqCheckEmail(email)

        if (resultExistEmail.existEmail) {
            resetPassword(email)
            setPasswordReseted(true)
        } else {
            setshowMessageNotUser(true)
        }
    }

    return (
        <>
            {!userAuthenticated && <div className="row w-100 m-0">

                <GramoTitles />

                <div className="content-wrapper has-curtain full-page-wrapper d-flex align-items-center auth login-bg">
                    <div className="card col-lg-4 mx-auto z-index-99">
                        {!passwordReseted ? <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Reset Password</h3>
                            {/* form */}
                            <form onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input              
                                        type='email'
                                        placeholder='email'
                                        name='email'
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required className="form-control p_input" 
                                    />
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block enter-btn">Reset Password</button>
                                </div>

                                {showMessageNotUser  && <span className='text-danger'>There is no any user with this email!</span>}

                                {/* <div className="d-flex">
                                    <button className="btn btn-facebook mr-2 col">
                                    <i className="mdi mdi-facebook"></i> Facebook </button>
                                    <button className="btn btn-google col">
                                    <i className="mdi mdi-google-plus"></i> Google plus </button>
                                </div> */}
                                <p className="sign-up text-left">Don't have an Account? <Link to='/signup'>Sign Up</Link></p>
                                <p className="sign-up text-left">have an account? <Link to='/login'>Login</Link></p>
                            </form>
                            {/* endForm */}
                        </div> : <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Email send</h3>
                            <p className='py-4'>Check your email to confirm and reset your password</p>
                        </div>}
                    </div>
                </div>
            {/* <!-- content-wrapper ends --> */}
            </div>}
        </>
    )
}

export default ResetPassword;