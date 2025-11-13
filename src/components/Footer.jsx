/*
Author: Abla Eklou
Date: 11/13/2025
File: Footer.jsx
Description: create a  footer page
*/

const Footer = () => {
    const year = new Date().getFullYear();  //determine the current year with JavaScript
    return (
        <footer>
            <div className="container">
                <span>&copy;CAt Adoption. 2025-{year}</span>
            </div>
        </footer>
    );
};

export default Footer;