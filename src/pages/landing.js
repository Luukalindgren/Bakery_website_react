import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Landing() {

    //States
    const [customerNumber, setCustomerNumber] = useState('');

    //Popup
    const ref = useRef();
    const openPopup = () => ref.current.open();

    //Very safe list of available customer numbers... :)
    const customers = [ "123456" ]

    //For smooth transition between pages, because windows.location.href reloads the page
    const navigate = useNavigate();

    //Handle click on Continue button
    const handleContinue = () => {
        if(customers.includes(customerNumber)) {
            console.log("Welcome " + customerNumber + "!");
            navigate("/order", { state: { customerNumber: customerNumber}});
        } 
        else openPopup();
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