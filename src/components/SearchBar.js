import { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search?q=${term}`);
    setTerm("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </form>
    </div>
  );
};

export default SearchBar;
