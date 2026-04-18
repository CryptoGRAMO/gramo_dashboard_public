import React, {useState, useContext} from 'react'
import { Link, Navigate  } from 'react-router-dom'
import GramoTitles from '../components/GramoTitles'
import { AuthContext } from '../context/AuthContext';
import PasswordComplexity from '../utils/passwordComplexity';


const Signup = () => {
    const { isAuthEnticated, getJWT, loginError, login, signup } = useContext(AuthContext);
    const [passwordComplexityError, setPasswordComplexityError] = useState({
        lowercase: false,
        uppercase: false,
        numeric: false,
        special: false,
        len: false
    })
    const [showPassComplx, setShowPassComplx] = useState(false)
    const userAuthenticated = localStorage.getItem('access') 

    // console.log( new PasswordComplexity().anyRequiredPasswordTrue(passwordComplexityError))
    
    if(userAuthenticated){
        window.location.replace('/')
    }

    const [ accountCreated, setAccountCreated ] = useState(false)
    const [ formData, setFormData ] = useState({
        name: "",
        email: '',
        password: '',
        re_password: ''
    })

    const { name, email, password , re_password} = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        if (!new PasswordComplexity().anyRequiredPasswordTrue(passwordComplexityError)) {
            if(password === re_password){
    
                signup(name, email, password , re_password)
                setAccountCreated(true)
            } else {
                alert("Password doesn't match" )
            }
        } 

    }

    if(isAuthEnticated){
        return <Navigate  to='/' />
    }

    const handlePassword = (e) => {
        setFormData({ ...formData, password: e.target.value })
        
        new PasswordComplexity().passwordComplexity(e.target.value, setPasswordComplexityError, passwordComplexityError)
    }

    const styleSignUp = {
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
                        {!accountCreated && <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Sign Up</h3>
                            {/* form */}
                            <form  onSubmit={e => onSubmit(e)}>
                                <div className='form-group'>
                                    <input 
                                        style={styleSignUp.form.inputs}
                                        className='form-control p_input'
                                        type='text'
                                        placeholder='name'
                                        name='name'
                                        value={name}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <input 
                                        style={styleSignUp.form.inputs}
                                        className='form-control p_input'
                                        type='email'
                                        placeholder='email'
                                        name='email'
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <input 
                                        style={styleSignUp.form.inputs}
                                        className='form-control p_input'
                                        type='password'
                                        placeholder='password'
                                        name='password'
                                        value={password}
                                        onChange={e => handlePassword(e)}
                                        minLength='6'
                                        required
                                        onFocus={()=>setShowPassComplx(true)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input 
                                        style={styleSignUp.form.inputs}
                                        className='form-control p_input'
                                        type='password'
                                        placeholder='Retype Password'
                                        name='re_password'
                                        value={re_password}
                                        onChange={e => onChange(e)}
                                        minLength='6'
                                        required
                                    />
                                </div>
   
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block enter-btn">Register</button>
                                </div>
                                {new PasswordComplexity().anyRequiredPasswordTrue(passwordComplexityError) && showPassComplx &&
                                    <ul>
                                        {!passwordComplexityError.lowercase && <li className='text-danger'><small>the password must contain at least 1 lowercase alphabetical character</small></li>}
                                        {!passwordComplexityError.uppercase && <li className='text-danger'><small>the password must contain at least 1 uppercase alphabetical character</small></li>}
                                        {!passwordComplexityError.numeric && <li className='text-danger'><small>the password must contain at least 1 numeric character</small></li>}
                                        {!passwordComplexityError.special && <li className='text-danger'><small>the password must contain at least 1 special character ex: @#$%^&*</small></li>}
                                        {!passwordComplexityError.len && <li className='text-danger'><small>the password must be eight characters or longer</small></li>}
                                    </ul>}
                                <p className="sign-up text-left">have an account? <Link to='/login'>Login</Link></p>
                            </form>
                            {/* endForm */}
                        </div>}

                        {accountCreated && <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Signed Up</h3>
                            
                            <div className='py-4'>
                                <p>Please check your email and confirm to activate your account</p>
                                {/* <p className="sign-up text-left">have an account? <Link to='/login'>Login</Link></p> */}
                            </div>
                        </div>}
                    </div>
                </div>
            {/* <!-- content-wrapper ends --> */}
            </div>}
        </>
    )
}

export default Signup;