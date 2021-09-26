import React, { useState } from 'react';
import './Login.css';
import Alert from '../../UI/Alert/Alert';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';

import axios from 'axios';

export default function Login(props) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isLogged, setIsLogged] = useState();
    const [loginMessage, setLoginMessage] = useState("");

    function handleAdminLogin(event) {
        event.preventDefault();

        if(username && userPassword) {
            axios.post("https://investment-com.herokuapp.com/login", {
            email: username,
            password: userPassword
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': 'https://investment.netlify.app',
                    'Accept': '*',
                    'origin': 'https://investment.netlify.app',
                    'Referer': 'https://investment.netlify.app/',
                    'Host': 'https://investment-com.herokuapp.com'
                }
            }
            ).then((response) => {
                if(response.data.userRegistered) {
                    dispatch(authActions.toggle(response.data['data'][0]['admin_name']));
                    history.push("/dashboard/home");
                } else {
                    setIsLogged(response.data.message);
                }
            });

            setUsername("");
            setUserPassword("");
        } else {
            setLoginMessage("من فضلك أدخل المعلومات المطلوبة");
        }
    }

    return (
        <form className="admin__login w-100" onSubmit={handleAdminLogin}>
            <div className="form-group mb-4">
                <label className="form-label" htmlFor="user-email">البريد الإلكتروني</label>
                <input 
                    type="text" 
                    id="user-email" 
                    className="form-control" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
            <div className="form-group mb-4">
                <label className="form-label" htmlFor="userPassword">كلمة المرور</label>
                <input 
                    type="password" 
                    id="userPassword" 
                    className="form-control" 
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />
            </div>
            <div className="admin__login__btn">
                <button type="submit" className="btn btn-primary">تسجيل الدخول</button>
            </div>
            
            {
                isLogged && <div className="alert alert-danger text-center" role="alert">
                    {isLogged}
                </div>
            }
            {loginMessage && <Alert message={loginMessage} />}
        </form>
    )
}
