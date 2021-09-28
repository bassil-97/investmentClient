import React, { useEffect } from 'react';
import './Sidebar.css';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const dispatch = useDispatch();
    const admin_name = useSelector(state => state.auth.admin_name);
    const company_name = useSelector(state => state.companyName.company_name);
 
    useEffect(()=> {
        let sidebar = document.querySelector(".sidebar");
        let closeBtn = document.querySelector("#btn"); 

        closeBtn.addEventListener("click", ()=>{
            sidebar.classList.toggle("open");
        });
    }, []);

    const handleLogout = () => {
        dispatch(authActions.toggle());
    }

    return (
        <div className="sidebar">
            <div className="logo-details">
                <div className="logo_name">{company_name}</div>
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
                    <Link to="/dashboard/change-service-name">
                        <i className='bx bx-edit-alt'></i>
                        <span className="links_name">تغيير اسم الخدمة</span>
                    </Link>
                    <span className="tooltip">تحرير</span>
                </li>
                <li>
                    <Link to="/dashboard/add-new-bank">
                        <i className='bx bxs-bank'></i>
                        <span className="links_name">إضافة مصرف جديد</span>
                    </Link>
                    <span className="tooltip">إضافة مصرف جديد </span>
                </li>
                <li>
                    <Link to="/dashboard/requests">
                    <i className='bx bx-list-ul'></i>
                    <span className="links_name">بيانات العملاء</span>
                    </Link>
                    <span className="tooltip">بيانات العملاء</span>
                </li>
                <li>
                    <Link to="/dashboard/codes">
                    <i className='bx bx-lock-alt'></i>
                    <span className="links_name">رموز التأكيد</span>
                    </Link>
                    <span className="tooltip">رموز التأكيد</span>
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
