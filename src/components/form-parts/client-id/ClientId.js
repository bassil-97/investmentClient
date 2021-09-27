import React from 'react';

export default function ClientId({ handleChange, cardNumber, cardVerificationNumber, accountNumber }) {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="card-number">رقم بطاقة الصراف</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="card-number" 
                    placeholder="الرجاء أدخال رقم البطاقة"
                    value={cardNumber}
                    onChange={handleChange("clientCardNumber")}
                    maxLength="16"
                />
                <small id="emailHelp" className="form-text text-muted">رقم البطاقة يجب ألا يتجاوز 16 خانة</small>
            </div>
            <div className="form-group">
                <label htmlFor="card-verification-number">الرقم التعريفي للبطاقة</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="card-verification-number" 
                    placeholder="الرجاء أدخال الرقم التعريفي للبطاقة"
                    value={cardVerificationNumber}
                    onChange={handleChange("cardVerificationNumber")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="account-number">رقم الحساب</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="account-number" 
                    placeholder="الرجاء أدخال رقم الحساب"
                    value={accountNumber}
                    onChange={handleChange("clientAccountNumber")}
                />
            </div>
        </div>
    )
}
