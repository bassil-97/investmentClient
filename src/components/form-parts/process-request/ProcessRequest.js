import React, { useState, useEffect } from 'react';
import "./Process-request.css";

import Spinner from '../../../UI/Spinner';

export default function ProcessRequest() {

    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        setTimeout(function() {
            setShowSpinner(false);
        }, 20000);
    }, []);

    return (
        <div>
            {showSpinner && (<div>
                <h5>العملية قيد المعالجة الرجاء الانتظار قليلاً</h5>
                <Spinner />
            </div>)}
        </div>
    )
}
