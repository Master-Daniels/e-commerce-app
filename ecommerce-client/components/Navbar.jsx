import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./index";

import { useStateContext } from "../context/stateContext";

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    return (
        <div className="navbar-container">
            <p className="navbar-home">
                <Link href={`/`}>Phanox Stores</Link>
            </p>
            <div className="buttons">
                <button>
                    <Link href={"/addService"}>Add product or Service</Link>
                </button>
                <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
                    <AiOutlineShopping />
                    <span className="cart-item-qty">{totalQuantities}</span>
                </button>
            </div>
            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;
