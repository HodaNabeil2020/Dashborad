import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "../dashboard.css";
import { UserContext } from "../../../context/Usecontext";

function Users() {
  const contextToken = useContext(UserContext);
  const token = contextToken.auth.token;

  const [users, setUsers] = useState([]);

  const [numberUserEffect, setNumberUserEffect] = useState(0);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((date) => setUsers(date.data));
  }, [numberUserEffect]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setNumberUserEffect((pre) => pre + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <table className="container-table">
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Email</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="container-icons">
                <div onClick={() => deleteUser(user.id)}>
                  <i className="fa-solid fa-trash"></i>
                </div>
                <div>
                  <Link to={`${user.id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Users;
