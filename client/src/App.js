import { useState } from "react";
import { api } from "./settings";
import "./App.css";
import Loading from "./components/Loading";
import Error from "./components/Error";
import NoResults from "./components/NoResults";
import Search from "./components/Search";

const App = () => {
  const [error, setError] = useState({ error: false, message: "" });
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e, search, setSearchError) => {
    e.preventDefault();
    if (search.start !== "") {
      fetchResults(api, search, setLoading, setError, setData);
    } else {
      setSearchError({ message: "Missing start date" });
    }
  };

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
      const result = await fetch(url);
      const data = await result.json();
      setData(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setError({ error: true, message: error.msg });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error.error) return <Error error={error.msg} />;

  return (
    <div>
      <header>
        <h1>Spacestagram</h1>
      </header>
      <main>
        <Search handleSubmit={handleSubmit} />
        <section>
          {data.length === 0 ? (
            <NoResults />
          ) : (
            <ul>
              {/* {data.map((d, index) => (
                <li key={index}>{d}</li>
              ))} */}
            </ul>
          )}
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
