import { Link } from "react-router-dom";

import "./headerdashborad.css";
function HeaderDashborad() {
  return (
    <div className="header-dashborad">
      <Link to={"/"}>Store</Link>
      <Link className="btn" to="/">
        go to website
      </Link>
    </div>
  );
}

export default HeaderDashborad;
