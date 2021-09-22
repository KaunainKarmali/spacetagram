import { useState } from "react";
import { api } from "./settings";
import "./App.css";
import Search from "./components/Search/Search";
import { validateSearch } from "./utils";
import SearchResults from "./components/SearchResults/SearchResults";
import { production } from "./settings";
import dummyData from "./temporary/dummyData";

const App = () => {
  const [error, setError] = useState({ error: false, message: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e, search, setValidationErrors) => {
    e.preventDefault();

    // Reset error state
    setError({ error: false, message: "" });

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
        if (result.ok) {
          dataArr = await result.json();
        } else {
          throw new Error("an error occurred");
        }
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
    <div className="full-screen flex-container flex-column">
      <header className="header">
        <div className="content-container">
          <h1 className="website-title center-text">Spacestagram</h1>
        </div>
      </header>
      <main>
        <div className="content-container">
          <Search handleSubmit={handleSubmit} />
          <section className="result-section">
            <SearchResults loading={loading} error={error} data={data} />
          </section>
        </div>
      </main>
      <footer>
        <div className="content-container center-text">
          <p className="footer-text">Powered by NASA APIs.</p>
          <p className="footer-text">
            <span>Made with ♥ by </span>
            <a className="footer-link" href="https://www.kaunain.dev/">
              Kaunain Karmali
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
