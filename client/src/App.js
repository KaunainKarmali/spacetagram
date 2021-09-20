import { useState } from "react";
import { api } from "./settings";
import "./App.css";
import Loading from "./components/Loading";
import Error from "./components/Error";
import NoResults from "./components/NoResults";

const App = () => {
  // User's search term
  const [search, setSearch] = useState({
    start: "",
    end: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Start !== blank
    // Start < end
    // Start > Jun 16, 1995
    // End <= Today - 1
    if (search.start !== "") fetchResults(api, search, setLoading, setError);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearch({ ...search, [name]: value });
  };

  const handleReset = () => {
    setSearch({
      start: "",
      end: "",
    });
  };

  const fetchResults = async (api, search, setLoading, setError) => {
    const url = new URL(api.url);
    const params = {
      api_key: api.key,
      end_date: search.end,
    };

    // Config query params depending on user searching for a single date or a range of dates
    if (search.end === "") {
      params.date = search.start;
    } else {
      params.start_date = search.start;
    }

    url.search = new URLSearchParams(params).toString();

    try {
      setLoading(true);
      const result = await fetch(url);
      const data = await result.json();
      console.log(data);
      setData(data.length === 0 ? [data] : data);
    } catch (error) {
      setError({ error: true, message: error.msg });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error.error) return <Error error={error.msg} />;
  if (data.length === 0) return <NoResults />;

  return (
    <div>
      <header>
        <h1>Spacestagram</h1>
      </header>
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <label for="start">Start date</label>
            <input
              type="date"
              id="start"
              onChange={handleChange}
              name="start"
            />

            <label for="end">End date</label>
            <input type="date" id="end" onChange={handleChange} name="end" />

            <button type="submit" onClick={handleSubmit}>
              Search
            </button>
            <button type="reset" onClick={handleReset}>
              Clear
            </button>
          </form>
        </section>
        <section>
          <ul>
            {data.map((d, index) => (
              <li key={index}>{d}</li>
            ))}
          </ul>
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;

// APP COMPONENT
// App component
// Error state
// Results state
// Loading state

// SEARCH
// Search bar (form --> )
// Clear result, search result, dynamic fetches on keystrokes
// Update error / result / loading state
// Date must be between Jun 16, 1995 - Sep 20, 2021

// RESULTS / RESULT
// Search results ul with li (key prop) and Card (with each result)
// Managing null results for images
// Title
// Date of capture (earth_date)
// Like / undo like button
// More details modal popup with click away listener
// Shareable link for image
