import { nonAlcoholicAPI } from "./requisicoes/nonAlcoholicAPI.js";

const displayDrinksTela = document.querySelector('.drinks-display')

let drinks=[];
async function buscarDrinksNaoAlcolicos() {
    let nonAlcoholicDrinks = await nonAlcoholicAPI()
    console.log(nonAlcoholicDrinks)
    console.log(nonAlcoholicDrinks)
    if(nonAlcoholicDrinks){
        for(let i=0;i<6;i++){
            const randomIndex = Math.floor(Math.random() * 58);
            drinks.push(nonAlcoholicDrinks.drinks[randomIndex])
            exibirDrinks(drinks)
        }
    }
    console.log(drinks)
}
buscarDrinksNaoAlcolicos()
function exibirDrinks(drinks) {
    displayDrinksTela.innerHTML = ""; // Limpa a tela antes de exibir novos drinks
    const ulDrinks = document.createElement('ul');
    ulDrinks.className = "drinks-list"; // Classe para estilização

    drinks.forEach(item => {
        console.log(item);
        const liDrinks = document.createElement('li');
        liDrinks.className = 'drink'; // Classe para estilização

    // Acessando o nome do drink corretamente
        const tituloDrink = document.createElement('h2');
        tituloDrink.className = "drink-title"; // Classe para estilização
        tituloDrink.textContent = item.strDrink; // Acessa a propriedade strDrink diretamente

        const imgDrink = document.createElement('img');
        imgDrink.className = "drink-img"; // Classe para estilização
        imgDrink.src = item['strDrinkThumb'];
    
        liDrinks.appendChild(tituloDrink);
        liDrinks.appendChild(imgDrink);

        // Adiciona o item da lista à lista não ordenada
        ulDrinks.appendChild(liDrinks);
    });

    displayDrinksTela.appendChild(ulDrinks);

}