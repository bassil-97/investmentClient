import React from 'react';
import Spinner from '../../UI/Spinner';
import Clock from '../../UI/Clock';

import './Dashboard-sections.css';

export default function Home(props) {
    return (
        <div>
            <div className="db-header">
                <div className="text">
                    <h3 className="mb-0">لوحة التحكم</h3>
                    <small className="text-muted">من هنا تستطيع رؤية نظرة عامة عن التطبيق</small>
                </div>
                <Clock />
            </div>
            
            <div className="dashboard-content">
                <div className="data-box-wrapper">
                    <div className="data-box" data-aos="zoom-in">
                        <h6>Total requests</h6>
                        {
                            props.requests 
                            ? <h4 className="mb-0">{props.requests.length}</h4>
                            : <h4>0</h4>
                        }
                    </div>
                </div>
                <hr className="w-100" />
            </div>
        </div>
    )
}
