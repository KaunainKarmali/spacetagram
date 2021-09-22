import React, { useState } from "react";
import "./Explanation.css";
import { formatExplanation } from "../../utils";

const Explanation = (props) => {
  const { explanation } = props;
  const [expand, setExpand] = useState(false);

  return (
    <div className="explanation">
      <p>{formatExplanation(explanation, expand ? explanation.length : 100)}</p>
      {explanation.length >= 100 && (
        <div>
          <button
            className="btn secondary-btn expand-btn"
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Collapse" : "Expand"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Explanation;
