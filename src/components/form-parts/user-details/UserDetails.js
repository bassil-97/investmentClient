import React from 'react';

export default function UserDetails({ handleChange, fullName, idNumber, phoneNumber }) {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="client-name">الاسم الكامل</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="client-name" 
                    placeholder="الرجاء ادخال اسمك الكامل"
                    value={fullName}
                    onChange={handleChange("clientFullname")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="client-id">رقم الهوية</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="client-id" 
                    placeholder="الرجاء أدخال رقم الهوية"
                    value={idNumber}
                    onChange={handleChange("clientId")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="client-phonenumber">رقم الجوال</label>
                <input 
                    type="tel" 
                    className="form-control" 
                    id="client-phonenumber" 
                    placeholder="الرجاء أدخال رقم الجوال"
                    value={phoneNumber}
                    onChange={handleChange("clientPhoneNumber")}
                />
            </div>
        </div>
    )
}
