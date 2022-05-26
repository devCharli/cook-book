import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Recipe = () => {
  const { id } = useParams();
  const history = useHistory();
  const url = "http://localhost:3004/recipes/" + id;
  const { data: recipe, isPending, error } = useFetch(url);

  const handleDelete = () => {
    fetch(url, {
      method: "DELETE",
    });
    history.push("/");
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {recipe && (
        <div className="single-recipe">
          <h2>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
          </ul>
          <p>{recipe.method}</p>
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/edit/${recipe.id}`}>Edit Recipe</Link>
        </div>
      )}
    </>
  );
};

export default Recipe;
