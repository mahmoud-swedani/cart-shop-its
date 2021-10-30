import React, { useEffect, useState } from "react";
import "./App.css";
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  selectCount,
} from "./features/counter/counterSlice";

const url = "https://wawinner.its.ae/dev/public/api/v1/front-end/campaign";

const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return { loading, data };
};

const App = () => {
  const { loading, data } = useFetch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (loading) return;
    setProducts(data);
  }, [loading]);

  return (
    <main>
      <div className="section-title"></div>
      {loading ? (
        <div className="lodfet">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div>Loading...</div>
        </div>
      ) : (
        <section className="followers">
          <div className="">
            <Product products={products} />
          </div>
        </section>
      )}
    </main>
  );
};

const Product = ({ products }) => {
  console.log(products);
  const [loved, setLoved] = useState(false);
  // const {description,created_at, image, is_prize, name,updated_at} = products[0].prize_id
  const counter = useSelector(selectCount);
  const onClickLovedBtn = () => {
    let notequles = !loved;
    setLoved(notequles);
  };
  const dispatch = useDispatch();
  return (
    <article className="product-groups">
      {/* <img src={} alt="alt" />  */}
      {products.map((pro) => {
        return (
          <div className="sin-product" key={pro.id}>
            <div className="c-groups">
              <div className="c1-center">
                <div className="c2-center">
                  <div className="c3-center">
                    <span className="c-tit">{pro.quantity_sold}</span>
                    <span className="c-sold">sold</span>
                    <span className="c-of">out of</span>
                    <span className="c-num">{pro.product_quantity}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ height: "150px" }}>
              <div className="col-4 col-sm-4">
                <div className="price-left">
                  <span className="pric-num">AED {pro.product_price}</span>
                </div>
                <div className="price-left-bo"></div>
              </div>
              <div className="col-4 col-sm-7 "></div>
              <div className="col-4 col-sm-1"></div>
            </div>

            <div className=" carded-group">
              <div className=" carded text-center">
                <img src={pro.product_id.image} className="img1" alt="..." />
                <h5 className="carded-title">{pro.product_id.name}</h5>
                <p className="carded-text">{pro.product_id.description}</p>
              </div>
              <div className=" carded carded2 text-center">
                <img src={pro.prize_id.image} className="img2" alt="..." />
                <h5 className="carded-title ct-2">{pro.prize_id.name}</h5>
                <p className="carded-text"> {pro.prize_id.description}</p>
              </div>
              <div className="right-icon ">
                <div className="love-groub-btn">
                  {loved ? (
                    <button
                      onClick={() => onClickLovedBtn()}
                      className="aibtn aibtn1 aitrue"
                    >
                      <FaHeart />
                    </button>
                  ) : (
                    <button
                      onClick={() => onClickLovedBtn()}
                      className="aibtn aibtn1"
                    >
                      <FaHeart />
                    </button>
                  )}

                  <button className="aibtn aibtn2">
                    <AiOutlineShoppingCart />
                  </button>
                </div>

                <div className="group-redux">
                  <div className="group-redux-action">
                    <button
                      onClick={() => dispatch(increment())}
                      className="ar add"
                    >
                      <AiFillPlusCircle />
                    </button>
                    <p className="conter">{counter.value}</p>
                    <button
                      onClick={() => dispatch(decrement())}
                      className="ar remove"
                    >
                      <AiFillMinusCircle />
                    </button>
                  </div>
                  <button className="show-in-cart">Show in Cart</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </article>
  );
};

export default App;
