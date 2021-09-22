import React, { useRef, useEffect } from "react";
import "./SearchResults.css";
import Loading from "../Loading/Loading";
import Error from "../Error";
import NoResults from "../NoResults";
import Result from "../Result/Result";

const SearchResults = (props) => {
  const { loading, error, data } = props;
  const fetched = useRef(false);

  // Once an initial fetch is made, this is set to true to track is user has search results or not
  useEffect(() => {
    if (fetched.current === false) {
      fetched.current = true;
    }
  }, [loading]);

  if (loading) return <Loading />;
  if (error.error) return <Error />;

  return (
    <div>
      {fetched.current === true && data.length === 0 ? (
        <NoResults />
      ) : (
        <ul className="search-results-container">
          {data.map((result, index) => (
            <Result key={index} index={index} result={result} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
