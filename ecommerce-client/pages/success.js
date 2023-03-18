import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/stateContext";

import { runFireworks } from "../utils/utils";

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, []);
    return (
        <div className="success-wraper">
            <div className="success">
                <p className="icon">{BsBagCheckFill}</p>
                <h2>Thank you for your purchase</h2>
                <p className="email-msg">Check your email inbox for the receipt.</p>
                <p className="description">
                    If you have any questions please forward them to this
                    <a className="email" href="mailto:order@example.com">
                        email
                    </a>
                </p>
                <Link href="/">
                    <buttton type="button" className="btn">
                        Continue Shopping
                    </buttton>
                </Link>
            </div>
        </div>
    );
};

export default Success;
