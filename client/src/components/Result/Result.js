import React, { useState } from "react";
import Explanation from "../Explanation/Explanation";
import Image from "../Image/Image";
import "./Result.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Result = (props) => {
  const { result } = props;
  const { date, explanation, hdurl, url, title } = result;
  const [like, setLike] = useState(false);

  const handleChange = (e) => {
    const value = e.target.checked;
    setLike(value);
  };

  return (
    <li className="card">
      <Image src={hdurl || url} alt={title} />
      <div className="content">
        <h2>{title}</h2>

        <div className="sub-content">
          <p>{date.split("-").join("/")}</p>

          <div className="like-container">
            <input
              className="like-icon-input"
              type="checkbox"
              id="like"
              onChange={handleChange}
              checked={like}
            />
            <label for="like" className="like-icon-label">
              <span className="sr-only">{like ? "liked" : "not liked"}</span>
              <FontAwesomeIcon
                className={`like-icon ${like ? "liked" : "not-liked"}`}
                icon={faHeart}
              />
            </label>
          </div>
        </div>

        <Explanation explanation={explanation} />
      </div>
    </li>
  );
};

export default Result;
