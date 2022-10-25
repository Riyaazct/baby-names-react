import babyNamesData from "./babyNamesData.json";
import { useState } from "react";
import "./ListOfNames.css";

function ListOfNames() {
  const [names, setNames] = useState(babyNamesData);
  const male = "👦";
  const female = "👧";
  const gender = (sex) => {
    console.log(sex);
    if (sex === "f") {
      return female;
    } else {
      return male;
    }
  };

  return (
    <div>
      {names
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map(({ name, sex }, index) => (
          <div className="container">
            <div className="box">
              <h4>
                {name} {gender(sex)}
              </h4>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListOfNames;
