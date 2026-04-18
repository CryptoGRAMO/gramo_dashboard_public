import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import svgs from '../assets/svgs';
import { AuthContext } from '../context/AuthContext';
import { GlobalContext } from '../context/GlobalContext';

const Navbar = () => {
    const { isAuthEnticated, logout, user } = useContext(AuthContext);
    const { navStatusBtn, setNavStatusBtn } = useContext(GlobalContext);
    
    useEffect(()=>{}, [user])
    
    return (
        <nav className={`sidebar sidebar-offcanvas ${navStatusBtn ? "active" : ""}`} id="sidebar">
            <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                <a className="sidebar-brand brand-logo" href="/">
                    {svgs.gramo(30,30)} <span className='text-white' style={{fontSize:"16px"}}>Crypto-GRAMO</span>
                </a>
                <a className="sidebar-brand brand-logo-mini" href="/">
                    {svgs.gramo(30,30)}
                </a>
            </div>
            <ul className="nav">
                <li className="nav-item profile">
                    <div className="profile-desc">
                        <div className="profile-pic">
                            <div className="count-indicator">
                                <img className="img-xs rounded-circle " src={user.avatar ? "/media/gallery/avatars/"+user.avatar : "/static/assets/images/faces/noimage.png"} alt="" />
                                <span className="count bg-success"></span>
                            </div>
                            <div className="profile-name">
                                <h5 className="mb-0 font-weight-normal">{user.name}</h5>
                                {/* <span>Gold Member</span> */}
                            </div>
                        </div>
                        <a href="#" id="profile-dropdown" data-toggle="dropdown">
                            <i className="mdi mdi-dots-vertical"></i>
                        </a>

                        <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                            <Link onClick={()=> setNavStatusBtn(false)} to="/settings" className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-dark rounded-circle">
                                        <i className="mdi mdi-settings text-primary"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <p className="preview-subject ellipsis mb-1 text-small">Account settings</p> 
                                </div>
                            </Link>                          
                        </div>
                    </div>
                </li>
                <li className="nav-item nav-category">
                    <span className="nav-link">Navigation</span>
                </li>
                <li className="nav-item menu-items">
                    <Link onClick={()=> setNavStatusBtn(false)} className="nav-link" to="/">
                        <span className="menu-icon">
                            <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item menu-items">
                    <Link onClick={()=> setNavStatusBtn(false)} className="nav-link" to="/withdraw" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-icon">
                            <i style={{"color": "rgb(70, 189, 167)"}} className="icon-sm mdi mdi-send"></i>
                        </span>
                        <span className="menu-title">Withdraw</span>
                    </Link>
                </li>
                <li className="nav-item menu-items">
                    <Link onClick={()=> setNavStatusBtn(false)} className="nav-link" to="/deposit" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-icon">
                            <i style={{"color": "#b53131"}} className="icon-sm mdi mdi-widgets "></i>
                        </span>
                        <span className="menu-title">Deposit</span>
                    </Link>
                </li>
                <li className="nav-item menu-items">
                    <Link onClick={()=> setNavStatusBtn(false)} className="nav-link" to="/claim" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-icon">
                            <i style={{"color": "rgb(238, 170, 97)"}} className="icon-sm mdi mdi-account-arrow-left "></i>
                        </span>
                        <span className="menu-title">Claim</span>
                    </Link>
                </li>
                <li className="nav-item menu-items">
                    <Link onClick={()=> setNavStatusBtn(false)} className="nav-link" to="/use" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-icon">
                         <i style={{"color": "rgb(49, 156, 181)"}} className="icon-sm mdi mdi-account-arrow-right "></i>
                        </span>
                        <span className="menu-title">Use</span>
                    </Link>
                </li>
                <li className="nav-item menu-items">
                    <Link onClick={()=> setNavStatusBtn(false)} className="nav-link" to="/orders" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-icon">
                         <i style={{"color": "rgb(49, 156, 181)"}} className="icon-sm mdi mdi-shopping "></i>
                        </span>
                        <span className="menu-title">Orders</span>
                    </Link>
                </li>
                <li className="nav-item menu-items">
                    <Link onClick={()=> setNavStatusBtn(false)} className="nav-link" to="/settings" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-icon">
                            <i style={{"color": "rgb(104, 123, 128) "}} className="mdi mdi-settings "></i>
                        </span>
                        <span className="menu-title">Settings</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}


export default Navbar;