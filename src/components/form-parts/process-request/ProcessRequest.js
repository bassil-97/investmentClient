import React, { useState, useEffect } from 'react';
import "./Process-request.css";

import Spinner from '../../../UI/Spinner';

export default function ProcessRequest({ increaseStep, handleNextBtnState }) {

    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        handleNextBtnState();
        setTimeout(function() {
            setShowSpinner(false);
            increaseStep();
        }, 20000);
    }, []);

    return (
        <div>
            {showSpinner && (<div className="d-flex align-items-center justify-content-center flex-column">
                <h5>العملية قيد المعالجة الرجاء الانتظار قليلاً</h5>
                <Spinner />
            </div>)}
        </div>
    )
}
