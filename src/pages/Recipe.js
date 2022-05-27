import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Recipe = () => {
  const { id } = useParams();
  const history = useHistory();
  const url = "http://localhost:3004/recipes/" + id;
  const { data, isPending, error } = useFetch(url);
  const { deleteData, data: recipe } = useFetch(url, "DELETE");
  const handleDelete = () => {
    deleteData();
  };

  useEffect(() => {
    if (recipe) {
      history.push("/");
    }
  }, [recipe]);

  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {data && (
        <div className="single-recipe">
          <h2>{data.title}</h2>
          <p>Takes {data.cookingTime} to cook.</p>
          <ul>
            {data.ingredients &&
              data.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
          </ul>
          <p>{data.method}</p>
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/edit/${data.id}`}>Edit Recipe</Link>
        </div>
      )}
    </>
  );
};

export default Recipe;
