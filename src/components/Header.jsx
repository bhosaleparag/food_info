import React from "react";
import { Link, useNavigate} from "react-router-dom";
import food_logo from "../assets/FOODINFO.png";

export default function Header() {
  const [message, setMessage] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  function handleSearch(event) {
    setMessage(event.target.value);
  }

  function handleSearchBtn(event) {
    if (event.key === 'Enter') {
      setMessage(event.target.value);
      navigate(`search/${message}`);
      setIsMenuOpen(false);
    }
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav>
      <Link to="/">
        <img src={food_logo} alt="Food Info Logo" />
      </Link>
      
      <button 
        className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/diet" onClick={() => setIsMenuOpen(false)}>Diet</Link>
        <Link to="/health" onClick={() => setIsMenuOpen(false)}>Health</Link>
        <Link to="/meal" onClick={() => setIsMenuOpen(false)}>Meal Type</Link>
        <Link to="/cuisine" onClick={() => setIsMenuOpen(false)}>Cuisine Type</Link>
        <Link to="/dish" onClick={() => setIsMenuOpen(false)}>Dish Type</Link>
        <div className="searchBar">
          <input
            type="search"
            className="searchBar-input"
            onChange={handleSearch}
            onKeyPress={handleSearchBtn}
            value={message}
            placeholder="Search recipes..."
          />
          <Link to={`search/${message}`} onClick={() => setIsMenuOpen(false)}>
            <div className="searchBar-btn">
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
