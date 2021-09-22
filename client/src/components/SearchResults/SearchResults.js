import React from "react";
import "./SearchResults.css";
import Loading from "../Loading";
import Error from "../Error";
import NoResults from "../NoResults";
import Result from "../Result/Result";

const SearchResults = (props) => {
  const { loading, error, data } = props;

  if (loading) return <Loading />;
  if (error.error) return <Error error={error.message} />;

  return (
    <div>
      {data.length === 0 ? (
        <NoResults />
      ) : (
        <ul className="search-results-container">
          {data.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
