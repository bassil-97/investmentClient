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
        "cardNumber"
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

        axios.get("https://investment-com.herokuapp.com/clients-requests")
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
            {requests && <MUIDataTable
                data={requests}
                columns={columns}
                options={options}
            />}
        </div>
    )
}



