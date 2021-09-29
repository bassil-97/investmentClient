import React, { useEffect, useState } from 'react';

export default function BankDetails({ handleChange, refundAmount }) {

    const [banksList, setBanksList] = useState([]);

    useEffect(() => {
        const fetchBanksList = async () => {
            const response  = await fetch("https://investment-com.herokuapp.com/banks-list");

            if(!response.ok) {
                throw new Error('Could not fetch banks list!');
            }

            const data = await response.json();
            let loadedBanksList = [];

            for(const key in data) {
                loadedBanksList.push({
                    name: data[key].bank_name,
                });
            }

            console.log(loadedBanksList);
            setBanksList(loadedBanksList);
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
                <select className="form-control" id="bank-name" onChange={handleChange("clientBankAccount")}>
                    {
                        banksList && banksList.map((bank) => (
                            <option key={bank.name} value={bank.name}>{bank.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}
