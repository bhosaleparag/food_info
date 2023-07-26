import React from "react";
import { useParams , Link} from "react-router-dom";
import { search } from "../api";
export default function Search() {
  const params = useParams();
  const [searchData, setSearchData] = React.useState()
  React.useEffect(() => {
    async function recData() {
      const response = await search(params.id);
      setSearchData(response);
    }
    recData();
  }, [params]);
    console.log(searchData?.hits);
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
  if(!searchData){
      return(<>wait...</>)
  }
  return <section>{foodItem}</section>;
}
