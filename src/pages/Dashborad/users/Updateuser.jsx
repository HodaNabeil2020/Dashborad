import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/Usecontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Updateuser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [accept, setAccept] = useState(false);

  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((date) => {
        setName(date[0].name);
        setEmail(date[0].email);
      });
  }, []);

  const contextToken = useContext(UserContext);

  const token = contextToken.auth.token;

  const nav = useNavigate();

  async function sumbit(e) {
    e.preventDefault();

    setAccept(true);

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/user/update/${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
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
    <div className=" page-update-user">
      <h3 >Updating data</h3>
      <div className="container-form">
        <form onSubmit={sumbit}   style={{margin:"50px  0 0"}}>
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
            <button className="btn "> Create User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Updateuser;
