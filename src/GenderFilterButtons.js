import { Fragment } from "react";
import "./GenderFilterButtons.css";

function GenderFilterButtons({
  names,
  id,
  sex,
  favourite,
  searchResult,
  setSearchResult,
  setFavourite,
}) {
  const handleClick = (e) => {
    const value = e.target.value.toLowerCase();

    const result = searchResult.filter((item) =>
      item.sex.toLowerCase().includes(value)
    );
    setSearchResult(result);
  };

  return (
    <Fragment>
      <button value="m" className="boys" onClick={handleClick}>
        Boys
      </button>
      <button value="f" className="girls" onClick={handleClick}>
        Girls
      </button>
    </Fragment>
  );
}

export default GenderFilterButtons;
