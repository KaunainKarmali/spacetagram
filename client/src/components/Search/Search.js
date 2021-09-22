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
        <div className="form-container">
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
              className="input-date"
            />
          </div>

          <div className="form-field end-input">
            <label for="end" className="form-label">
              End date (optional)
            </label>
            <input
              type="date"
              id="end"
              onChange={handleChange}
              name="end"
              min="1995-06-16"
              max={maxDay.current}
              value={search.end}
              className="input-date"
            />
          </div>
          {/* </div> */}

          {/* <div className="btn-container"> */}
          <div className="search-btn-container">
            <button
              className="btn search-btn primary-btn"
              type="submit"
              onClick={(e) => handleSubmit(e, search, setValidationErrors)}
            >
              Search
            </button>
          </div>
          <div className="clear-btn-container">
            <button
              className="btn clear-btn secondary-btn"
              type="reset"
              onClick={handleReset}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      <div className="validation-error-wrapper">
        {validationErrors && validationErrors.length > 0 && (
          <div class="validation-error-container">
            <h3 className="validation-error-title">Input validation errors</h3>
            <ul>
              {validationErrors.map((error, index) => (
                <li className="validation-error" key={index}>
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
