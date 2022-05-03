import React from "react";
import Navbar from "../../components/Navbar";

const AddMovie = () => {
  return (
    <div>
      <Navbar />
      <div className="element-body">
        <h1>Add a new movie</h1>
        <form action="/api/movie/add" method="post">
          <div className="form-group">
            <label>
              Title
              <input type="text" name="title" />
            </label>
            <label>
              Year released
              <input type="text" name="release-year" />
            </label>
            <label>
              Plot
              <textarea name="plot" cols="30" rows="10"></textarea>
            </label>
            <button type="submit">Submit movie</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
