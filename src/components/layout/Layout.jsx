import { Outlet, Link } from "react-router-dom";
import LeftNav from "../nav/LeftNav";
import TopNav from "../nav/TopNav";

const Layout = () => {
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