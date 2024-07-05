import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/pages/Divisions">Divisions</NavLink></li>
                <li><NavLink to="/pages/about">about</NavLink></li>
                <li><NavLink to="/pages/bar">bar</NavLink></li>
                <li><NavLink to="/pages/home">home</NavLink></li>
                <li><NavLink to="/pages/services">Services</NavLink></li>


            </ul>
        </nav>
    );
};

export default NavBar;
