import { useLocation } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import useFetch from "../hooks/useFetch";

const Search = () => {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = "http://localhost:3004/recipes?q=" + query;
  const { data, isPending, error } = useFetch(url);
  return (
    <div>
      <h2>Result for {query}</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList data={data} />}
    </div>
  );
};

export default Search;
