import babyNamesData from "./babyNamesData.json";
import { useEffect, useState } from "react";
import "./ListOfNames.css";

function ListOfNames(props) {
  // eslint-disable-next-line no-unused-vars
  let [names, setNames] = useState(babyNamesData);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [savedId, setSavedId] = useState();
  const [classToggle, setClassToggle] = useState("box");

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
    console.log(e);
    names.forEach((item) => {
      if (item.id === Number(e.target.id)) {
        favourite.push(item);
        e.target.parentNode.hidden = true;
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search Names"
        onChange={handleKeyPress}
      />
      <div className="favourites_container">
        {favourite.map(({ name, sex, id }, index) => (
          <div key={index}>
            <div className="box">
              <h4 id={id} onClick={handleOnClick}>
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
              <div className={classToggle}>
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
