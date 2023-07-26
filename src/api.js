export async function search(searchText){
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchText}&app_id=5356d460&app_key=000e634ee221f3cc3fe235e57022402b`
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch food cards",
            statusText: res.statusText,
            status: res.status
        }
    }
    return await res.json()
}