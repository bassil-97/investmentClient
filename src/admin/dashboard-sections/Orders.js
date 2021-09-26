import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import Clock from '../../UI/Clock';

import axios from 'axios';


export default function Requests() {

    const [requests, setRequests] = useState();
    const columns = [
        "الاسم", 
        "رقم البطاقة", 
        "رقم الجوال", 
        "المبلغ المسترد", 
        "الحساب في مصرف", 
        "رقم البطاقة"
    ];

    const options = {
        filterType: 'checkbox',
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
                        name: responseData[key].user_fullname,
                        idNumber: responseData[key].user_id_number,
                        phoneNumber: responseData[key].phoneNumber,
                        refundAmount: responseData[key].refund_amount,
                        bankAccount: responseData[key].user_bank,
                        cardNumber: responseData[key].user_card_number,
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
                title={"بيانات العملاء"}
                data={requests}
                columns={columns}
                options={options}
            />}
        </div>
    )
}



