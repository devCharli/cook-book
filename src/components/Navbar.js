import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import SearchBar from "./SearchBar";
import "../styles/Navbar.scss";

const Navbar = () => {
  const { color } = useTheme();
  return (
    <nav className="navbar" style={{ background: color }}>
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
