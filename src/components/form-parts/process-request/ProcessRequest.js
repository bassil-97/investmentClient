import React, { useState, useEffect } from 'react';
import "./Process-request.css";

import Loading from '../../../UI/Loading';

export default function ProcessRequest() {

    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
        setTimeout(function() {
            setShowSpinner(false);
        }, 20000);
    }, []);

    return (
        <div>
            <h5>العملية قيد المعالجة</h5>
            {showSpinner && <Loading />}
        </div>
    )
}
