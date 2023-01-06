import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {

    const [customerNumber, setCustomerNumber] = useState('');

    //Very safe list of available customer numbers... :)
    const customers = [ "123456" ]

    //For smooth transition between pages, because windows.location.href reloads the page
    const navigate = useNavigate();

    //Handle click on Continue button
    function handleContinue() {
        if(customers.includes(customerNumber)) {
            navigate("/order");
            console.log("Welcome " + customerNumber + "!");
        } 
        else alert('Please enter correct customer number');
        }


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
                </div>
            </div>
        </div>
    );
};

export default Landing;