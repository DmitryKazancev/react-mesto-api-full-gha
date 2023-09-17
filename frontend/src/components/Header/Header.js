import React from "react";
import { Link, Route, Routes } from "react-router-dom";


import logo from '../../images/logo-header.svg'
function Header({email, handleSignOut}) {
    
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип сайта Место"
                className="header__logo"
            />
            <Routes>
                <Route path='sign-in' element={
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                }/>
                <Route path='sign-up' element={
                    <Link to="/sign-in" className="header__link">Войти</Link>
                }/>
                <Route path='/' element={
                    <div className="header__info">
                        <span className="header__email">{email}</span>
                        <button className="header__button" onClick={handleSignOut}>Выйти</button> 
                    </div>}/>
            </Routes>
        </header>
    )
}

export default Header;