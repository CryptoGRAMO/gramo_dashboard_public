import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import Layout from '../hocs/Layout';
import Home from '../containers/Home'
import Login from '../containers/Login';
import Signup from '../containers/SignUp';
import { AuthProvider } from '../context/AuthContext';
import ResetPassword from '../containers/ResetPassword';
import Activated from '../containers/Activated';
import AuthMiddleware from '../middleware/AuthMiddleware';
import PasswordResetConfirm from '../containers/PasswordResetConfirm';
import Settings from '../containers/Settings';
import Withdraw from '../containers/Withdraw';
import Deposit from '../containers/Deposit';
import Claim from '../containers/Claim';
import Use from '../containers/Use';
import Product from '../containers/Product';
import NotFound from '../containers/NotFound';
import Checkout from '../containers/Checkout';
import OrderCompleted from '../containers/OrderCompleted';
import Orders from '../containers/Orders';
import { GlobalProvider } from '../context/GlobalContext';
import axios from 'axios';



const App = ()=> {
  const [isUnderMaintenance, setisUnderMaintenance] = useState(false)
  const [isLoading, setisLoading] = useState(true)


  useEffect(() => {
      const config = {
          method: 'get',
          url: `/api/settings`
      };
        
      axios(config).then(function (response) {
        setisUnderMaintenance(response.data.maintenance)
        setisLoading(false)
      }).catch(function (error) {
          console.log(error);
      });
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isUnderMaintenance) {
    return <MaintainingPage />
  }
  return (
    <Router>
        <Layout>
            <Routes>
                <Route exact path="/" element={<AuthMiddleware par={"home"} content={<Home/>} />} />
                <Route exact path="/settings" element={<AuthMiddleware par={"settings"} content={<Settings/>} />} />
                <Route exact path="/withdraw" element={<AuthMiddleware par={"withdraw"} content={<Withdraw/>} />} />
                <Route exact path="/deposit" element={<AuthMiddleware par={"deposit"} content={<Deposit/>} />} />
                <Route exact path="/claim" element={<AuthMiddleware par={"claim"} content={<Claim/>} />} />
                <Route exact path="/use" element={<AuthMiddleware par={"use"} content={<Use/>} />} />
                <Route exact path="/product/:id" element={<AuthMiddleware par={"product"} content={<Product/>} />} />
                <Route exact path="/checkout/:id" element={<AuthMiddleware par={"checkout"} content={<Checkout/>} />} />
                <Route exact path="/ordercompleted" element={<AuthMiddleware par={"ordercompleted"} content={<OrderCompleted/>} />} />
                <Route exact path="/orders" element={<AuthMiddleware par={"orders"} content={<Orders/>} />} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/reset_password" element={<ResetPassword />} />
                <Route exact path="/activate/:uid/:token" element={<Activated/>} />
                <Route exact path="/password/reset/confirm/:uid/:token" element={<PasswordResetConfirm/>} />
                <Route element={<NotFound />} />
            </Routes>
        </Layout>
    </Router>
)}

const MaintainingPage = () => {
  return (
  <div>
    <h2>We are under maintenance</h2>
  </div>)
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <GlobalProvider>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </GlobalProvider>
);

