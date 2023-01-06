import React from 'react';
import Emoji from "./Emoji";
import { NumericFormat } from "react-number-format"

const Product = props => (

<>
    <div className='product-image'>
        <img src={props.image} alt={props.name} />
        <div className='product-image-index'>
            <p style={{float: "right"}}>#{props.index}</p>
        </div> 
    </div>
    <div className='product-description'>
        <b>{props.name}</b>
        {props.selected ? <Emoji symbol="✓" label="checkmark"/> : null}
        <p>{props.description}</p>
        <b>{props.rating} / 5 </b>
        <NumericFormat value={props.amount} displayType="text" suffix={'€'} decimalSeparator=',' thousandSeparator=' ' className='currency'/>
    </div>
</>
);
export default Product;