

import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/Usecontext";




function Products() {
  const contextToken = useContext(UserContext);
  const token = contextToken.auth.token;

  const [products, setProducts] = useState([]);

  const [numberUserEffect, setNumberUserEffect] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((date) => setProducts(date.data));
  }, [numberUserEffect]);

  async function deletePoduct(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`, {
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
          <th>Title</th>

          <th>description</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td className="container-icons">
                <div onClick={() => deletePoduct(product.id)}>
                  <i className="fa-solid fa-trash"></i>
                </div>
                <div>
                  <Link to={`${product.id}`}>
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

export default Products
