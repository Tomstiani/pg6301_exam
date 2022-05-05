import React from "react";
import { Link } from "react-router-dom";

const Overview = ({ isLoggedIn }) => {
  const DUMMY_DATA = [
    {
      id: 1,
      title: "- Blodige kamper",
      thumbnail:
        "https://akamai.vgc.no/drfront/images/2022/05/05/c=145,509,1726,826;w=1080;h=517;682947.jpg?format=auto",
      topics: ["ukraina", "krig"],
    },
    {
      id: 2,
      title: "- Jeg var i kjelleren",
      thumbnail:
        "https://akamai.vgc.no/drfront/images/2022/05/04/c=978,580,627,445;w=527;h=373;682890.jpg?format=auto",
      topics: ["ukraina", "krig"],
    },
    {
      id: 3,
      title: "Historisk rentehevning i USA",
      thumbnail:
        "https://akamai.vgc.no/drfront/images/2022/05/04/c=0,94,388,263;w=621;h=421;682912.jpg?format=auto",
      topics: ["usa", "økonomi"],
    },
    {
      id: 3,
      title: "Desperat utspill",
      thumbnail:
        "https://akamai.vgc.no/drfront/images/2022/05/05/c=198,6,416,413;w=433;h=429;682941.jpg?format=auto",
      topics: ["debatt", "innlegg"],
    },
  ];

  const POPULAR_TOPICS = [
    {
      id: 1,
      name: "Ukraina",
      count: 10,
    },
    {
      id: 2,
      name: "Krig",
      count: 24,
    },
    {
      id: 3,
      name: "USA",
      count: 5,
    },
    {
      id: 4,
      name: "Økonomi",
      count: 13,
    },
  ];

  const getPopularTopics = () => {
    return POPULAR_TOPICS;
  };

  const getArticles = () => {
    return DUMMY_DATA;
  };

  return (
    <>
      <div>
        <Filters filters={getPopularTopics()} />
        <ArticleList articles={getArticles()} isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
};

const Filters = ({ filters }) => {
  return (
    <>
      <div className="overview-searchbar">Searchbar</div>
      <div className="overview-filters">
        {filters.map((filter) => (
          <FilterCard filter={filter} key={filter.id} />
        ))}
      </div>
    </>
  );
};

const FilterCard = ({ filter }) => {
  return (
    <>
      <div className="filter-card">
        <div className="filter-card-title">{filter.name}</div>
        <div className="filter-card-count">({filter.count})</div>
      </div>
    </>
  );
};

const ArticleList = ({ articles, isLoggedIn }) => {
  return (
    <>
      <div className="overview-articlelist">
        {articles.map((article) => (
          <Article article={article} key={article.id} isLoggedIn={isLoggedIn} />
        ))}
      </div>
    </>
  );
};

const Article = ({ article, isLoggedIn }) => {
  return (
    <div
      className="article-container"
      onClick={() => {
        if (isLoggedIn) {
          window.location.href = `/article/${article.id}`;
        } else {
          alert("Du må være logget inn for å se dette innlegget");
        }
      }}
    >
      <div className="article-thumbnail">
        <img
          src={article.thumbnail}
          alt="thumbnail"
          className="thumbnail-img"
        />
      </div>
      <div className="article-title">{article.title}</div>
      <div className="article-topics">{article.topics.join(", ")}</div>
    </div>
  );
};

export default Overview;
