


import {   useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/Usecontext";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [accept, setAccept] = useState(false);


  const contextToken = useContext(UserContext);

  const token = contextToken.auth.token;
  

  const  nav =useNavigate()

  async function sumbit(e) {
    e.preventDefault();

    setAccept(true);

    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/user/create`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      } ,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }    
      );

      nav("/dashboard/users"); 
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response && error.response.status === 401) {
        setEmailError(true);
      }
      setAccept(true);
    }
    
  }

  return (
    <div    className="container-form  ">
    <form onSubmit={sumbit}>
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
        {name.length < 2  && accept && (
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
        <button className="btn "> Create User</button>
      </div>
    </form>
  </div>
  );
}

export default  CreateUser;