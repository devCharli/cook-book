import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const { data, isPending, error } = useFetch(
    `http://localhost:3004/recipes/${id}`
  );

  const { data: recipe, putData } = useFetch(
    `http://localhost:3004/recipes/${id}`,
    "PUT"
  );

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setMethod(data.method);
      setCookingTime(data.cookingTime);
      setIngredients(data.ingredients);
    }
  }, [data]);

  useEffect(() => {
    if (recipe) {
      history.push("/");
    }
  }, [recipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putData({
      title,
      ingredients,
      method,
      cookingTime,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIng) => [...prevIng, ing]);
    }

    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {data && (
        <div className="create-page">
          <h2>Edit Recipe</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Recipe title:</span>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </label>

            <label>
              <span>Recipe Ingredients:</span>
              <div>
                <input
                  type="text"
                  onChange={(e) => setNewIngredient(e.target.value)}
                  value={newIngredient}
                  ref={ingredientInput}
                />
                <button onClick={handleAdd}>add</button>
              </div>
              <p>
                Current Ingredients:{" "}
                {ingredients.map((i) => (
                  <em key={i}>{i}, </em>
                ))}
              </p>
            </label>

            <label>
              <span>Recipe Method:</span>
              <textarea
                onChange={(e) => setMethod(e.target.value)}
                value={method}
                required
              />
            </label>

            <label>
              <span>Cooking time (minutes):</span>
              <input
                type="text"
                onChange={(e) => setCookingTime(e.target.value)}
                value={cookingTime}
                required
              />
            </label>
            <button>Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Edit;
