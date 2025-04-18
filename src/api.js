const BASE_URL = 'https://api.edamam.com/api/recipes/v2';
const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

async function fetchRecipes(params) {
    const queryParams = new URLSearchParams({
        type: 'public',
        app_id: APP_ID,
        app_key: APP_KEY,
        ...params
    });
    
    const url = `${BASE_URL}?${queryParams}`;
    const res = await fetch(url);
    
    if (!res.ok) {
        throw {
            message: "Failed to fetch recipes",
            statusText: res.statusText,
            status: res.status
        }
    }
    return await res.json();
}

export async function search(searchText) {
    return fetchRecipes({ q: searchText });
}

export async function homePage() {
    return fetchRecipes({ q: 'paneer' });
}

export async function getByHealth(healthType) {
    return fetchRecipes({ health: healthType });
}

export async function getByDiet(dietType) {
    return fetchRecipes({ diet: dietType });
}

export async function getByMealType(mealType) {
    return fetchRecipes({ mealType });
}

export async function getByCuisineType(cuisineType) {
    return fetchRecipes({ cuisineType });
}

export async function getByDishType(dishType) {
    return fetchRecipes({ dishType });
}

export async function getNextPage(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch next page",
            statusText: res.statusText,
            status: res.status
        }
    }
    return await res.json();
}