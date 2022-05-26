import { Link } from "react-router-dom";

const RecipeList = ({ data: recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h2>{recipe.title}</h2>
          <p>
            Ingredients: {recipe.ingredients[0]}, {recipe.ingredients[1]}...
          </p>
          <p>{recipe.method.substring(50)}...</p>
          <p>Cooking Time: {recipe.cookingTime} min</p>
          <Link to={`/recipe/${recipe.id}`}>Check Recipe</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
