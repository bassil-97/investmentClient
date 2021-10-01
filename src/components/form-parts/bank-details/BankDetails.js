import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BankDetails({ handleChange, refundAmount, bankAccount }) {

    const [banksList, setBanksList] = useState([]);

    useEffect(() => {
        const fetchBanksList = () => {
            
            let loadedBanksList = [];

            axios.get("https://investment-com.herokuapp.com/banks-list").then((response) => {
                if(response.data["banks"]) {
                    for(const key in response.data["banks"]) {
                        loadedBanksList.push({
                            name: response.data["banks"][key].bank_name,
                        });
                    }

                    console.log(loadedBanksList);
                    setBanksList(loadedBanksList);
                }
            });

        };

        fetchBanksList();
    }, []);

    return (
        <div>
            <div className="form-group">
                <label htmlFor="client-name">المبلغ المسترجع</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="refund-amount" 
                    placeholder="الرجاء أدخال المبلغ المسترجع"
                    value={refundAmount}
                    onChange={handleChange("refundAmount")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bank-name">حسابك في مصرف</label>
                <select className="form-control" id="bank-name" value={bankAccount} onChange={handleChange("clientBankAccount")}>
                    {
                        banksList && banksList.map((bank, index) => (
                            <option key={index} value={bank.name} defaultValue>{bank.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}
