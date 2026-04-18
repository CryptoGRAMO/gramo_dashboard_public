import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate  } from 'react-router-dom'
import GramoTitles from '../components/GramoTitles';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    
    const { isAuthEnticated, getJWT, loginError, login } = useContext(AuthContext);
    const userAuthenticated = localStorage.getItem('access') 
    
    if(userAuthenticated){
        let urlRequested = localStorage.getItem('urlrequested')
        
        if(urlRequested){
            if(urlRequested == "home"){
                window.location.replace(`/`)
            }else {
                window.location.replace(`/${urlRequested}`)
            }
        } else {
            window.location.replace(`/`)
        }
    }

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        login(email, password)
    }

    const styleLogin = {
        form: {
            inputs: {
                color: 'white',
            }
        }
    }

    return (
        <>
            {!userAuthenticated && <div className="row w-100 m-0">

                <GramoTitles />

                <div className="content-wrapper has-curtain full-page-wrapper d-flex align-items-center auth login-bg">
                    <div className="card col-lg-4 mx-auto z-index-99">
                    <div className="card-body px-5 py-5">
                        <h3 className="card-title text-left mb-3">Login</h3>
          
                        {/* form */}
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <label>Username or email *</label>
                                <input              
                                    style={styleLogin.form.inputs}
                                    type='email'
                                    placeholder='email'
                                    name='email'
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required className="form-control p_input" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password *</label>
                                <input 
                                    style={styleLogin.form.inputs}
                                    type='password'
                                    placeholder='password'
                                    name='password'
                                    value={password}
                                    onChange={e => onChange(e)}
                                    minLength='6'
                                    required 
                                    className="form-control p_input" 
                                />
                            </div>
       
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-block enter-btn">Login</button>
                            </div>

                            {loginError && <span className='text-danger'>{loginError}</span>}
                            {/* <div className="d-flex">
                                <button className="btn btn-facebook mr-2 col">
                                <i className="mdi mdi-facebook"></i> Facebook </button>
                                <button className="btn btn-google col">
                                <i className="mdi mdi-google-plus"></i> Google plus </button>
                            </div> */}
                            <p className="sign-up text-left">Don't have an Account? <Link to='/signup'>Sign Up</Link></p>
                            <p className="sign-up text-left">Forgot your password? <Link to='/reset_password'>Reset Password</Link></p>
                        </form>
                        {/* endForm */}
                    </div>
                    </div>
                </div>
            {/* <!-- content-wrapper ends --> */}
            </div>}
        </>
    )
}

export default Login;