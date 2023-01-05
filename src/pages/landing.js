import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {

    const [customerNumber, setCustomerNumber] = useState('');

    //Sulavaan sivunvaihtoon, koska windows.location.href lataa turhaan sivun uudestaan
    const navigate = useNavigate();

    function handleContinue() {
        if(customerNumber === "123456") {
            navigate("/order");
            console.log("Welcome 123456");
        } 
        else alert('Please enter correct customer number');
        }


    return (
        <div className="Landing">
            <header className="Landing-header">
                <div className='header'>
                    <h2>Ab Yritys Oy</h2>
                </div>
            </header>
            <div className='Landing-main'>
                <div className='Landing-main-form'>
                    <h3>Customer Number</h3>
                    <input type="text" name="customerNumber" value={customerNumber} onChange={(e) => setCustomerNumber(e.target.value)} />
                    <br/>  
                    <button type="submit" onClick={handleContinue} >Continue</button> 
                </div>
            </div>
        </div>
    );
};

export default Landing;