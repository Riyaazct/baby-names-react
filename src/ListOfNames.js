import babyNamesData from "./babyNamesData.json";
import { useEffect, useState } from "react";
import "./ListOfNames.css";

function ListOfNames(props) {
  // eslint-disable-next-line no-unused-vars
  const [names, setNames] = useState(babyNamesData);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const male = "👦";
  const female = "👧";
  const gender = (sex) => (sex === "f" ? female : male);

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

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Search Names"
        onChange={handleKeyPress}
      />
      <div className="container">
        {searchResult
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(({ name, sex }, index) => (
            <div key={index}>
              <div className="box">
                <h4>
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
