import React, { useState } from "react";
import { formatExplanation } from "../../utils";

const Explanation = (props) => {
  const { explanation } = props;
  const [expand, setExpand] = useState(false);

  return (
    <div className="explanation">
      <p>{formatExplanation(explanation, expand ? explanation.length : 100)}</p>
      {explanation.length >= 100 && (
        <button onClick={() => setExpand(!expand)}>
          {expand ? "Collapse" : "Expand"}
        </button>
      )}
    </div>
  );
};

export default Explanation;
