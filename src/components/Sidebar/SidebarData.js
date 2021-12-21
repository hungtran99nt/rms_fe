import React from 'react';
import {AiFillDashboard, AiFillPieChart, AiFillSetting} from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {CgMenuBoxed} from "react-icons/cg";
import {MdInventory2} from "react-icons/md";

export const SidebarData = [
    {
        title: 'Tổng quan',
        path: '/',
        icon: <AiFillDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Thống kê',
        path: '/reports',
        icon: <AiFillPieChart />,
        cName: 'nav-text'
    },
    {
        title: 'Kho',
        path: '/inventory',
        icon: <MdInventory2 />,
        cName: 'nav-text'
    },
    {
        title: 'Thực đơn',
        path: '/menu',
        icon: <CgMenuBoxed />,
        cName: 'nav-text'
    },
    {
        title: 'Cài đặt',
        path: '/setting',
        icon: <AiFillSetting />,
        cName: 'nav-text'
    },
    {
        title: 'Hỗ trợ',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    }
];
