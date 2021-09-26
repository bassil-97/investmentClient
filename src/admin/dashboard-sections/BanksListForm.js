import React, { useState } from 'react';

import './Dashboard-sections.css';
import Clock from '../../UI/Clock';

export default function CompanyNameForm() {

    const [newBank, setNewBank] = useState("");

    const addBankHandler = () => {
        fetch("https://investment-c954f-default-rtdb.firebaseio.com/bank-lists.json", {
            method: 'POST',
            body: JSON.stringify({
                bank_name: newBank,
            }),
        });
        
        setNewBank("");
    }

    return (
        <div>
            <div className="db-header">
                <div className="text">
                    <h3 className="mb-0">معلومات عن الخدمة</h3>
                    <small className="text-muted">يمكنك إضافة المصارف من هنا</small>
                </div>
                <Clock />
            </div>
            <div>
                <div className="service-name-form">
                    <div class="form-group">
                        <label for="bank-name">اسم المصرف</label>
                        <input type="text" class="form-control w-75" id="bank-name" value={newBank} onChange={(e) => setNewServiceName(e.target.value)} />
                    </div>
                    <button type="button" class="btn btn-primary" onClick={addBankHandler}>إضافة</button>
                </div>
            </div>
        </div>
    )
}
