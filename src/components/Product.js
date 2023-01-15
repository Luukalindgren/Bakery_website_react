import React from 'react';
import Emoji from "./Emoji";
import { NumericFormat } from "react-number-format"
import StarRatings from 'react-star-ratings';


const Product = (props) => (
    <>
        <div className='product-image'>
            <img src={props.image} alt={props.name} />
            <div className='product-image-index'>
                {/\d/.test(props.index) ? <p>{props.index}</p> : <Emoji symbol={props.index} label="index"/>}
            </div> 
        </div>
        <div className='product-description'>
            <b>{props.name}</b>
            {props.selected ? <Emoji symbol="✓" label="checkmark"/> : null}
            <p>{props.description}</p>
            <StarRatings starRatedColor='black' rating={props.rating} starDimension='15px' starSpacing='0px' numberOfStars={5} name='rating'/>
            <NumericFormat value={props.amount} displayType="text" suffix={'€'} decimalSeparator=',' thousandSeparator=' ' className='currency'/>
        </div>
    </>
);
export default Product;