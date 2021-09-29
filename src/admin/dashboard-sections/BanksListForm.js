import React, { useState } from 'react';

import './Dashboard-sections.css';
import Clock from '../../UI/Clock';
import Snackbar from '../../UI/Snackbar';

export default function BankListFrom() {

    const [newBank, setNewBank] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShowSnackbar(false);
    };

    const addBankHandler = () => {
        fetch("https://investment-com.herokuapp.com/banks-list", {
            method: 'POST',
            body: JSON.stringify({
                bankName: newBank,
            }),
        });
        
        setShowSnackbar(true);
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
                        <input type="text" class="form-control w-75" id="bank-name" value={newBank} onChange={(e) => setNewBank(e.target.value)} />
                    </div>
                    <button type="button" class="btn btn-primary" onClick={addBankHandler}>إضافة</button>
                </div>
            </div>
            <Snackbar 
                open={showSnackbar} 
                handleClose={handleClose}  
                message={"تم إضافة البنك بنجاح"}
            />
        </div>
    )
}
