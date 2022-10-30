import babyNamesData from "./babyNamesData.json";
import { useEffect, useState } from "react";
import "./ListOfNames.css";

function ListOfNames(props) {
  // eslint-disable-next-line no-unused-vars
  let [names, setNames] = useState(babyNamesData);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  let [favourite, setFavourite] = useState([]);
  const [savedId, setSavedId] = useState();
  const [isActive, setActive] = useState(null);

  const male = "👦";
  const female = "👧";
  const gender = (sex) => (sex === "f" ? female : male);

  // Search bar

  const handleKeyPress = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search !== "") {
      const result = names.filter((item) =>
        item.name.toLowerCase().includes(search)
      );
      setSearchResult(result);
    } else {
      setSearchResult(names);
    }
  }, [search]);

  // Favourites

  const handleOnClick = (e) => {
    setSavedId(e.target.id);

    names.forEach((item) => {
      let id = Number(e.target.id);
      if (item.id === id && e.target.parentNode.hidden === false) {
        setActive("favourites_container");
        favourite.push(item);
        e.target.parentNode.hidden = true;
      }
    });
  };

  const handleOnClickRemove = (e) => {
    setSavedId(e.target.id);

    names.forEach((item) => {
      let id = Number(e.target.id);
      if (item.id === id) {
        const result = favourite.filter((item) => item.id !== id);
        setFavourite(result);
        if (result.length <= 0) {
          handleToggle();
        }
      }
    });

    // setActive(null);
  };
  // toggle for border around favourites section
  const handleToggle = () => setActive(!isActive);

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search Names"
        onChange={handleKeyPress}
      />
      <div className={isActive ? "favourites_container" : null}>
        {favourite
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(({ name, sex, id }, index) => (
            <div key={index}>
              <div className="box">
                <h4 id={id} onClick={handleOnClickRemove}>
                  {name} {gender(sex)}
                </h4>
              </div>
            </div>
          ))}
      </div>
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
    </div>
  );
}

export default ListOfNames;
