import React, { useContext, useEffect, useState }  from 'react'
import { AuthContext } from '../context/AuthContext';
import NavbarTop from '../components/NavbarTop';
import Spinner from '../parts/Spinner'
import svgs from '../assets/svgs';
import Footer from '../components/Footer';
import axios from 'axios';

const Settings = () => {
    const { isAuthEnticated, balance, user, getUser } = useContext(AuthContext);
    const [uploaded, setIploaded] = useState(false);
    const [avatar, setAvatar] = useState('');
    const [image, setImage] = useState(null);
    const [imgUploaded, setImgUploaded] = useState('');
    const [ formData, setFormData ] = useState({
        firstname: '',
        email: '',
        password: ''
    })
    const [imgReady, setImgReady] =  useState(null)
    const { firstname, email, password } = formData
    const [passwordCheck, setPasswordCheck] = useState("")
    const [loading, setloading] = useState(false)



    useEffect(()=>{
        if(user.email){
            setFormData({
                firstname: user.name,
                email: user.email,
                password: ''
            })
            setAvatar(user.avatar)
        }
    }, [user])


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    // image
    function handleUploadImg(ev){
        setImage(ev.target.files[0])

        let file = ev.target.files[0];
        getBase64(file).then((data) =>{
            setImgUploaded(data)
            setIploaded(true)
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

    const onSubmit = e => {
        e.preventDefault()
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(email) && firstname != "" ) {
            $('#profileModal').modal('show')
        } else {
            alert('Invalid email or name')
        }

    }

    const changeUserData = async () =>{
        setloading(true)
        const uploadData = new FormData();

        if(imgReady){
            uploadData.append('image', imgReady, imgReady.name)
        }
        uploadData.append('name', firstname)
        uploadData.append('email', email)
        uploadData.append('password', password)
        uploadData.append('userid', user.id)

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "JWT "+localStorage.getItem('access')
            }
        } 
    

        try {
            const res = await axios.post('/api/change_profiledata', uploadData, config)

            $('#profileModal').modal('hide')
            setloading(false)

            getUser()

        } catch (error) {
            console.log(error)
        }
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
                changeUserData()
            } else {
                alert('Password incorrect')
                setloading(false)
            }

        } catch (error) {
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

                    <div className="row">
                        <div className="col-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Settings</h4>
                                    <p className="card-description"> User Profile </p>
                                    <form className="forms-sample" onSubmit={e => onSubmit(e)}>
                                        <div className="avatar-wrapper p-2 d-flex flex-column align-items-left justify-content-left">
                                            <label>
                                                {!uploaded ? <img  className="d-block" src={avatar ? "/media/gallery/avatars/"+avatar : "/static/assets/images/faces/noimage.png"}  width="80" /> : <img className="d-block" src={imgUploaded} width="80" />}
                                                <input className="d-none" type="file" id="image-input" onChange={(ev)=> handleUploadImg(ev)}/>
                                                <span className="d-block my-2" onChange={(ev)=> handleUploadImg(ev)}>Cambiar Avatar</span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Name</label>
                                            <input value={firstname} type="text" name="firstname" className="form-control" id="exampleInputName1" placeholder="Name" onChange={e=>onChange(e)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail3">Email address</label>
                                            <input value={email} name="email" type="email" className="form-control" id="exampleInputEmail3" placeholder="Email" onChange={e=>onChange(e)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword4">Password</label>
                                            <input value={password} name="password" type="password" className="form-control" id="exampleInputPassword4" placeholder="Password" onChange={e=>onChange(e)}/>
                                        </div>
                                        <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                    </form>
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

export default Settings;