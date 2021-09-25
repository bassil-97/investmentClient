import React from 'react';
import './Dashboard-sections.css'

import BarChart from '../../UI/charts/BarChart';
import Clock from '../../UI/Clock';

export default function Analytics(props) {
    return (
        <div>
            <div className="db-header">
                <div className="text">
                    <h3 className="mb-0">Activities</h3>
                    <small className="text-muted">Here's an overview of your customers activities</small>
                </div>
                <Clock />
            </div>
            <div className="bar-chart">
                <BarChart />
            </div>
            <div className="row">
                <div className="col-lg d-flex align-items-center justify-content-center">
                    <div className="total-earnings">
                        <h6><i className='bx bxs-dollar-circle'></i> Total earnings</h6>
                        <h2>${props.earnings}</h2>
                    </div>
                </div>
                <div className="col-lg d-flex align-items-center justify-content-center">
                    <div className="total-earnings">
                        <h6>Total earnings</h6>
                        <h2>${props.earnings}</h2>
                    </div>
                </div>
                <div className="col-lg d-flex align-items-center justify-content-center">
                    <div className="total-earnings">
                        <h6>Total earnings</h6>
                        <h2>${props.earnings}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
