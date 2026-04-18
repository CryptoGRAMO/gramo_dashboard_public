import React, {useState, useContext, useEffect} from 'react'
import { Link, Navigate  } from 'react-router-dom'
import GramoTitles from '../components/GramoTitles'
import { AuthContext } from '../context/AuthContext';
import { useLocation, useParams } from 'react-router-dom'

const PasswordResetConfirm = () => {
    const { passwordResetConfirm } = useContext(AuthContext);
    const par = useParams()

    const userAuthenticated = localStorage.getItem('access') 
    const [ formData, setFormData ] = useState({
        password: '',
        re_password: ''
    })

    const [reset, setReset] = useState(false)

    const {password , re_password} = formData
    
    if(userAuthenticated){
        window.location.replace('/')
    }

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()

        if(password === re_password){

            passwordResetConfirm(par.uid, par.token, password , re_password)
            setReset(true)
        } else {
            alert("Password doesn't match" )
        }
    }

    return (
        <>

           {!userAuthenticated && <div className="row w-100 m-0">
                <GramoTitles />

                <div className="content-wrapper has-curtain full-page-wrapper d-flex align-items-center auth login-bg">
                    <div className="card col-lg-4 mx-auto z-index-99">

                        {!reset ? <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Password Reset</h3>

                            <form  onSubmit={e => onSubmit(e)}>
                                <div className='form-group'>
                                    <input 
                                        className='form-control p_input'
                                        type='password'
                                        placeholder='password'
                                        name='password'
                                        value={password}
                                        onChange={e => onChange(e)}
                                        minLength='6'
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <input 
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
                                    <button type="submit" className="btn btn-primary btn-block enter-btn">Reset Password</button>
                                </div>
                                
                            </form>
                            
                        </div> : <div className="card-body px-5 py-5">
                            <h3 className="card-title text-left mb-3">Password Reset completed</h3>

                            <p className="sign-up text-left py-4">Go to <Link to='/login'>Login</Link></p>
                        </div>}
                    </div>
                </div>
            {/* <!-- content-wrapper ends --> */}
            </div>}
        </>
    )
}

export default PasswordResetConfirm;