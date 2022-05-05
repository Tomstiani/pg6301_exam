import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoader, fetchJSON } from "../index";

const Article = () => {
  //Get the id from the url
  const params = useParams();

  //Fetch the article with the id
  const fetchArticle = () => {
    return fetchJSON(`/api/articles/${params.id}`);
  };
  const { loading, error, data } = useLoader(fetchArticle);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }
  if (data) {
    return (
      <div>
        <div>
          <img
            src={data.content.img}
            alt="content image"
            className="article-header-img"
          />
        </div>
        <div className="element-body">
          <p className="article-author">Skrevet av {data.author}</p>
          <h1 className="article-title">{data.content.title}</h1>
          <h2 className="article-subtitle">{data.content.subtitle}</h2>
          <p className="article-text">{data.content.text}</p>
        </div>
      </div>
    );
  }
};

export default Article;
