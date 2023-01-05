import React from 'react';
import Emoji from "./Emoji";

const Product = props => (


    <div className='product'>
        <div className='product-image'>
            <img src={props.image} alt={props.name} />
            <div className='product-image-index'>
                <p style={{float: "right"}}>#1</p>
            </div> 
        </div>
        <div className='product-description'>
            <b>{props.name}</b>
            <Emoji symbol="✅" label="checkmark" />
            <p>{props.description}</p>
            <b>{props.rating} / 5 </b>
            <p style={{textAlign: "right"}}>{props.amount}€</p>
        </div>
    </div>

);
export default Product;