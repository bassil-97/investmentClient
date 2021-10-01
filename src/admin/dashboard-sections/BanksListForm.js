import React, { useState } from 'react';

import './Dashboard-sections.css';
import Clock from '../../UI/Clock';
import Snackbar from '../../UI/Snackbar';

import axios from 'axios';

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
        axios.post("https://investment-com.herokuapp.com/add-bank", {
           bankName: newBank,
        }).then((response) => {
            if(response.data["saved"]) {
                setShowSnackbar(true);
                setNewBank("");
            }
        }).catch((error) => {
            console.log(error);
        });        
    }

    const imageChangerHandler = (event) => {
        
        const imageForm = document.getElementById("imageForm");
        const imageInput = document.getElementById("imageInput");

        imageForm.addEventListener("submit", async  => {
        
            const file = imageInput.files[0];

            //Get secure url form the server
            const { url } = await fetch("/s3Url").then(res => res.json());
            console.log(url);

            //Post the image to S3
        });
    };

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
                <form onSubmit={imageChangerHandler}>
                    <div class="form-group" id="imageForm">
                        <label>تحميل صورة</label>
                        <input type="file" id="imageInput" class="form-control w-75" accept="image/*" />
                        <button type="submit" className="btn btn-success">تحميل</button>
                    </div>
                </form>
            </div>
            <Snackbar 
                open={showSnackbar} 
                handleClose={handleClose}  
                message={"تم إضافة البنك بنجاح"}
            />
        </div>
    )
}
