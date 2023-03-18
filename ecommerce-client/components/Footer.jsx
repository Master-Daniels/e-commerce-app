import React from "react";
import { AiFillInstagram, AiOutlineFacebook, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
    return (
        <div className="footer-container">
            <p>{new Date().getFullYear()} Phanox Stores. All rights reserved</p>
            <p className="icons">
                <AiFillInstagram />
                <AiOutlineTwitter />
                <AiOutlineFacebook />
            </p>
        </div>
    );
};

export default Footer;
