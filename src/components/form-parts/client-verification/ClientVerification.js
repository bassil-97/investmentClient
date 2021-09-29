import React from 'react';

export default function ClientVerification({ handleChange }) {
    return (
        <div>
            <div className="form-group">
                <label htmlFor="verification-code">ادخل رمز التأكيد</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="verification-code" 
                    onChange={handleChange("verificationCode")}
                    maxLength="4"
                />
            </div>
            <h6 className="text-center">الرجاء الانتظار حيثما يصلك رمز التأكيد الأول قد تستغرق هذه العملية من 1 - 5 دقائق</h6>
        </div>
    )
}
