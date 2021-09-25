import React from 'react';
import './AdminIndex.css';

import Login from '../login/Login';

function AdminIndex(props) {
    return (
        <div className="admin__index">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <h2>لوحة التحكم</h2>
                        <Login isAuth={props.isAuth} />
                    </div>
                    <div className="col-lg-6">
                    <lottie-player 
                            src="https://assets7.lottiefiles.com/packages/lf20_u0rFmJ.json"   
                            background="transparent"  
                            speed="1"  
                            style={{width: "300px", height: "300px"}}  
                            loop  
                            autoplay
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminIndex;
