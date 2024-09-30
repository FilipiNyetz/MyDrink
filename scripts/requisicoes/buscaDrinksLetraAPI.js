export let todosOsDrinks = [];

export async function buscaDrinksLetra(letra) {
    try {
        const linkAPI = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`);
        todosOsDrinks = await linkAPI.json();
        
    } catch (error) {
        console.log(`Erro de conexão: ${error}`);
    }
}
