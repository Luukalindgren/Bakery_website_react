import React, { useState, useEffect } from "react";
import Product from "../components/Product";

function Order() {

    //States
    const [products, setProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState('');
    const [orderPrice, setOrderPrice] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productsPage, setProductsPage] = useState(1);

    //APIs
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
                    price: product.price,
                    rating: product.rating,
                    image: product.image,
                    selected: false
                }
                listOfProducts.push(productObject);
            });
            setProducts(listOfProducts)})
    }

    //Handle click on product
    const handleClick = (id) => {
        const newProducts = products.map(product => {
            if (product.id === id) {
                product.selected = !product.selected;
            }
            return product;
        });
        setSelectedProducts(newProducts);
        console.log(selectedProducts)
        
    }


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
                    <button type="button" id="order" disabled={orderStatus === 'not_ordered'} >Order</button>
                </div>
            </header>
            <div className='Order-main'>
                <div className='products'>
                    {products.map(product => {
                        return (
                            <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                rating={product.rating}
                                image={product.image}
                                selected={product.selected}
                                
                            />
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