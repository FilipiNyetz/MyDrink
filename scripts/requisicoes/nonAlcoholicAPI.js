let dados = []

export async function nonAlcoholicAPI() {
    try{
        const linkNAlcoholicAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic')
         dados = await linkNAlcoholicAPI.json();
         return dados;
    }catch(error){
        console.log(`erro de conexao ${error}`);
    }
}