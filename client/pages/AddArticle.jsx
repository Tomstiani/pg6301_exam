import React from "react";
import { Link } from "react-router-dom";
import { useLoader, fetchJSON } from "../index";

const addArticle = () => {
  // Make sure user is logged inn and is a journalist
  if (document.cookie.includes("access_token")) {
    const { loading, data, error } = useLoader(async () => {
      return await fetchJSON("/api/login");
    });

    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (error) {
      return <h1>Error: {error.message}</h1>;
    }

    if (data.userInfo.role !== "journalist") {
      return (
        <div>
          <h1>You are not a journalist</h1>
          <Link to="/">Go back</Link>
        </div>
      );
    }

    return (
      <div className="article-form-container">
        <ArticleForm user={data.userInfo} />
      </div>
    );
  } else {
    return (
      <div>
        <h1>You need to be logged in</h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }
};

const ArticleForm = ({ user }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (key === "tags") {
        data[key] = value.split(",");
      }
      data[key] = value;
    });
    data.author = { name: user.name, id: user._id };

    console.log(data);

    // const response = await fetchJSON("/api/articles/add", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // console.log(response);
    // if (response.success) {
    //   alert("Article added");
    // }

    form.reset();
  };

  return (
    <form className="article-form" onSubmit={(e) => handleSubmit(e)}>
      <h1>Skriv en ny artikkel</h1>
      <div className="form-formgroup-thumbnail formgroup">
        <h3>Thumbnail</h3>
        <label htmlFor="form-thumbnail-title">
          <p>Tittel</p>
          <input
            type="text"
            id="form-thumbnail-title"
            name="thumbnail-title"
            required
          />
        </label>
        <label htmlFor="form-thumbnail-image">
          <p>Bilde-url</p>
          <input
            type="text"
            id="form-thumbnail-image"
            name="thumbnail-img"
            required
          />
        </label>
      </div>
      <div className="form-formgroup-article formgroup">
        <h3>Artikkel</h3>
        <label htmlFor="form-article-title">
          <p>Tittel</p>
          <input type="text" id="form-article-title" name="title" required />
        </label>
        <label htmlFor="form-article-subtitle">
          <p>Subtittel</p>
          <input
            type="text"
            id="form-article-subtitle"
            name="subtitle"
            required
          />
        </label>
        <label htmlFor="form-article-image">
          <p>Bilde-url</p>
          <input type="text" id="form-article-image" name="img" required />
        </label>
        <label htmlFor="form-article-text">
          <p>Tekst</p>
          <textarea id="form-article-text" name="text" required />
        </label>
      </div>
      <div className="formgroup-tags formgroup">
        <label htmlFor="form-tags">
          <h3>Tags</h3>
          <p>Sett "komma" mellom hver tag</p>
          <input type="text" id="form-tags" name="tags" required />
        </label>
      </div>
      <div className="formgroup-submit">
        <button type="submit">Send inn</button>
      </div>
    </form>
  );
};

export default addArticle;
