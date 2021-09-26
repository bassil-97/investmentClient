import React from 'react';
import FormIndex from '../form-parts/Form';

import { useSelector } from 'react-redux';

export default function Home() {

    const name = useSelector(state => state.companyName.company_name);

    return (
        <div>
            <div className="main-banner">
                <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/100/000000/external-court-law-and-crime-kiranshastry-solid-kiranshastry.png"/>
                <h1>{name}</h1>
            </div>
            <FormIndex />
        </div>
    )
}
