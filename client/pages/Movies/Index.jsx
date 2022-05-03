import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const useLoader = (loadingFunction) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState(undefined);

  const load = async () => {
    try {
      setLoading(true);
      setError(undefined);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);
  return { loading, error, data };
};

const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch url: ${url}, resonded with ${res.status}: ${res.statusText}`
    );
  }
  return await res.json();
};

const Movies = () => {
  const { loading, error, data } = useLoader(
    async () => await fetchJSON("/api/movies")
  );

  return (
    <div>
      <Navbar />
      <h1>Movie Database</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {data && (
        <div>
          <ul>
            {data.map((movie) => (
              <li key={movie._id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Movies;
