import { Link } from "react-router-dom";
import Create from "../pages/Create";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Cook Book</Link>
      </h1>
      <div className="navbar-right">
        <SearchBar />
        <Link to="/create" className="create-link">
          Create Recipe
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
