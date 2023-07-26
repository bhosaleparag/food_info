import React from "react";
import { Link } from "react-router-dom";
import { homePage } from "../api";
import Loader from "./pages/Loader";
export default function Home() {
  const [searchData, setSearchData] = React.useState();
  React.useEffect(() => {
    async function recData() {
      const response = await homePage();
      setSearchData(response);
    }
    recData();
  }, []);
  const foodItem = searchData?.hits.map((data, i) => {
    return (
      <Link
        to={`/recipeDetail?name=${data.recipe.uri}`}
        className="foodItem-main"
        key={i}
        state={{ data: data._links.self.href }}
      >
        <article className="foodItem-body">
          <img src={data.recipe.image} className="foodItem-img" />
          <h3 className="foodItem-label">{data.recipe.label}</h3>
          <span className="foodItem-type">{data.recipe.cuisineType}</span>
          <span className="foodItem-yield">
            ingredients: {data.recipe.ingredientLines.length}
          </span>
        </article>
      </Link>
    );
  });
  if (!searchData) {
    return <Loader/>;
  }
  return <section>{foodItem}</section>;
}
