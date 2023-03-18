import React, { useRef, useEffect } from "react";

import Link from "next/link";

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import toast from "react-hot-toast";

import { useStateContext } from "../context/stateContext";

import { urlFor } from "../sanity/sanityClient";

import getStripe from "../stripe/getStripe";

import axios from "axios";

const Cart = () => {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            e.stopPropagation();
            if (e.target.className === "cart-wrapper") {
                setShowCart(false);
            }
        });

        return () => {
            document.body.removeEventListener("click", (e) => {
                e.stopPropagation();
                if (e.target.className === "cart-wrapper") {
                    setShowCart(false);
                }
            });
        };
    }, []);

    const handleCheckout = async () => {
        const stripe = await getStripe();
        const { data } = await axios.post("/api/stripe", JSON.stringify(cartItems), {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (data.statusCode === 500) return;

        toast.loading("Redirecting...");
        console.log(data);
        stripe.redirectToCheckout({ sessionId: data.id });
    };

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className="heading">Total : </span>
                    <span className="cart-num-items">{totalQuantities} items</span>
                </button>
                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Your Shopping bag is empty</h3>
                        <Link href="/">
                            <button type="button" onClick={() => setShowCart(false)} className="btn">
                                Continue shopping
                            </button>
                        </Link>
                    </div>
                )}
                <div className="product-container">
                    {cartItems.length >= 1 &&
                        cartItems.map((item) => (
                            <div className="product" key={item._id}>
                                <img src={urlFor(item?.image[0])} className="cart-product-image" alt="product-image" />
                                <div className="item-desc">
                                    <div className="flex top">
                                        <h5>{item.name}</h5>
                                        <h4>${item.price}</h4>
                                    </div>
                                    <div className="flex bottom">
                                        <div>
                                            <p className="quantity-desc">
                                                <span
                                                    className="minus"
                                                    onClick={() => toggleCartItemQuantity(item._id, "dec", item)}
                                                >
                                                    <AiOutlineMinus />
                                                </span>
                                                <span className="num">{item.quantity}</span>
                                                <span
                                                    className="plus"
                                                    onClick={() => toggleCartItemQuantity(item._id, "inc")}
                                                >
                                                    <AiOutlinePlus />
                                                </span>
                                            </p>
                                        </div>
                                        <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                                            <TiDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick={handleCheckout}>
                                Pay With Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
