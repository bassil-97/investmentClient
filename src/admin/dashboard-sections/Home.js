import React, { useEffect, useState } from 'react';
import Clock from '../../UI/Clock';

import './Dashboard-sections.css';

import axios from 'axios';

export default function Home(props) {

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
                            requests 
                            ? <h4 className="mb-0">{requests.length}</h4>
                            : <h4>0</h4>
                        }
                    </div>
                </div>
                <hr className="w-100" />
            </div>
        </div>
    )
}
