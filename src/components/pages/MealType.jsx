import React from "react";
import { useSearchParams, Link } from 'react-router-dom'
import Loader from "./Loader"
export default function MealType() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")
  const [typeData, setTypeData] = React.useState()
  React.useEffect(() => {
    setIsLoading(true);
    async function recData() {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=5356d460&app_key=000e634ee221f3cc3fe235e57022402b&mealType=${typeFilter}`);
      setTypeData(await response.json());
      setIsLoading(false);
    }
    if(typeFilter){
      recData();
    }else{
      setTypeData({from: 1, to: 0, count: 0, _links: {}, hits: []})
    }
  }, [typeFilter]);
  async function recDataNext() {
    setIsLoading(true);
    const response = await fetch(typeData?._links.next.href);
    setTypeData(await response.json());
    setIsLoading(false);
  }
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  const foodFilteredItem = typeData?.hits.map((data, i) => {
    return (
      <>
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
      </>
    );
  });
  const dishTypes = ["breakfast", "brunch", "lunch", "snack", "teatime"]

  const dishTypesBtn  = dishTypes.map((type, i)=>{
    return(
      <button onClick={() => handleFilterChange("type", `${type}`)} className='dishTypesBtn' key={i}>
      {type}</button>
    )
  })
  return(
    <>
    <div className="typeBtn">
      {dishTypesBtn}</div>
      {isLoading ? (<Loader/>):(
        <>
      <section>{foodFilteredItem}</section>
      <div className="typeBtn">
      <button onClick={recDataNext} className='dishTypesBtn'>Next</button>
      </div>
      </>
      )}
    </>
  );
}
