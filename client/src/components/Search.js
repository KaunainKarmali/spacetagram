import React from "react";
import { useState, useEffect, useRef } from "react";

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

  // Validate user's search query
  const validateSearch = (search) => {
    let valid = true;
    const searchErrorArr = [];

    // Must have a start date
    if (search.start === "") {
      valid = false;
      searchErrorArr.push({ message: "Missing start date" });
    }

    // Start date must be before end date
    if (search.end !== "" && new Date(search.start) > new Date(search.end)) {
      valid = false;
      searchErrorArr.push({
        message: "Start date must be before the end date",
      });
    }

    return { valid, searchErrorArr };
  };

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e, search, setValidationErrors)}>
        <label for="start">Start date</label>
        <input
          type="date"
          id="start"
          onChange={handleChange}
          name="start"
          min="1995-06-16"
          max={maxDay.current}
          value={search.start}
        />

        <label for="end">End date</label>
        <input
          type="date"
          id="end"
          onChange={handleChange}
          name="end"
          min="1995-06-16"
          max={maxDay.current}
          value={search.end}
        />

        <button
          type="submit"
          onClick={(e) => handleSubmit(e, search, setValidationErrors)}
        >
          Search
        </button>
        <button type="reset" onClick={handleReset}>
          Clear
        </button>
      </form>
      <ul>
        {validationErrors &&
          validationErrors.map(({ message }) => <li>{message}</li>)}
      </ul>
    </section>
  );
};

export default Search;
