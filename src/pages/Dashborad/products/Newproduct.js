import { useContext, useState } from "react";
import { UserContext } from "../../../context/Usecontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Newproduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setIamge] = useState("");

  const [accept, setAccept] = useState(false);

  const contextToken = useContext(UserContext);

  const token = contextToken.auth.token;

  const nav = useNavigate();

  async function sumbit(e) {
    e.preventDefault();

    setAccept(true);

    try {
      const formDate = new FormData();
      formDate.append("title", title);
      formDate.append("description", description);
      formDate.append("image", image);

      const res = await axios.post(
        `http://127.0.0.1:8000/api/product/create`,
        formDate,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/products");
    } catch (error) {
      console.error("Registration failed:", error);
      setAccept(true);
    }
  }
  return (
    <div className="container-form">
      <form onSubmit={sumbit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            placeholder="Title"
            aria-hidden="true"
          />
          {title.length < 1 && accept && (
            <span className="error">Name required</span>
          )}
        </div>

        <div>
          <label htmlFor="description">description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            type="text"
            placeholder="description"
            autoComplete="new-password"
            aria-hidden="true"
          />

          {description.length < 8 && accept && (
            <span className=" error">
              A minimum of 8 characters is required
            </span>
          )}
        </div>

        <div>
          <label className="imge" htmlFor="iamge">
            <img src={require(`../../../IMg/image-gallery.png`)} alt="" />
            <span> Image</span>
          </label>
          <input
            onChange={(e) => setIamge(e.target.files.item(0))}
            id="iamge"
            type="file"
            placeholder="Iamge ..."
            autoComplete="new-Iamge"
            aria-hidden="true"
          />
        </div>

        <div>
          <button className="btn "> Create Product</button>
        </div>
      </form>
    </div>
  );
}

export default Newproduct;
