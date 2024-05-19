import React from 'react'
import { Link } from 'react-router-dom'

const LeftNav = () => {
    return (
        <>
            <nav
                className="navbar navbar-vertical fixed-start navbar-expand-md"
                id="sidebar"
            >
                <div className="container-fluid">
                    {/* Toggler */}
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
                    {/* Brand */}
                    <a className="navbar-brand" href="./index.html">
                        <img
                            src="https://dashkit.goodthemes.co/assets/img/logo.svg"
                            className="navbar-brand-img mx-auto"
                            alt="..."
                        />
                    </a>
                    {/* User (xs) */}
                    <div className="navbar-user d-md-none">
                        {/* Dropdown */}
                        <div className="dropdown">
                            {/* Toggle */}
                            <a
                                href="#"
                                id="sidebarIcon"
                                className="dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <div className="avatar avatar-sm avatar-online">
                                    <img
                                        src="./assets/img/avatars/profiles/avatar-1.jpg"
                                        className="avatar-img rounded-circle"
                                        alt="..."
                                    />
                                </div>
                            </a>
                            {/* Menu */}
                            <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="sidebarIcon"
                            >
                                <a href="./profile-posts.html" className="dropdown-item">
                                    Profile
                                </a>
                                <a href="./account-general.html" className="dropdown-item">
                                    Settings
                                </a>
                                <hr className="dropdown-divider" />
                                <a href="./sign-in.html" className="dropdown-item">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Collapse */}
                    <div className="collapse navbar-collapse" id="sidebarCollapse">
                        {/* Form */}
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
                        {/* Navigation */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link " to="/">
                                    <i className="fe fe-grid" /> Dashboard
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#sidebarDashboards"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="sidebarDashboards"
                                >
                                    <i className="fe fe-home" /> Home Page
                                </a>
                                <div className="collapse" id="sidebarDashboards">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/explore-india" className="nav-link">
                                                Explore India
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/news-letter"
                                                className="nav-link"
                                            >
                                                News Letter
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/footer" className="nav-link">
                                                Footer
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>


                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#caterings"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="caterings"
                                >
                                    <i className="fe fe-home" /> Caterings
                                </a>
                                <div className="collapse" id="caterings">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/vendor-list" className="nav-link">
                                                Vendor List
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/cuisines"
                                                className="nav-link"
                                            >
                                                Cuisines
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/occasions" className="nav-link">
                                                Occasions
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/budjet-filter" className="nav-link">
                                                Budjet Filter
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/food-types" className="nav-link">
                                                Food Types
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/faq" className="nav-link">
                                                Faq
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#tiffins"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="tiffins"
                                >
                                    <i className="fe fe-home" /> Tiffins
                                </a>
                                <div className="collapse" id="tiffins">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/tiffin-vendor-list" className="nav-link">
                                                Vendor List
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="/tiffin-cuisines"
                                                className="nav-link"
                                            >
                                                Cuisines
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/meal-time" className="nav-link">
                                                Meal Time
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/kitchen-type" className="nav-link">
                                                Kitchen Type
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/tiffin-budjet" className="nav-link">
                                                Tiffin Budjet
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/tiffin-food-types" className="nav-link">
                                                Tiffin Food Types
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/tiffin-faq" className="nav-link">
                                                Tiffin Faq
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>


                            <li className="nav-item">
                                <Link className="nav-link " to="/users">
                                    <i className="fe fe-grid" /> Users
                                </Link>
                            </li>


                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#ManageSubs"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="ManageSubs"
                                >
                                    <i className="fe fe-home" /> Subscription
                                </a>
                                <div className="collapse" id="ManageSubs">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/subscriptions" className="nav-link">
                                                Manage Subscription
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>


                            <li className="nav-item">
                                <Link className="nav-link " to="/discounts">
                                    <i className="fe fe-grid" /> Discounts
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " to="/notifications">
                                    <i className="fe fe-grid" /> Notifications
                                </Link>
                            </li>


                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#customercare"
                                    data-bs-toggle="collapse"
                                    role="button"
                                    aria-expanded="true"
                                    aria-controls="customercare"
                                >
                                    <i className="fe fe-home" /> Customer Care
                                </a>
                                <div className="collapse" id="customercare">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/roles-access" className="nav-link">
                                                Roles Access
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/employee-master" className="nav-link">
                                                Employee Master
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/user-master" className="nav-link">
                                                User Master
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/add-new" className="nav-link">
                                                Add New
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/share-links" className="nav-link">
                                                Share Links
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/follow-ups" className="nav-link">
                                                Follow Ups
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/support-tickets" className="nav-link">
                                                Support Tickets
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>




                        </ul>
                        {/* Divider */}
                        {/* <hr className="navbar-divider my-3" /> */}

                    </div>
                </div>
            </nav>

        </>
    )
}

export default LeftNav