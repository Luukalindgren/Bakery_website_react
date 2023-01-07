import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import { NumericFormat } from "react-number-format"

//TODO:
// - Add indexes and emojis to the producst
// - Change product ratings from numbers to stars X/5
// - Make the API calls dynamic, so that the customerNumber is not hardcoded
// - Make product listing pagiation work, max 6 products per page
// - Make the next and previous buttons work
// - Order error and succes alerts/messages
// - If order status is ordered, lock product selection and order button
// - OPTIONAL: Style the pages




function Order() {

    //States
    const [products, setProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [basket, setBasket] = useState([]);
    const [productsPage, setProductsPage] = useState(1);

    //APIs
    //CustmoerNumber should not be hardcoded
    const APIStatus = 'https://bakery-4ea18f31.digi.loikka.dev/v1/bakery?customerNumber=123456';
    const APIProducts = 'https://bakery-4ea18f31.digi.loikka.dev/v1/bakery/products?customerNumber=123456&skip=0&limit=6';
    const APIOrder = 'https://bakery-4ea18f31.digi.loikka.dev/v1/bakery';
    

    //API calls
    useEffect(() => {
        getProducts()
        getStatus()
    }, []);
    

    //Order status from API
    const getStatus = () => {
        fetch(APIStatus)
        .then(response => response.json())
        .then(response => {
            //console.log(response.data[0])
            setOrderStatus(response.data[0].status)
        })
    }


    //Iterate through API JSON and create an array of objects to be added to state
    const getProducts = () => {
        const listOfProducts = [];
        fetch(APIProducts)
        .then(response => response.json())
        .then(response => { 
            response.data.forEach(product => {
                const productObject = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    amount: product.amount,
                    rating: product.rating,
                    image: product.image,
                    selected: false
                }
                listOfProducts.push(productObject);
            });
            setProducts(listOfProducts)})
    }

    //Handle click on product, updates selectedProducts and Basket states
    const handleClick = (id) => {
        const newProducts = products.map(product => {
            if (product.id === id) {
                product.selected = !product.selected;
            }
            return product.selected;
        });
        setSelectedProducts(newProducts);
        
        const newBasket = products.filter(product => product.selected === true);
        setBasket(newBasket);
    }

    const handleOrder = () => {
        const resetSelectedProducts = products.map(product => {
            product.selected = false;
            return product.selected;
        });
        setSelectedProducts(resetSelectedProducts);
        setBasket([]);
        alert("Order sent!");

       
    }

    //Calculate total price of the products in basket
    const calculateTotal = () => {
        let total = 0;
        basket.forEach(product => {
            total += product.amount;
        })
        return total;
    }



    return (
        <div className="order">
            <header className="order-header">
                <div className='title'>
                    <h2>Ab Yritys Oy</h2>
                </div>
                <div className='basket'>
                    <NumericFormat value={calculateTotal()} decimalScale={2} displayType="text" suffix={'€'} decimalSeparator=',' thousandSeparator=' ' className="currency-total"/>
                    <p>{orderStatus === "not_ordered" ? "Not ordered" : "Ordered"}</p>
                </div>
                <div className='basket-button'>
                    <button type="button" id="order" disabled={!basket.length}
                    onClick={handleOrder} >Order</button>
                </div>
            </header>
            <div className='order-main'>
                <div className='products'>
                    {products.map(product => { 
                        return (
                            <div className={product.selected ? 'product-selected' : 'product'} onClick={() => handleClick(product.id)}>
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    amount={product.amount}
                                    rating={product.rating}
                                    image={product.image}
                                    selected={product.selected}
                                    index={product.id}
                                />
                            </div>
                        )})}
                </div> 
                <div className='navigation-products'>
                    <div className='navigation-buttons'>
                        <button type="button" id="previous" onClick={() => setProductsPage(productsPage - 1)
                        }>Previous</button>
                        <button type="button" id="next" onClick={() => setProductsPage(productsPage + 1)
                        } >Next</button>
                    </div>
                    <div className='navigation-pages'>
                        <h4>Page {productsPage} / {products.length / 6}</h4>
                    </div>
                    <div className='navigation-total'>
                        <h4>Total of {products.length} products</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;