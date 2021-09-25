import React, { useEffect } from 'react';
import './Sidebar.css';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const dispatch = useDispatch();
 
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
                <i className='bx bxs-droplet icon'></i>
                <div className="logo_name">WaterDrops</div>
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
                <li>
                    <Link to="/dashboard/analytics">
                        <i className='bx bx-pie-chart-alt-2' ></i>
                        <span className="links_name">Analytics</span>
                    </Link>
                    <span className="tooltip">Analytics</span>
                </li>
                <li>
                    <Link to="/dashboard/orders">
                        <i className='bx bx-cart-alt'></i>
                        <span className="links_name">Orders</span>
                    </Link>
                    <span className="tooltip">Orders</span>
                </li>
                <li>
                    <Link to="#">
                        <i className='bx bx-cog'></i>
                        <span className="links_name">Settings</span>
                    </Link>
                    <span className="tooltip">Settings</span>
                </li>
                <li className="profile">
                    <div className="profile-details">
                        <img src="https://avatars.githubusercontent.com/u/61696257?v=4" alt="profileImg" />
                        <div className="name_job">
                            <div className="name">Bassil Alqadi</div>
                            <div className="job">Web designer</div>
                        </div>
                    </div>
                    <i className='bx bx-log-out' id="log_out" onClick={handleLogout} ></i>
                </li>
            </ul>
        </div>
    )
}