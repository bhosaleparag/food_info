import React from "react";
import { useLocation } from "react-router-dom";
import Loader from "./pages/Loader";

// export async function loader(obj) {
//   return obj
// }

export default function RecipeDetail() {
  const [apiData, setApiData] = React.useState();
  const [flag, setFlag] = React.useState(false);
  const location = useLocation();
  const data = location.state?.data;
  React.useEffect(() => {
    async function recData() {
      const response = await fetch(data);
      setApiData(await response.json());
    }
    recData();
  }, []);
  const recipeData = apiData?.recipe;
  if(!apiData){
    return(
      <>
        <Loader/>
      </>
    )
  }
  const digestList = recipeData.digest.map((data) => {
    return (
      <li key={data.tag}>
        {data.label}: {data.total}
      </li>
    );
  });
  const ingredientsList = recipeData.ingredientLines.map((data, i) => {
    return <li key={i}>{data}</li>;
  });
  const healthLabels = recipeData.healthLabels.map((data, i) => {
    return <p key={i}>{data}</p>;
  });
  const ingredients = recipeData.ingredients.map((data, i) => {
    return(
      <div className="recipeIngredients" key={i}>
        <h3>{data.text}</h3>
        <img src={data.image} />
      </div>
    )
  })
  return (
    <>
      <div className="recipeDetail">
        <div className="recipeDetail-col-1">
          <img src={recipeData.image} />
          <h4>
            <span>{recipeData.ingredientLines.length}</span> ingredients
            <ul>{ingredientsList}</ul>
          </h4>
        </div>
        <div className="recipeDetail-col-2">
          <h1>{recipeData.label}</h1>
          <span className="recipeDetail-a">
            See full recipe on: <a href={recipeData.url}>{recipeData.source}</a>
          </span>
          <h3>Nutrition</h3>
          <table>
            <tr>
              <td>{recipeData.calories}</td>
              <td>{recipeData.co2EmissionsClass}</td>
              <td>{Math.round(recipeData.totalCO2Emissions)}</td>
            </tr>
            <tr>
              <th>calories</th>
              <th>
                co<sup>2</sup>class
              </th>
              <th>
                co<sup>2</sup>total
              </th>
            </tr>
          </table>
          <h3>health Labels</h3>
          <div className="healthLabels">{healthLabels}</div>
          <button onClick={()=>{setFlag(prev=>!prev)}} className="recipeProcess-btn">
            see the ingredients
          </button>
        </div>
        <div className="recipeDetail-col-3">
          <h2>Digest</h2>
          <ol>{digestList}</ol>
        </div>
      </div>
      <hr />
      <div className="recipeProcess">{flag && ingredients}</div>
    </>
  );
}
