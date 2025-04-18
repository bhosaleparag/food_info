import React from "react";
import { useLocation } from "react-router-dom";
import Loader from "./pages/Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// export async function loader(obj) {
//   return obj
// }

const chartOptions = {
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
  },
};

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
    return <Loader/>;
  }

  // Prepare data for the nutrition chart
  const mainNutrients = recipeData.digest.slice(0, 3);
  const nutritionChartData = {
    labels: mainNutrients.map(item => item.label),
    datasets: [
      {
        label: 'Grams',
        data: mainNutrients.map(item => Math.round(item.total)),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the vitamins chart
  const vitamins = recipeData.digest
    .find(item => item.label === 'Vitamins')
    ?.sub || [];
  
  const vitaminChartData = {
    labels: vitamins.map(v => v.label),
    datasets: [{
      data: vitamins.map(v => Math.round(v.total)),
      backgroundColor: vitamins.map(() => `#${Math.floor(Math.random()*16777215).toString(16)}`),
    }]
  };

  const ingredientsList = recipeData.ingredientLines.map((data, i) => (
    <li key={i}>{data}</li>
  ));

  const healthLabels = recipeData.healthLabels.map((label, i) => (
    <span key={i} className="health-label">{label}</span>
  ));

  const ingredients = recipeData.ingredients.map((data, i) => (
    <div className="recipeIngredients" key={i}>
      <h3>{data.text}</h3>
      <img src={data.image} alt={data.text} />
    </div>
  ));

  return (
    <>
      <div className="recipeDetail">
        <div className="recipeDetail-col-1">
          <img src={recipeData.image} alt={recipeData.label} />
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

          <div className="nutrition-section">
            <h3>Nutrition Overview</h3>
            <div className="nutrition-charts">
              <div className="chart-container">
                <h4>Macronutrients Distribution</h4>
                <Doughnut 
                  data={nutritionChartData}
                  options={chartOptions}
                />
              </div>
              <div className="nutrition-summary">
                <div className="nutrition-item">
                  <span className="label">Calories</span>
                  <span className="value">{Math.round(recipeData.calories)}</span>
                </div>
                <div className="nutrition-item">
                  <span className="label">CO₂ Class</span>
                  <span className="value">{recipeData.co2EmissionsClass || 'N/A'}</span>
                </div>
                <div className="nutrition-item">
                  <span className="label">CO₂ Total</span>
                  <span className="value">{Math.round(recipeData.totalCO2Emissions) || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="health-labels-section">
            <h3>Health Labels</h3>
            <div className="health-labels-container">
              {healthLabels}
            </div>
          </div>

          <button 
            onClick={() => setFlag(prev => !prev)} 
            className="recipeProcess-btn"
          >
            {flag ? 'Hide Ingredients' : 'See Ingredients'}
          </button>
        </div>

        <div className="recipeDetail-col-3">
          <h2>Vitamins & Minerals</h2>
          <div className="chart-container">
            <Bar
              data={{
                labels: recipeData.digest
                  .filter(item => item.label !== 'Energy')
                  .map(item => item.label),
                datasets: [{
                  label: 'Amount (g)',
                  data: recipeData.digest
                    .filter(item => item.label !== 'Energy')
                    .map(item => Math.round(item.total)),
                  backgroundColor: '#36A2EB',
                }]
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
      
      <div className="recipeProcess">
        {flag && ingredients}
      </div>
    </>
  );
}
