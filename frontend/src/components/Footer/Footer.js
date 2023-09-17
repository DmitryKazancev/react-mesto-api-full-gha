import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
    const location = useLocation();
    const disableFooter = location.pathname === "/sign-up" || location.pathname === "/sign-in";

    return (
        <footer className="footer">
            { !disableFooter && (<p className="footer__copyright">© 2023 Mesto Russia</p>)
            }       
        </footer>
    )
}

export default Footer;