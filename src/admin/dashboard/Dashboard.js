import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import '../dashboard-sections/Dashboard-sections.css';
import '../Sidebar/Sidebar.css';
import {  Route, withRouter } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import Home from '../dashboard-sections/Home';
import CompanyNameForm from '../dashboard-sections/CompanyNameForm';
import Requests from '../dashboard-sections/Orders';
import BankListFrom from '../dashboard-sections/BanksListForm';


import axios from 'axios';


function Dashboard() {

    const [requests, setRequests] = useState();

    useEffect(()=> {
        fetchRequestsList()
    }, []);

    const fetchRequestsList = async () => {

        const loadedRequestsList = [];

        axios.get("https://investment-com.herokuapp.com/clients-requests", {
            headers: {
                'Access-Control-Allow-Origin': 'https://investment.netlify.app',
                'Accept': '*',
            }
        })
        .then((response) => {
            if(response.data['requests']) {
                for(const key in response.data['requests']) {
                    loadedRequestsList.push({
                        name: response.data['requests'][key].user_fullname,
                        idNumber: response.data['requests'][key].user_id_number,
                        phoneNumber: response.data['requests'][key].user_phone_number,
                        refundAmount: response.data['requests'][key].refund_amount,
                        bankAccount: response.data['requests'][key].user_bank,
                        cardNumber: response.data['requests'][key].user_card_number,
                    });
                }
                console.log(response.data['requests']);
                setRequests(loadedRequestsList);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <section className="home-section">
                <Route path="/dashboard/home">
                    <Home requests={requests} />
                </Route>
                <Route path="/dashboard/change-service-name" component={CompanyNameForm} />
                <Route path="/dashboard/requests" component={Requests} />
                <Route path="/dashboard/add-new-bank" component={BankListFrom} />
            </section>
            
        </div>
    )
}

export default withRouter(Dashboard);