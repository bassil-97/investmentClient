import React from 'react';

export default function ClientId({ handleChange, cardNumber }) {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="card-number">رقم بطاقة الصراف</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="card-number" 
                    value={cardNumber}
                    onChange={handleChange("clientCardNumber")}
                    maxLength="16"
                />
                <small id="emailHelp" className="form-text text-muted">رقم البطاقة يجب ألا يتجاوز 16 خانة</small>
            </div>
        </div>
    )
}
