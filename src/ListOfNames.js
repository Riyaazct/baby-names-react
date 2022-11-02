import babyNamesData from "./babyNamesData.json";
import { Fragment, useEffect, useState } from "react";
import "./ListOfNames.css";
import GenderFilterButtons from "./GenderFilterButtons";

function ListOfNames(props) {
  // eslint-disable-next-line no-unused-vars
  let [names, setNames] = useState(babyNamesData);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  let [favourite, setFavourite] = useState([]);
  const [isActive, setActive] = useState(null);

  const male = "👦";
  const female = "👧";
  const gender = (sex) => (sex === "f" ? female : male);

  // Search bar

  const handleKeyPress = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (search !== "") {
      const result = searchResult.filter((item) =>
        item.name.toLowerCase().includes(search)
      );
      setSearchResult(result);
    } else {
      setSearchResult(names);
    }
  }, [search]);

  // End of search

  // Favourites section

  // function to move item from main list to favourite section
  const handleOnClick = (e) => {
    let id = Number(e.target.id);

    names.forEach((item) => {
      if (item.id === id) {
        favourite.push(item);
        setActive("favourites_container");
        let result = searchResult.filter((name) => name.id !== id);
        setSearchResult(result);
      }
      // setFavourite(result);
    });
  };
  // function to remove item from favourites
  const handleOnClickRemove = (e) => {
    names.forEach((item) => {
      let id = Number(e.target.id);
      if (item.id === id) {
        const result = favourite.filter(
          (element) => element.id !== id
        );
        setFavourite(result);
        searchResult.push(item);
        if (result.length <= 0) {
          setActive(null);
        }
      }
    });
  };

  // click handler for gender filter buttons

  return (
    <Fragment>
      <input
        type="text"
        className="search"
        placeholder="Search Names"
        onChange={handleKeyPress}
      />

      <h2>Favourites: </h2>
      <div className={isActive}>
        <p>Click a name to add it to favourites</p>
        {favourite
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(({ name, sex, id }, index) => (
            <div className="favourites_list" key={index}>
              <div className="box">
                <h4 id={id} onClick={handleOnClickRemove}>
                  {name} {gender(sex)}
                </h4>
              </div>
            </div>
          ))}
      </div>
      <GenderFilterButtons
        names={names}
        favourites={favourite}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        setFavourite={setFavourite}
      />
      <div className="container">
        {searchResult
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(({ name, sex, id }, index) => (
            <div key={index}>
              <div className="box">
                <h4 id={id} onClick={handleOnClick}>
                  {name} {gender(sex)}
                </h4>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
}

export default ListOfNames;
