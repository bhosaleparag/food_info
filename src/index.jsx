import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  RouterProvider,
  Route,
  createRoutesFromElements,
  createBrowserRouter 
} from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import MealType from './components/pages/MealType'
import DishType from './components/pages/DishType'
import CuisineType from './components/pages/CuisineType'
import Health from './components/pages/Health'
import Diet from './components/pages/Diet'
import Home from './components/Home'
import RecipeDetail from './components/RecipeDetail'
import Search from './components/Search'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route 
      path="/recipeDetail" 
      element={<RecipeDetail />}
      />
    <Route path="search/:id" element={<Search/>}/>
    <Route path="cuisine" element={<CuisineType/>}/>
    <Route path="meal" element={<MealType/>}/>
    <Route path="dish" element={<DishType/>}/>
    <Route path="diet" element={<Diet/>}/>
    <Route path="health" element={<Health/>}/>
  </Route>
))

function App() {
  return(
    <RouterProvider router={router} />
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />)