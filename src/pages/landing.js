import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h2>Ab Yritys Oy</h2>
            </header>
            <div className='App-main'>
                <h3>Customer Number</h3>
                <input type="text" name="customerNumber" />
                <br/>  
                <button type="button" >Continue</button> 
                <Link to="/order">Order</Link>
            </div>
        </div>
    );
};

export default Home;