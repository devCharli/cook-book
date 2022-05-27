import useFetch from "../hooks/useFetch";
import RecipeList from "../components/RecipeList";

const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:3004/recipes");
  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {data && <RecipeList data={data} />}
    </div>
  );
};

export default Home;
