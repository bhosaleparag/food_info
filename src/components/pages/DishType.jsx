import React from "react";
import { useSearchParams, Link } from 'react-router-dom'
import Loader from "./Loader";
import NotFound from "../NotFound";
import { getByDishType, getNextPage } from "../../api";

const dishTypes = ["alcohol cocktail", "biscuits and cookies", "bread", "cereals", "condiments and sauces", "desserts", "drinks", "egg", "main course", "pancake", "pasta","preps","preserve", "salad", "sandwiches", "seafood", "side dish", "soup", "starter", "sweets","special occasions"]

export default function DishType() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type") || dishTypes[0]
  const [typeData, setTypeData] = React.useState()

  React.useEffect(() => {
    async function recData() {
      setIsLoading(true);
      try {
        const response = await getByDishType(typeFilter);
        setTypeData(response);
      } catch (error) {
        console.error("Failed to fetch dish type recipes:", error);
      } finally {
        setIsLoading(false);
      }
    }
    recData();
  }, [typeFilter]);

  async function recDataNext() {
    setIsLoading(true);
    try {
      const response = await getNextPage(typeData?._links.next.href);
      setTypeData(response);
    } catch (error) {
      console.error("Failed to fetch next page:", error);
    } finally {
      setIsLoading(false);
    }
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

  const dishTypesBtn  = dishTypes.map((type, i)=>{
    return(
      <button onClick={() => handleFilterChange("type", `${type}`)} className={`dishTypesBtn`} key={i}>
      {type}</button>
    )
  })

  if (isLoading) {
    return <Loader />;
  }

  if (!typeData?.hits?.length) {
    return <NotFound />;
  }

  return(
    <>
      <div className="typeBtn">
        {dishTypesBtn}
      </div>
      <section>{foodFilteredItem}</section>
      {typeData?._links?.next && (
        <div className="typeBtn">
          <button onClick={recDataNext} className='dishTypesBtn'>Next</button>
        </div>
      )}
    </>
  );
}
