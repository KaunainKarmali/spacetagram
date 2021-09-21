import { useState } from "react";
import { api } from "./settings";
import "./App.css";
import Search from "./components/Search";
import { validateSearch } from "./utils";
import SearchResults from "./components/SearchResults";
import { production } from "./settings";
import dummyData from "./temporary/dummyData";

const App = () => {
  const [error, setError] = useState({ error: false, message: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e, search, setValidationErrors) => {
    e.preventDefault();

    // Validate search query
    const { valid, searchErrorArr } = validateSearch(search);

    if (valid) {
      fetchResults(api, search, setLoading, setError, setData);
    } else {
      setValidationErrors(searchErrorArr);
    }
  };

  // Fetches search results from api
  const fetchResults = async (api, search, setLoading, setError, setData) => {
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

    // Fetch and save results from the api
    try {
      setLoading(true);
      let dataArr = [];

      // Load dummy data if in test environment to avoid api call limit
      if (production) {
        const result = await fetch(url);
        dataArr = await result.json();
      } else {
        dataArr = dummyData;
      }
      setData(Array.isArray(dataArr) ? dataArr : [dataArr]);
    } catch (error) {
      setError({ error: true, message: error.msg });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="full-screen flex-container">
      <header className="header">
        <div className="content-container">
          <h1 className="website-title center-text">Spacestagram</h1>
        </div>
      </header>
      <main>
        <div className="content-container">
          <Search handleSubmit={handleSubmit} />
          <section>
            <SearchResults loading={loading} error={error} data={data} />
          </section>
        </div>
      </main>
      <footer>
        <div className="content-container center-text">
          <p>Powered by NASA APIs.</p>
          <p>
            <span>Made with ♥ by </span>
            <a href="https://www.kaunain.dev/">Kaunain Karmali</a>
          </p>
        </div>
      </footer>
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
