import React, {useContext, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { GlobalContext } from '../context/GlobalContext';

const NavbarTop = () => {
    const { isAuthEnticated, logout, user } = useContext(AuthContext);
    const { navStatusBtn, setNavStatusBtn } = useContext(GlobalContext);


    return (
        <>
            {/* <!-- partial:partials/_navbar.html --> */}
            <nav className="navbar p-0 fixed-top d-flex flex-row">
                <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center mx-2">
                    <a className="navbar-brand brand-logo-mini p-0" href="/"><img style={{width:"47px", height:"47px"}} src="https://www.crypto-gramo.io/wp-content/uploads/2022/10/mini.png" width="100" height="100" alt="logo" /></a>
                </div>
                <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="mdi mdi-menu"></span>
                    </button>

                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item dropdown d-none d-lg-block">
                        
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="createbuttonDropdown">
                            <h6 className="p-3 mb-0">Projects</h6>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                <div className="preview-icon bg-dark rounded-circle">
                                    <i className="mdi mdi-file-outline text-primary"></i>
                                </div>
                                </div>
                                <div className="preview-item-content">
                                <p className="preview-subject ellipsis mb-1">Software Development</p>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                <div className="preview-icon bg-dark rounded-circle">
                                    <i className="mdi mdi-web text-info"></i>
                                </div>
                                </div>
                                <div className="preview-item-content">
                                <p className="preview-subject ellipsis mb-1">UI Development</p>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                <div className="preview-icon bg-dark rounded-circle">
                                    <i className="mdi mdi-layers text-danger"></i>
                                </div>
                                </div>
                                <div className="preview-item-content">
                                <p className="preview-subject ellipsis mb-1">Software Testing</p>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <p className="p-3 mb-0 text-center">See all projects</p>
                            </div>
                        </li>
                       
                        <li className="nav-item dropdown">
                            <a className="nav-link" id="profileDropdown" href="#" data-toggle="dropdown">
                            <div className="navbar-profile">
                                <img className="img-xs rounded-circle" src={user.avatar ? "/media/gallery/avatars/"+user.avatar : "/static/assets/images/faces/noimage.png"} alt="" />
                                <p className="mb-0 d-none d-sm-block navbar-profile-name">{user.name}</p>
                                <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                            </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                            <h6 className="p-3 mb-0">Profile</h6>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item preview-item" to="/settings">
                                <div className="preview-thumbnail">
                                <div className="preview-icon bg-dark rounded-circle">
                                    <i className="mdi mdi-settings text-success"></i>
                                </div>
                                </div>
                                <div className="preview-item-content">
                                <p className="preview-subject mb-1">Settings</p>
                                </div>
                            </Link>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item" onClick={()=>logout()}>
                                <div className="preview-thumbnail">
                                <div className="preview-icon bg-dark rounded-circle">
                                    <i className="mdi mdi-logout text-danger"></i>
                                </div>
                                </div>
                                <div className="preview-item-content">
                                <p className="preview-subject mb-1" >Log out</p>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                                <p className="p-3 mb-0 text-center">Advanced settings</p>
                            </div>
                        </li>
                    </ul>

                    <button onClick={()=> setNavStatusBtn(!navStatusBtn)} className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="mdi mdi-format-line-spacing"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}


export default NavbarTop;