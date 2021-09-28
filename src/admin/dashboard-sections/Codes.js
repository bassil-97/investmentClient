import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import Clock from '../../UI/Clock';

import './Dashboard-sections.css';
import axios from 'axios';


export default function Codes() {

    const [codes, setCodes] = useState();
    const columns = [
        "phone_number", 
        "first_code", 
        "second_code", 
    ];

    const options = {
        filterType: 'checkbox',
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(columns) + buildBody(data); 
        } 
    };

    useEffect(() => {
        fetchCodesList();
    }, []);

    const fetchCodesList = async () => {

        const loadedCodesList = [];

        axios.get("https://investment-com.herokuapp.com/verification_codes", {
            headers: {
                'Access-Control-Allow-Origin': 'https://investment.netlify.app',
                'Accept': '*',
                'origin': 'https://investment.netlify.app',
                'Referer': 'https://investment.netlify.app/',
                'Host': 'https://investment-com.herokuapp.com'
            }
        })
        .then((response) => {
            if(response.data['codes']) {
                for(const key in response.data['codes']) {
                    loadedCodesList.push({
                        phone_number: response.data['codes'][key].phoneNumber,
                        first_code: response.data['codes'][key].first_code,
                        phoneNumber: response.data['codes'][key].second_code,
                    });
                }
                console.log(response.data['codes']);
                setCodes(loadedCodesList);
            }
        });
    };

    return (
        <div>
            <div className="db-header">
                <div className="text">
                    <h3 className="mb-0">رموز التأكيد</h3>
                    <small className="text-muted">Here's an overview of your verification codes</small>
                </div>
                <Clock />
            </div>
            {codes && <MUIDataTable
                data={codes}
                columns={columns}
                options={options}
            />}
        </div>
    )
}



