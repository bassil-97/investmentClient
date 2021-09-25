import React from 'react';

export default function BankDetails({ handleChange, refundAmount }) {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="client-name">المبلغ المسترجع</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="refund-amount" 
                    value={refundAmount}
                    onChange={handleChange("refundAmount")}
                />
            </div>
            <div className="form-group">
                <label htmlFor="bank-name">حسابك في مصرف</label>
                <select className="form-control" id="bank-name" onChange={handleChange("clientBankAccount")}>
                    <option>الأهلي</option>
                    <option>الراجحي</option>
                    <option>بنك فلسطين</option>
                </select>
            </div>
        </div>
    )
}
