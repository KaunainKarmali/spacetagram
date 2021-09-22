import { useState } from "react";
import { api } from "./settings";
import "./App.css";
import Search from "./components/Search/Search";
import { validateSearch } from "./utils";
import SearchResults from "./components/SearchResults/SearchResults";

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

    setLoading(true);

    // Fetch and save results from the api
    await fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error fetching data");
        }
      })
      .then((result) => {
        setData(Array.isArray(result) ? result : [result]);
      })
      .catch((error) => {
        setError({ error: true, message: error });
      })
      .finally(() => {
        setLoading(false);
      });
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
