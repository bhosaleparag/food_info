import React from "react";
import { useParams , Link} from "react-router-dom";
import { search } from "../api";
import Loader from "./pages/Loader";
export default function Search() {
  const params = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchData, setSearchData] = React.useState()
  React.useEffect(() => {
    async function recData() {
      setIsLoading(true);
      const response = await search(params.id);
      setSearchData(response);
      setIsLoading(false);
    }
    recData();
  }, [params]);
    async function recDataNext() {
      setIsLoading(true);
      const response = await fetch(searchData?._links.next.href);
      setSearchData(await response.json());
      setIsLoading(false);
    }
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
  return (
    <>
  {isLoading ? (<Loader/>):(<section>{foodItem}</section>)}
  <div className="typeBtn">
      <button onClick={recDataNext} className='dishTypesBtn'>Next</button>
      </div>
  </>
  )
}
