import { Link } from "react-router-dom";

import "./header.css";
import Cookies from "universal-cookie";
import axios from "axios";

function Header() {
  const cookie = new Cookies();

  const token = cookie.get("Bearer");
  

  async function handleLogOut () {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/";
  }

  return (
    <header className="header">
      <Link to={"/"} className="logo">
        Home
      </Link>
      <nav>
        <ul className="nav-links">
          {!token ? (
            <>
              <li>
                <Link className="btn" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="btn" to="/login">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="btn" to="/dashboard">
                  Dashborad
                </Link>
              </li>
              <li>
                <Link  onClick={handleLogOut}  className="btn" to="/dashboard">
                  log out
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
