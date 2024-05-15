import { Link, Outlet } from "react-router-dom";

import "../Dashborad/dashboard.css";

function Sidebar() {
  return (
    <div className="dashbord">
      <div className="left-sidebar">
        <Link to="/dashboard/users">

          <i className="fa-solid fa-users"></i>Users
        </Link>
        <Link to="/dashboard/users/create">

          <i className="fa-solid fa-user"></i>Create user{" "}
        </Link>

        <Link to="products">

          <i className="fa-solid fa-tarp-droplet"></i> Products
        </Link>
        <Link to="products/create">

          <i className="fa-solid fa-plus"></i>create Product
        </Link>
      </div>
      <div className="container-users">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
