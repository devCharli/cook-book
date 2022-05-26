import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Create = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const { postData, data } = useFetch("http://localhost:3004/recipes", "POST");

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + "minutes",
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

  useEffect(() => {
    if (data) {
      history.push("/");
    }
  }, [data, history]);

  return (
    <div className="create-page">
      <h2>Create a New Recipe</h2>
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
  );
};

export default Create;
