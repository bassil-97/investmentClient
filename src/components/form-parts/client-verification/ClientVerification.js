import React from 'react';

export default function ClientVerification({ handleChange }) {
    return (
        <div className="text-center">
            <div className="form-group">
                <label htmlFor="verification-code">ادخل رمز التأكيد</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="verification-code" 
                    onChange={handleChange("verificationCode")}
                />
            </div>
        </div>
    )
}
