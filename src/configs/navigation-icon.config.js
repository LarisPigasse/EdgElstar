import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineShoppingCart,
    HiOutlineDotsHorizontal,
    HiOutlineSortDescending,
    HiOutlineCog,
    HiOutlineKey,
    HiOutlineChartSquareBar,
    HiOutlineUser,
    HiOutlineUsers,
    HiOutlineLink,    
} from 'react-icons/hi'

const navigationIcon = {
    home: <HiOutlineHome />,
    crm: <HiOutlineUsers />,
    cart: <HiOutlineShoppingCart/>,
    option: <HiOutlineDotsHorizontal/>,
    monitor: <HiOutlineDesktopComputer/>,
    admin: <HiOutlineSortDescending/>,
    setup: <HiOutlineCog/>,
    account: <HiOutlineKey/>,
    stat: <HiOutlineChartSquareBar/>,
    user: <HiOutlineUser/>,                          
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    link: <HiOutlineLink />,

    
}

export default navigationIcon
