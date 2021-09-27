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
                />
                <small className="form-text text-muted">سيصلك رمز التأكيد الثاني الى هاتفك خلال لحظات</small>
            </div>
        </div>
    )
}
