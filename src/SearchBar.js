import "./ListOfNames.css";
import ListOfNames from "./ListOfNames";

function SearchBar({ data }) {
  const handleKeyPress = (e) => {
    let filtered = data.filter((item) => item.name.includes(e));
    return ListOfNames(filtered);
  };
  return (
    // eslint-disable-next-line no-undef
    <input
      type="text"
      className="search"
      onKeyUp={(e) => handleKeyPress(e.target.value)}
    />
  );
}

export default SearchBar;
