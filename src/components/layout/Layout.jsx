import { Outlet, Link, useNavigate } from "react-router-dom";
import LeftNav from "../nav/LeftNav";
import TopNav from "../nav/TopNav";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = () => {
  const { token } = useSelector((state) => state.authSlice);
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])


  return (
    <>
      <LeftNav />

      <div className="main-content" style={{ marginLeft: '250px' }}>
        <TopNav />

        <Outlet />
      </div>
    </>
  )
};

export default Layout;