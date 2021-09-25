import React from 'react';
import './Breadcrump.css';

export default function Breadcrump(props) {
    return (
        <nav aria-label="breadcrumb" style={{ width: '100%', marginBottom: '20px'}}>
            <ol className="breadcrumb p-0" style={{background: 'none'}}>
                <li className="breadcrumb-item"><a href="/">الرئيسية</a></li>
                <li className="breadcrumb-item active" aria-current="page">{props.path}</li>
            </ol>
            <hr />
        </nav>
    )
}
