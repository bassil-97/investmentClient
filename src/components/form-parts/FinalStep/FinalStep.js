import React, { useEffect } from 'react';

export default function FinalStep({ handleNextBtnState, handleChange }) {

    useEffect(() => {
        handleNextBtnState();
    }, []);

    return (
        <div>
            <div className="form-group">
                <label htmlFor="second-verification-code">رمز التأكيد الثاني</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="second-verification-code" 
                    placeholder="الرجاء ادخال رمز التأكيد الثاني"
                    onChange={handleChange("secondVerificationCode")}
                    maxLength="4"
                />
            </div>
            <h6 className="text-center">الرجاء الانتظار حيثما يصلك رمز التأكيد الثاني قد تستغرق هذه العملية من 1 - 5 دقائق</h6>
        </div>
    )
}
