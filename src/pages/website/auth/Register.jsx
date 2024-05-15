import Header from "../../../Components/Header/Header";

import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/Usecontext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [accept, setAccept] = useState(false);

  const usernew = useContext(UserContext);

  // Cookeis

  const cookie = new Cookies();

  const nav = useNavigate();

  async function sumbit(e) {
    e.preventDefault();

    setAccept(true);

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      const token = res.data.data.token;

      const userDetails = res.data.data.user;

      usernew.setAuth({ token, userDetails });

      cookie.set("Bearer", token, { path: "/dashboard/users" });
      nav("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response && error.response.status === 401) {
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

      <div   style={height}   className="container-form ">
        <form onSubmit={sumbit} className="register">
          <div>
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="Name"
              aria-hidden="true"
            />
            {name.length < 2 && accept && (
              <span className="error">Name required</span>
            )}
          </div>

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
            <label htmlFor="PasswordRepeat">Password Repeat</label>
            <input
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              id="PasswordRepeat"
              type="password"
              placeholder="Password confirmation"
              autoComplete="Password-Confirmation"
              aria-hidden="true"
            />

            {passwordConfirmation !== password && accept && (
              <span className="error">Password does not match</span>
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

            {accept && emailError === 401 && (
              <span className="error">The email has already been taken</span>
            )}
          </div>

          <div>
            <button className="btn ">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
