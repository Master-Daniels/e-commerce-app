import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [quantity, setQuantity] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prev) => prev + product.price * quantity);
        setTotalQuantities((prev) => prev + quantity);

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((item) => {
                if (item._id === product._id) {
                    return { ...item, quantity: item.quantity + quantity };
                }
            });
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        setQuantity(1);
        toast.success(`${quantity} ${product.name} added to cart`);
    };

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prev) => prev - foundProduct.quantity);
        setCartItems(newCartItems);
    };

    const toggleCartItemQuantity = (id, value, product = {}) => {
        foundProduct = cartItems.find((item) => item._id === id);
        // index = cartItems.findIndex((product) => product._id === id);
        index = cartItems.indexOf(foundProduct);

        const newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === "inc") {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prev) => +prev + +foundProduct.price);
            setTotalQuantities((prev) => prev + 1);
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prev) => +prev - +foundProduct.price);
                setTotalQuantities((prev) => prev - 1);
            } else onRemove(product);
        }
    };

    const increaseQty = () => setQuantity((prev) => prev + 1);
    const decreaseQty = () =>
        setQuantity((prev) => {
            if (prev <= 1) return 1;
            return prev - 1;
        });

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                quantity,
                increaseQty,
                decreaseQty,
                onAdd,
                onRemove,
                setShowCart,
                toggleCartItemQuantity,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
