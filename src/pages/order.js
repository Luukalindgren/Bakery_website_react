import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Product from "../components/Product";
import { NumericFormat } from "react-number-format";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

//TODO:
// ✓ Add indexes and emojis to the producst
// ✓ Change product ratings from numbers to stars X/5
// ✓ Make product ordering actually do something
// ✓ Order error and succes alerts/messages
// ✓ Make the API calls dynamic, so that the customerNumber is not hardcoded
// ✓ Make product listing pagiation work, max 6 products per page
// ✓ Make the next and previous buttons work
// ✓ If order status is ordered, lock product selection and order button
// ✓ Total amount of products and pages are hardcoded
// ✓ Product selection does not work with pagiation + save the selected products after order, to see what is been ordered
// ✓ Make the site responsive
// ✓ Format and clean the code
// - BASKET DOES NOT WORK RIGHT IF RECLICKED ON PRODUCT AFTER PAGE CHANGE!

function Order() {
  //States
  const location = useLocation();
  const [customerNumber] = useState(location.state.customerNumber);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [productsPage, setProductsPage] = useState(1);
  const [skippedProducts, setSkippedProducts] = useState(0);
  const [forceRender, setForceRender] = useState(false);

  //Popup
  const ref = useRef();
  const openPopup = () => ref.current.open();

  //API calls on component mount, customer number change and page change and forceRender
  //This is the problem for the order status not updating when order is placed!!
  useEffect(() => {
    getStatus(
      "https://bakery-4ea18f31.digi.loikka.dev/v1/bakery?customerNumber=" +
        customerNumber
    );
    getProducts(
      "https://bakery-4ea18f31.digi.loikka.dev/v1/bakery/products?customerNumber=" +
        customerNumber +
        "&skip=" +
        skippedProducts +
        " &limit=" +
        6
    );
  }, [customerNumber, skippedProducts, forceRender]);

  //Reset selected products and basket after ordered and order status is updated back to not_ordered
  useEffect(() => {
    if (orderStatus === "not_ordered") {
      setSelectedProducts([]);
      setBasket([]);
    }
  }, [orderStatus]);

  //Update basket when selected products change
  //THIS IS PROBLEMATIC, NEEDS TO BE FIXED!! PROBABLY BETTER WITH .FILTER()
  // useEffect(() => {
  //     const newBasket = [...basket];
  //     products.forEach(product => {
  //         if (selectedProducts.includes(product.id) && !newBasket.includes(product)) newBasket.push(product);
  //     });
  //     setBasket(newBasket);
  //     console.log(basket)
  // }, [selectedProducts, productsPage]);

  //Order status from API
  const getStatus = (APIStatus) => {
    fetch(APIStatus)
      .then((response) => response.json())
      .then((response) => {
        setOrderStatus(response.data[0].status);
      });
  };

  //Iterate through API JSON and create an array of objects to be added to state
  const getProducts = (APIProducts) => {
    const listOfProducts = [];
    fetch(APIProducts)
      .then((response) => response.json())
      .then((response) => {
        //Amount of products in the API
        setAllProducts(response.metadata.total);
        //Iterate through limited amount of products
        response.data.forEach((product) => {
          const productObject = {
            id: product.id,
            name: product.name,
            description: product.description,
            amount: product.amount,
            rating: product.rating,
            image: product.image,
            selected: selectedProducts.includes(product.id) ? true : false,
          };
          listOfProducts.push(productObject);
        });
        setProducts(listOfProducts);
      });
  };

  //Stupid way to force rerender, used to update order status, used when popup is closed
  const forceRenderFunction = () => {
    setForceRender((prevValue) => !prevValue);
  };

  //Formats selected produtcs so that fetch POST can be made with it
  const stringifyOrder = () => {
    const ord = {
      customerNumber: customerNumber,
      products: basket.map((product) => {
        return product.id;
      }),
    };
    return JSON.stringify(ord);
  };

  //POST request to API for making an order
  const postOrder = new Request(
    "https://bakery-4ea18f31.digi.loikka.dev/v1/bakery",
    {
      method: "POST",
      body: stringifyOrder(),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }
  );

  //Handle click on product, updates selectedProducts
  const handleClick = (id) => {
    const newProducts = [...selectedProducts];
    const newBasket = [...basket];
    products.forEach((product) => {
      if (product.id === id) {
        //Toggle product selection for visuals
        product.selected = !product.selected;
        //If product is already selected, remove it from array, else add it to array
        selectedProducts.includes(product.id)
          ? newProducts.splice(selectedProducts.indexOf(product.id), 1)
          : newProducts.push(product.id);
        //If product is already selected, remove it from basket, else add it to basket
        basket.includes(product)
          ? newBasket.splice(basket.indexOf(product), 1)
          : newBasket.push(product);
      }
    });
    setSelectedProducts(newProducts);
    setBasket(newBasket);
  };

  //Handle order button click
  const handleOrder = () => {
    fetch(postOrder)
      .then((response) => response.json())
      .then((response) => console.log(response));

    openPopup();
    forceRenderFunction();
  };

  //Calculate total price of the products in basket
  const calculateTotal = () => {
    let total = 0;
    basket.forEach((product) => {
      total += product.amount;
    });
    return total;
  };

  //Get index from products id
  const getIndex = (props) => {
    let index;
    for (let i = 3; i < props.id.length; i++) {
      if (props.id[i] !== "0") {
        index = props.id.slice(i);
        break;
      }
    }
    //FizzBuzz logic
    if (Number(index) % 15 === 0) return "😍";
    else if (Number(index) % 5 === 0) return "💖";
    else if (Number(index) % 3 === 0) return "👍";
    else return "#" + index;
  };

  //Render
  return (
    <div className="order">
      <header className="order-header">
        <div className="title">
          <h2>Ab Yritys Oy</h2>
        </div>
        <div className="basket">
          <NumericFormat
            value={calculateTotal()}
            decimalScale={2}
            displayType="text"
            suffix={"€"}
            decimalSeparator=","
            thousandSeparator=" "
            className="currency-total"
          />
          <p>{orderStatus === "not_ordered" ? "Not ordered" : "Ordered"}</p>
        </div>
        <div className="basket-button">
          <button
            type="button"
            id="order"
            disabled={!basket.length || orderStatus !== "not_ordered"}
            onClick={handleOrder}
          >
            Order
          </button>
          <Popup ref={ref} onClose={forceRenderFunction}>
            <span>
              {orderStatus !== "not_ordered"
                ? "Order placement failed!"
                : "Order placement succeeded!"}
            </span>
          </Popup>
        </div>
      </header>
      <div className="order-main">
        <div
          className={`products${orderStatus === "ordered" ? "-disabled" : ""}`}
        >
          {products.map((product) => {
            return (
              <div
                className={product.selected ? "product-selected" : "product"}
                onClick={() => handleClick(product.id)}
                key={product.id}
              >
                <Product
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  amount={product.amount}
                  rating={product.rating}
                  image={product.image}
                  selected={product.selected}
                  index={getIndex(product)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="navigation-products">
        <div className="navigation-buttons">
          <button
            type="button"
            id="previous"
            disabled={productsPage <= 1}
            onClick={() => {
              setProductsPage((prevPage) => prevPage - 1);
              setSkippedProducts((prevSkipped) => prevSkipped - 6);
            }}
          >
            Previous
          </button>
          <button
            type="button"
            id="next"
            disabled={productsPage === 7}
            onClick={() => {
              setProductsPage((prevPage) => prevPage + 1);
              setSkippedProducts((prevSkipped) => prevSkipped + 6);
            }}
          >
            Next
          </button>
        </div>
        <div className="navigation-pages">
          <h4>
            Page {productsPage} / {allProducts / products.length}
          </h4>
        </div>
        <div className="navigation-total">
          <h4>Total of {allProducts} products</h4>
        </div>
      </div>
    </div>
  );
}

export default Order;
