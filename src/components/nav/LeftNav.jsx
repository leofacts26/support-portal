import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData } from '../../features/menuSlice';
import { FaChevronDown, FaChevronRight, FaTicketAlt, FaShareAlt, FaUserFriends } from 'react-icons/fa';

const LeftNav = () => {
    const dispatch = useDispatch();
    const { menuList, isLoading } = useSelector((state) => state.menu);
    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        dispatch(fetchMenuData());
    }, [dispatch]);

    const handleToggle = (featureId) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [featureId]: !prevState[featureId],
        }));
    };

    const renderMenuItems = (items) => {
        return items.map((item) => (
            <li key={item.feature_id} className="nav-item">
                <NavLink
                    className="nav-link d-flex align-items-center"
                    to={`/${item.link}`}
                    onClick={() => item.children && handleToggle(item.feature_id)}
                >
                    <span className="me-2">
                        {item.parent_name === 'Support List Tickets' ? <FaTicketAlt /> :
                         item.parent_name === 'Support Get Vendor Show Details' ? <FaUserFriends /> : 
                         <FaShareAlt />}
                    </span>
                    {item.feature_name}
                    {item.children?.length > 0 && (
                        <span className="ms-auto">
                            {openMenus[item.feature_id] ? <FaChevronDown /> : <FaChevronRight />}
                        </span>
                    )}
                </NavLink>
                {item.children && openMenus[item.feature_id] && (
                    <ul className="navbar-nav ms-3">
                        {renderMenuItems(item.children)}
                    </ul>
                )}
            </li>
        ));
    };

    return (
        <div data-bs-theme="dark">
            <nav className="navbar navbar-vertical fixed-start navbar-expand-md" id="sidebar">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarCollapse"
                        aria-controls="sidebarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <a className="navbar-brand" href="./index.html">
                        <img
                            src="https://dashkit.goodthemes.co/assets/img/logo.svg"
                            className="navbar-brand-img mx-auto"
                            alt="..."
                        />
                    </a>
                    <div className="collapse navbar-collapse" id="sidebarCollapse">
                        <form className="mt-4 mb-3 d-md-none">
                            <div className="input-group input-group-rounded input-group-merge input-group-reverse">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <div className="input-group-text">
                                    <span className="fe fe-search" />
                                </div>
                            </div>
                        </form>
                        <ul className="navbar-nav">
                            {!isLoading ? (
                                renderMenuItems(menuList)
                            ) : (
                                <li className="nav-item">Loading...</li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default LeftNav;
