import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../features/authSlice'

const TopNav = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onHandleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        dispatch(setToken(''));
        navigate('/login');
    }

    return (
        <>
            <nav
                className="navbar navbar-expand-md navbar-light d-none d-md-flex"
                id="topbar"
            >
                <div className="container-fluid">

                    {/* User */}
                    <div className="navbar-user w-100 me-4">

                        <div className="d-flex justify-content-end w-100">
                            {/* Dropdown */}
                            <div className="dropdown">
                                {/* Toggle */}
                                <a
                                    href="#"
                                    className="avatar avatar-sm avatar-online dropdown-toggle"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img
                                        src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg"
                                        alt="..."
                                        className="avatar-img rounded-circle"
                                    />
                                </a>
                                {/* Menu */}
                                <div className="dropdown-menu dropdown-menu-end">
                                    <div className="dropdown-item text-muted">
                                        {localStorage.getItem("username") || "Guest"}
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <div className="dropdown-item" style={{ cursor: 'pointer' }} onClick={onHandleLogout}>
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default TopNav