import React from 'react';

export default function Loading() {
    return (
        <div className="mt-3 d-flex align-items-center flex-column">
            <h5 className="mb-0">الرجاء الانتظار لمطابقة البيانات</h5>
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
