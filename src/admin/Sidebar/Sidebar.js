import React, { useEffect } from 'react';
import './Sidebar.css';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const dispatch = useDispatch();
    const admin_name = useSelector(state => state.admin_name);
 
    useEffect(()=> {
        let sidebar = document.querySelector(".sidebar");
        let closeBtn = document.querySelector("#btn"); 

        closeBtn.addEventListener("click", ()=>{
            sidebar.classList.toggle("open");
        });
    }, []);

    const handleLogout = () => {
        dispatch({ type: 'logout' });
    }

    return (
        <div className="sidebar">
            <div className="logo-details">
                <div className="logo_name">الهيئة العامة للاستثمار</div>
                <i className='bx bx-menu' id="btn" ></i>
            </div>
            <ul className="nav-list">
                <li>
                    <i className='bx bx-search' ></i>
                    <input type="text" placeholder="Search..." />
                    <span className="tooltip">Search</span>
                </li>
                <li>
                    <Link to="/dashboard/home">
                    <i className='bx bx-grid-alt'></i>
                    <span className="links_name">Dashboard</span>
                    </Link>
                    <span className="tooltip">Dashboard</span>
                </li>
                <li>
                    <Link to="/dashboard/products">
                        <i className='bx bx-list-ul'></i>
                        <span className="links_name">Products</span>
                    </Link>
                    <span className="tooltip">Products</span>
                </li>
                <li>
                    <Link to="/dashboard/add-product">
                    <i className='bx bx-plus-circle'></i>
                    <span className="links_name">Add product</span>
                    </Link>
                    <span className="tooltip">Add Product</span>
                </li>
                <li className="profile">
                    <div className="profile-details">
                        <img src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-user-interface-kiranshastry-gradient-kiranshastry-1.png"/>
                        <div className="name_job">
                            <div className="name">{admin_name}</div>
                            <div className="job">Admin</div>
                        </div>
                    </div>
                    <i className='bx bx-log-out' id="log_out" onClick={handleLogout} ></i>
                </li>
            </ul>
        </div>
    )
}
