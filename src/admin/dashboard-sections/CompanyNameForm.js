import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Dashboard-sections.css';
import Clock from '../../UI/Clock';

export default function CompanyNameForm() {

    const company_name = useSelector(state => state.companyName.company_name);
    const [newServiceName, setNewServiceName] = useState("");

    const serviceNameHandler = () => {
        fetch("https://investment-c954f-default-rtdb.firebaseio.com/company.json", {
            method: 'PUT',
            body: JSON.stringify({
                name: newServiceName,
            }),
        });
        setNewServiceName("");
    }

    return (
        <div>
            <div className="db-header">
                <div className="text">
                    <h3 className="mb-0">معلومات عن الخدمة</h3>
                    <small className="text-muted">يمكنك تغيير اسم الخدمة من هنا</small>
                </div>
                <Clock />
            </div>
            <div>
                <h6>الاسم الحالي للخدمة: {company_name}</h6>
                <div className="service-name-form">
                    <div class="form-group">
                        <label for="service-name">اسم الخدمة الجديد</label>
                        <input type="text" class="form-control w-75" id="service-name" value={newServiceName} onChange={(e) => setNewServiceName(e.target.value)} />
                    </div>
                    <button type="button" class="btn btn-primary" onClick={serviceNameHandler}>حفظ التغييرات</button>
                </div>
            </div>
        </div>
    )
}
