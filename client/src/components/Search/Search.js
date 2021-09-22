import React from "react";
import "./Search.css";
import { useState, useEffect, useRef } from "react";
import { validateSearch } from "../../utils";

const Search = (props) => {
  const { handleSubmit } = props;

  // User's search term
  const [search, setSearch] = useState({
    start: "",
    end: "",
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const maxDay = useRef("");

  // Set the maximum date user can select (today - 1)
  useEffect(() => {
    if (maxDay.current === "") {
      const today = new Date();
      const dd = String(parseInt(today.getDate()) - 1).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      maxDay.current = yyyy + "-" + mm + "-" + dd;

      setSearch({ ...search, start: maxDay.current });
    }
  }, [search]);

  // Validate user input after each search
  useEffect(() => {
    const { searchErrorArr } = validateSearch(search);
    setValidationErrors(searchErrorArr);
  }, [search]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearch({ ...search, [name]: value });
  };

  const handleReset = () => {
    setSearch({
      start: maxDay.current,
      end: "",
    });
  };

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e, search, setValidationErrors)}>
        <div className="form-field-container">
          <div className="form-field start-input">
            <label for="start" className="form-label">
              Start date
            </label>
            <input
              type="date"
              id="start"
              onChange={handleChange}
              name="start"
              min="1995-06-16"
              max={maxDay.current}
              value={search.start}
            />
          </div>

          <div className="form-field end-input">
            <label for="end" className="form-label">
              End date
            </label>
            <input
              type="date"
              id="end"
              onChange={handleChange}
              name="end"
              min="1995-06-16"
              max={maxDay.current}
              value={search.end}
            />
          </div>
        </div>

        <div className="btn-container">
          <button
            className="btn search-btn"
            type="submit"
            onClick={(e) => handleSubmit(e, search, setValidationErrors)}
          >
            Search
          </button>
          <button className="btn clear-btn" type="reset" onClick={handleReset}>
            Clear
          </button>
        </div>
      </form>
      <ul>
        {validationErrors &&
          validationErrors.map(({ message }) => <li>{message}</li>)}
      </ul>
    </section>
  );
};

export default Search;
