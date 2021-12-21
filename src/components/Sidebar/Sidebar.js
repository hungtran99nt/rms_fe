import React from 'react';
import {NavLink} from "react-router-dom";
import {SidebarData} from "./SidebarData";
import {IconContext} from "react-icons";
import './Sidebar.css'

const Sidebar = ({sidebar}) => {
    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <NavLink exact to={item.path} activeClassName="selected">
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </IconContext.Provider>
    );
};

export default Sidebar;