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
  const [classForMainList, setClassForMainList] = useState("");

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

  // End of search

  // Favourites section

  // function to move item from main list to favourite section
  const handleOnClick = (e) => {
    // setSavedId(e.target.id);
    let id = Number(e.target.id);

    names.forEach((item) => {
      if (item.id === id) {
        favourite.push(item);
        let result = searchResult.filter((name) => name.id !== id);

        setSearchResult(result);
      }
      // setFavourite(result);
    });
  };
  // function to remove item from favourites
  const handleOnClickRemove = (e) => {
    setSavedId(e.target.id);
    names.forEach((item) => {
      let id = Number(e.target.id);
      if (item.id === id) {
        const result = favourite.filter(
          (element) => element.id !== id
        );
        setFavourite(result);
        if (result.length <= 0) {
          setActive(null);
        }
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
      <div className={isActive}>
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
      <div className="container">
        {searchResult
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(({ name, sex, id }, index) => (
            <div className={classForMainList} key={index}>
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
