import { Fragment } from "react";
import "./GenderFilterButtons.css";

function GenderFilterButtons({
  names,
  id,
  sex,
  favourite,
  searchResult,
}) {
  const handleClick = (e) => {
    console.log("clicked", e.target.value);
  };

  return (
    <Fragment>
      <button
        name="boys"
        value="m"
        className="boys"
        onClick={handleClick}
      >
        Boys
      </button>
      <button
        name="girls"
        value="f"
        className="girls"
        onClick={handleClick}
      >
        Girls
      </button>
    </Fragment>
  );
}

export default GenderFilterButtons;
