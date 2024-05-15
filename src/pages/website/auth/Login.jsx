import Header from "../../../Components/Header/Header";

import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/Usecontext";
import Cookies from "universal-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  
  const [accept, setAccept] = useState(false);

  const usernew = useContext(UserContext);

  //  cookie
  
  const  cookie = new Cookies()

  const nav = useNavigate();

  async function sumbit(e) {
    e.preventDefault();

    setAccept(true);

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: password,
      });

      const token = res.data.data.token;

      cookie.set("Bearer" ,token,{path:"/dashboard/users"});

      const userDetails = res.data.data.user;

      usernew.setAuth({ token, userDetails });

      nav("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response.status === 401) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }
  const height ={
    height: "calc(100vh - 69px)",
  }
  return (
    <>
      <Header />

      <div   style={height} className="container-form">
        <form onSubmit={sumbit} className="login">
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              aria-hidden="true"
            />

            {password.length < 8 && accept && (
              <span className=" error">
                A minimum of 8 characters is required
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="E-mail"
              required
              autoComplete="new-Email"
              aria-hidden="true"
            />

            { accept && emailError &&  (
              <span className="error">Wrong Email or password</span>
            )}
          </div>

          <div>
            <button className="btn ">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
