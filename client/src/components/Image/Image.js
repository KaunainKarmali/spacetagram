import React from "react";
import "./Image.css";

const Image = (props) => {
  const { src, alt } = props;

  return (
    <div className="image-container">
      <img className="image" src={src} alt={alt} />
    </div>
  );
};

export default Image;
