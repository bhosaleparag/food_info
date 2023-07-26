import React from "react";
import { Link } from "react-router-dom";
import food_logo from "../assets/FOODINFO.png";


export default function Header() {
  const [message, setMessage] = React.useState("");
  function handleSearch(event) {
    setMessage(event.target.value);
  }
  return (
    <nav>
      <Link to="/">
        <img src={food_logo} />
      </Link>
      <Link to="/diet">Diet</Link>
      <Link to="/health">Health</Link>
      <Link to="/meal">Meal Type</Link>
      <Link to="/cuisine">Cuisine Type</Link>
      <Link to="/dish">Dish Type</Link>
      <div className="searchBar">
        <input
          type="search"
          className="searchBar-input"
          onChange={handleSearch}
          value={message}
        />
        <Link to={`search/${message}`}>
          <div className="searchBar-btn">
          </div>
        </Link>
      </div>
    </nav>
  );
}
