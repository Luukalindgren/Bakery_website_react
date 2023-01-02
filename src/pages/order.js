import React from "react";
import '../App.css'

const Order = () => {
    return (
        <div className="Order">
            <header className="Order-header">
                <div className='header'>
                    <h2>Ab Yritys Oy</h2>
                </div>
                <div className='basket'>
                    <h3>X XXX,XX €</h3>
                    <p>Not ordered</p>
                    
                </div>
                <div className='basket-button'>
                    <button type="button" id="order" >Order</button>
                </div>
            </header>
            <div className='Order-main'>
                <div className='products'>
                    <div className='product'>
                        <div className='product-image'>
                            <div className='product-image-index'>
                                <p>#1</p>
                            </div> 
                        </div>
                        <div className='product-description'>
                            <b>Product name</b>
                            <p style={{float: "right"}}>Checkmark for selection</p>
                            <p>Product description</p>
                            <p>Rating X / 5 </p>
                            <p style={{textAlign: "right"}}>XX,XX€</p>
                        </div>
                    </div>
                    <div className='product'>
                        <div className='product-image'>
                            <div className='product-image-index'>
                                <p>#1</p>
                            </div> 
                        </div>
                        <div className='product-description'>
                            <b>Product name</b>
                            <p style={{float: "right"}}>Checkmark for selection</p>
                            <p>Product description</p>
                            <p>Rating X / 5 </p>
                            <p style={{textAlign: "right"}}>XX,XX€</p>
                        </div>
                    </div>
                    <div className='product'>
                        <div className='product-image'>
                            <div className='product-image-index'>
                                <p>#1</p>
                            </div> 
                        </div>
                        <div className='product-description'>
                            <b>Product name</b>
                            <p style={{float: "right"}}>Checkmark for selection</p>
                            <p>Product description</p>
                            <p>Rating X / 5 </p>
                            <p style={{textAlign: "right"}}>XX,XX€</p>
                        </div>
                    </div>
                </div> 
                <div className='navigation-products'>
                    <div className='navigation-buttons'>
                        <button type="button" id="previous" >Previous</button>
                        <button type="button" id="next" >Next</button>
                    </div>
                    <div className='navigation-pages'>
                        <h4>Page X / Y</h4>
                    </div>
                    <div className='navigation-total'>
                        <h4>Total XX products</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;