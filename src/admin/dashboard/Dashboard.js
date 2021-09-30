import React from 'react';
import './Dashboard.css';
import '../dashboard-sections/Dashboard-sections.css';
import '../Sidebar/Sidebar.css';
import {  Route, withRouter } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import Home from '../dashboard-sections/Home';
import CompanyNameForm from '../dashboard-sections/CompanyNameForm';
import Requests from '../dashboard-sections/Orders';
import BankListFrom from '../dashboard-sections/BanksListForm';


function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <section className="home-section">
                <Route path="/dashboard/home" component={Home} />
                <Route path="/dashboard/change-service-name" component={CompanyNameForm} />
                <Route path="/dashboard/requests" component={Requests} />
                <Route path="/dashboard/add-new-bank" component={BankListFrom} />
            </section>
            
        </div>
    )
}

export default withRouter(Dashboard);