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
                        <h6>Total orders</h6>
                        {
                            props.orders 
                            ? <h4 className="mb-0">{props.orders.length}</h4>
                            : <Spinner />
                        }
                    </div>
                    <div className="data-box" data-aos="zoom-in">
                        <h6>Total products</h6>
                        {
                            props.products 
                            ? <h4 className="mb-0">{props.products.length}</h4>
                            : <Spinner />
                        }
                    </div>
                </div>
                <hr className="w-100" />
            </div>
        </div>
    )
}
