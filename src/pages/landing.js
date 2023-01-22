import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Landing() {

    //States
    const [customerNumber, setCustomerNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    //API calls on customer number change, may be bad way to do this, because unnecessary API calls...
    //Didn't find other way to update customerNumber state before clicking 'Continue' button (Asyncronous problem?)
    useEffect(() => {
        if(customerNumber.length === 6) getStatus('https://bakery-4ea18f31.digi.loikka.dev/v1/bakery?customerNumber=' +  customerNumber);
    }, [customerNumber]);

    //Popup
    const ref = useRef();
    const openPopup = () => ref.current.open();

    //For smooth transition between pages, because windows.location.href reloads the page
    const navigate = useNavigate();

    //Handle click on Continue button
    const handleContinue = () => {
        if(orderStatus === 'ordered' || orderStatus === 'not_ordered') {
            console.log("Welcome " + customerNumber + "!");
            navigate("/order", { state: { customerNumber: customerNumber}});
        } 
        else openPopup();
    }


    //Order status from API
    const getStatus = (APIStatus) => {
        fetch(APIStatus)
        .then(response => response.json())
        .then(response => {
            setOrderStatus(response.data[0].status)})
    }


    //Render
    return (
        <div className="landing">
            <header className="landing-header">
                <div className='title'>
                    <h2>Ab Yritys Oy</h2>
                </div>
            </header>
            <div className='landing-main'>
                <div className='landing-main-form'>
                    <h3>Customer Number</h3>
                    <input type="text" name="customerNumber" value={customerNumber} onChange={(e) => setCustomerNumber(e.target.value)} />
                    <br/>  
                    <button type="submit" onClick={handleContinue} >Continue</button> 
                    <Popup ref={ref}>
                        <span>Customer Number not found!</span>
                    </Popup>
                </div>
            </div>
        </div>
    );
};

export default Landing;